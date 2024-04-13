//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function totalSupply() external view returns (uint);
    function decimals() external view returns (uint8);
    function symbol() external view returns (string memory);
    function name() external view returns (string memory);
    function getOwner() external view returns (address);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address _owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

abstract contract Auth {
    address internal owner;
    mapping (address => bool) internal authorizations;

    constructor(address _owner) {
        owner = _owner;
        authorizations[_owner] = true;
    }

    modifier onlyOwner() {
        require(isOwner(msg.sender), "!NOT OWNER"); _;
    }

    modifier authorized() {
        require(isAuthorized(msg.sender), "!NOT AUTHORIZED"); _;
    }

    function authorize(address adr) public onlyOwner {
        authorizations[adr] = true;
    }

    function unauthorize(address adr) public onlyOwner {
        authorizations[adr] = false;
    }

    function isOwner(address account) public view returns (bool) {
        return account == owner;
    }

    function isAuthorized(address adr) public view returns (bool) {
        return authorizations[adr];
    }

    function transferOwnership(address payable adr) public onlyOwner {
        owner = adr;
        authorizations[adr] = true;
        emit OwnershipTransferred(adr);
    }

    event OwnershipTransferred(address owner);
}

interface IDEXRouter {
    function WETH() external pure returns (address);
    
    function getAmountsOut(uint amountIn, address[] calldata path)
    external
    view
    returns (uint[] memory amounts);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}

interface IDividendDistributor {
    function setDistributionCriteria(uint _minPeriod, uint _minDistribution) external;
    function setShare(address shareholder, uint amount) external;
    function deposit() external payable;
    function process(uint gas) external;
}

contract DividendDistributor is IDividendDistributor {

    address _token;

    struct Share {
        uint amount;
        uint totalExcluded;
        uint totalRealised;
    }

    //USDC: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48, testnet 0x07865c6E87B9F70255377e024ace6630C1Eaa37F

    IERC20 _rewardToken = IERC20(0x07865c6E87B9F70255377e024ace6630C1Eaa37F);
    IDEXRouter router;
    address public rewardToken;
    address[] shareholders;

    mapping (address => uint) shareholderIndexes;
    mapping (address => uint) shareholderClaims;
    mapping (address => Share) public shares;

    struct DividendHistory {
        uint timestamp;
        uint amount;
    }

    mapping(address => DividendHistory[]) public dividendHistories;

    uint public totalShares;
    uint public totalDividends;
    uint public totalDistributed;
    uint public dividendsPerShare;
    uint public dividendsPerShareAccuracyFactor = 10 ** 36;
    uint public minPeriod = 1 hours; 
    uint public minDistribution = 1 * 1e6; //Shareholder must have at least $1 USDC in unpaid earnings
    uint currentIndex;

    event DividendClaimed(address indexed shareholder, uint amount);
    event RewardTokenUpdated(address newToken);
    event DistributionCriteriaUpdated(uint minPeriod, uint minDistribution);

    bool initialized;
    
    modifier initialization() {
        require(!initialized);
        _;
        initialized = true;
    }

    modifier onlyToken() {
        require(msg.sender == _token); _;
    }

    //UniSwap V2 ETH Router: 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
    //Pancakeswap V2 ETH Router: 0xEfF92A263d31888d860bD50809A8D171709b7b1c

    constructor () {
        router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D != address(0)
        ? IDEXRouter(router)
        : IDEXRouter(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
        _token = msg.sender;
        rewardToken = address(_rewardToken);
    }

    function setDistributionCriteria(uint _minPeriod, uint _minDistribution) external override onlyToken {
        minPeriod = _minPeriod;
        minDistribution = _minDistribution;

        emit DistributionCriteriaUpdated(_minPeriod, _minDistribution);
    }

    function setShare(address shareholder, uint amount) external override onlyToken {
        if(shares[shareholder].amount > 0){
            distributeDividend(shareholder);
        }

        if(amount > 0 && shares[shareholder].amount == 0){
            addShareholder(shareholder);
        }else if(amount == 0 && shares[shareholder].amount > 0){
            removeShareholder(shareholder);
        }

        totalShares = totalShares - shares[shareholder].amount + amount;
        shares[shareholder].amount = amount;
        shares[shareholder].totalExcluded = getCumulativeDividends(shares[shareholder].amount);
    }

    function deposit() external payable override onlyToken {
        uint balanceBefore = _rewardToken.balanceOf(address(this));

        address[] memory path = new address[](2);
        path[0] = router.WETH();
        path[1] = address(_rewardToken);

        router.swapExactETHForTokensSupportingFeeOnTransferTokens{value: msg.value}(
            0,
            path,
            address(this),
            block.timestamp
        );

        uint amount = _rewardToken.balanceOf(address(this)) - balanceBefore;

        totalDividends = totalDividends + amount;
        dividendsPerShare = dividendsPerShare + ((dividendsPerShareAccuracyFactor * amount) / totalShares);
    }

    function process(uint gas) external override onlyToken {
        uint shareholderCount = shareholders.length;

        if(shareholderCount == 0) { return; }

        uint gasUsed = 0;
        uint gasLeft = gasleft();

        uint iterations = 0;

        while(gasUsed < gas && iterations < shareholderCount) {
            if(currentIndex >= shareholderCount){
                currentIndex = 0;
            }

            if(shouldDistribute(shareholders[currentIndex])){
                distributeDividend(shareholders[currentIndex]);
            }

            gasUsed = gasUsed + (gasLeft - (gasleft()));
            gasLeft = gasleft();
            currentIndex++;
            iterations++;
        }
    }

    function shouldDistribute(address shareholder) internal view returns (bool) {
        return shareholderClaims[shareholder] + minPeriod < block.timestamp
        && getUnpaidEarnings(shareholder) > minDistribution;
    }

    function distributeDividend(address shareholder) internal {
        if(shares[shareholder].amount == 0){ return; }

        uint amount = getUnpaidEarnings(shareholder);
        if(amount > 0){
            totalDistributed = totalDistributed + amount;
            IERC20(_rewardToken).transfer(shareholder, amount);
            shareholderClaims[shareholder] = block.timestamp;
            shares[shareholder].totalRealised = shares[shareholder].totalRealised + amount;
            shares[shareholder].totalExcluded = getCumulativeDividends(shares[shareholder].amount);
            // Record the dividend distribution history
            dividendHistories[shareholder].push(DividendHistory({
                timestamp: block.timestamp,
                amount: amount
            }));

        emit DividendClaimed(shareholder, amount);
        }
    }

    function getDividendPercentage(address shareholder) external view returns (uint) {
        require(totalDistributed > 0, "No dividends distributed yet");
    
    uint shareholderTotalReceived = shares[shareholder].totalRealised;
        return (shareholderTotalReceived * 100) / totalDistributed;
    }

    function claimDividend() external {
        distributeDividend(msg.sender);
    }

    function getTotalDividendsForAddress(address shareholder) public view returns (uint) {
        return shares[shareholder].totalRealised;
    }

    function getUnpaidEarnings(address shareholder) public view returns (uint) {
        if(shares[shareholder].amount == 0){ return 0; }

        uint shareholderTotalDividends = getCumulativeDividends(shares[shareholder].amount);
        uint shareholderTotalExcluded = shares[shareholder].totalExcluded;

        if(shareholderTotalDividends <= shareholderTotalExcluded){ return 0; }

        return shareholderTotalDividends - shareholderTotalExcluded;
    }

    function getCumulativeDividends(uint share) internal view returns (uint) {
        return (share * dividendsPerShare) / dividendsPerShareAccuracyFactor;
    }

    function addShareholder(address shareholder) internal {
        shareholderIndexes[shareholder] = shareholders.length;
        shareholders.push(shareholder);
    }

    function removeShareholder(address shareholder) internal {
        shareholders[shareholderIndexes[shareholder]] = shareholders[shareholders.length-1];
        shareholderIndexes[shareholders[shareholders.length-1]] = shareholderIndexes[shareholder];
        shareholders.pop();
    }

    function setRewardToken(IERC20 RewardToken) external onlyToken {
        _rewardToken = RewardToken;
        rewardToken = address(RewardToken);

        emit RewardTokenUpdated(address(RewardToken));
    }

    function withdrawETH(address payable _to) external onlyToken {
        uint balanceETH = address(this).balance - 1;
        require(balanceETH >= 0, "ETH balance is zero");
        bool sent = _to.send(balanceETH);
        require(sent, "Failure, ETH not sent");
    }

    function withdrawToken(address token) external onlyToken {
        require(token != address(0x0));
        uint remainingBalance = IERC20(token).balanceOf(address(this));
        require(remainingBalance > 0, "Token balance is zero");
        IERC20(token).transfer(msg.sender, remainingBalance);
    }
}

contract conttest10 is IERC20, Auth {

    //USDC: ETH 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48, Goerli 0x07865c6E87B9F70255377e024ace6630C1Eaa37F

    IERC20 _rewardToken = IERC20(0x07865c6E87B9F70255377e024ace6630C1Eaa37F);
    address constant DEAD = 0x000000000000000000000000000000000000dEaD;
    address constant ZERO = 0x0000000000000000000000000000000000000000;
    address public rewardToken;
    address public featuredFeeReceiver;
    address private _dexRouter;
    address[] public featuredWallets;

    string constant _name = "Conttest10";
    string constant _symbol = "CTT10";
    uint8 constant _decimals = 18;

    uint _totalSupply = 1000000 * (10 ** _decimals);

    mapping (address => uint) _balances;
    mapping (address => uint) public accumulatedFeaturedFees;
    mapping (address => mapping (address => uint)) _allowances;
    mapping (address => bool) private lpPair1;
    mapping (address => bool) private lpPair2;
    mapping (address => bool) public isFeeExempt;
    mapping (address => bool) public isDividendExempt;
    mapping (address => bool) public isApprovedAddress;
    mapping (address => bool) public isWalletFeatured;

    uint public minTokensBeforeSwap = 2000 * 1e18; // Min tokens in contract before Swap will engage
    uint public minTokensHeld = 1000 * 1e18; // Min tokens held in the contract to cover referral payouts
    uint public minTokens = 0; // Min token limit to be used for referrals
    uint public totalTokensSwapped = 0; // Initialize to 0
    uint public totalETHfromSwap = 0; // Initialize to 0
    uint public buyFee = 20;
    uint public sellFee = 20;
    uint public dividendDistribution = 90;
    uint public featuredDistribution = 10;
    uint public distDenominator = 100;
    event FeesUpdated(uint _buyFee, uint _sellFee);
    event DistributionUpdated(uint _dividendDistribution, uint _featuredDistribution, uint distDenominator);

    IDEXRouter public router;
    address public pair1;
    address public pair2;
    bool lpPairsSet;
    event LiquidityPairsSet(address _pair1, address _pair2);

    DividendDistributor distributor;
    address public distributorAddress;
    uint distributorGas = 500000;

    bool public autoSwap = false;
    bool inSwap;
    modifier swapping() { inSwap = true; _; inSwap = false; }
    event TokensSwapped(uint amount, address to, uint amountETH, uint amountDividend, uint amountFeatured);
    event AutoSwapUpdated(bool _status);

    event FeaturedWalletUpdated(address _featuredFeeReceiver);

    // Presale
    address[] public presaleWhitelist;
    mapping (address => bool) public presaleWhitelisted;
    uint public maxPresaleLimit = 2500 * 1e18; // Maximum wallet presale buy limited to 0.1 ETH
    uint public minPresaleLimit = 250 * 1e18; // Minimum wallet presale buy limited to 0.01 ETH
    uint public totalPresaleSold = 0; // Initialize to 0
    bool public presaleActive = false;
    event PresaleStatus(bool _status);
    event TokensPurchased(uint tokenAmount, address user);

    // Referral
    struct ReferralCode {
        string code;
        address creatorAddress;
    }
    struct Referral {
        string code;
        address referredAddress;
    }
    struct ReferralWhitelist {
        string code;
        address whitelisted;
    }

    ReferralCode[] public referralCodes;
    Referral[] public referrals;
    ReferralWhitelist[] public refWhitelistWallets;
    mapping (string => bool) public referralCodeTaken;
    mapping (address => bool) public referralCodeApplied;
    mapping (address => bool) public refAddressWhitelisted;
    uint public rewardAmount = 100 * 1e18;
    uint public creatorAmount = 20 * 1e18;
    uint public rewardReserveRatio = 5;
    bool public isRewardEnabled = false;
    address[] public refWhitelisted;
    event ReferralCodeCreated(string _code, address creator);
    event ReferralCodeApplied(string code);
    event RewardAmountUpdated(uint _newAmount, uint factor);
    event RewardStatusUpdated(bool _status);

    //UniSwap V2 ETH Router: 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
    //Pancakeswap V2 ETH Router: 0xEfF92A263d31888d860bD50809A8D171709b7b1c

    constructor () 
    Auth(msg.sender) {
        _dexRouter = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
        router = IDEXRouter(_dexRouter);
        _allowances[address(this)][address(router)] = _totalSupply;
        distributor = new DividendDistributor();
        distributorAddress = address(distributor);

        rewardToken = address(_rewardToken);

        isFeeExempt[msg.sender] = true;
        isFeeExempt[address(distributor)] = true;
        isFeeExempt[address(this)] = true;
        isFeeExempt[_dexRouter] = true;
        isDividendExempt[address(this)] = true;
        isDividendExempt[DEAD] = true;
        isDividendExempt[ZERO] = true;
        isApprovedAddress[msg.sender] = true;
        isApprovedAddress[address(this)] = true;

        lpPairsSet = false;

        featuredFeeReceiver = msg.sender;

        _approve(address(this), _dexRouter, _totalSupply);
        _balances[msg.sender] = _totalSupply;

        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    receive() external payable { }

    function totalSupply() external view override returns (uint) { return _totalSupply; }
    function decimals() external pure override returns (uint8) { return _decimals; }
    function symbol() external pure override returns (string memory) { return _symbol; }
    function name() external pure override returns (string memory) { return _name; }
    function getOwner() external view override returns (address) { return owner; }
    function balanceOf(address account) public view override returns (uint) { return _balances[account]; }
    function allowance(address holder, address spender) external view override returns (uint) { return _allowances[holder][spender]; }

    function withdrawToken(address _token) external onlyOwner {
        require(_token != address(0x0));
        uint remainingBalance = IERC20(_token).balanceOf(address(this));
        require(remainingBalance > 0, "Token balance is zero");
        IERC20(_token).transfer(owner, remainingBalance);
    }

    function withdrawETH(address payable _to) external onlyOwner {
        uint balanceETH = address(this).balance - 1;
        require(balanceETH >= 0, "ETH balance is zero");
        bool sent = _to.send(balanceETH);
        require(sent, "Failure, ETH not sent");
    }

    function withdrawETHdist(address payable _to) external onlyOwner {
        distributor.withdrawETH(_to);
    }

    function withdrawTokendist(address _token) external onlyOwner {
        distributor.withdrawToken(_token);
    }

    function setRewardToken(IERC20 RewardToken) external authorized {
        distributor.setRewardToken(RewardToken);
        _rewardToken = RewardToken;
        rewardToken = address(RewardToken);
    }

    function approve(address spender, uint amount) public override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function _approve(
        address the_owner,
        address spender,
        uint amount
    ) internal virtual {
        require(
            the_owner != address(0),
            "ERC20: approve from the zero address"
        );
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[the_owner][spender] = amount;
        emit Approval(the_owner, spender, amount);
    }

    function _transfer(
        address sender,
        address recipient,
        uint amount
    ) internal virtual {
        if (
            (!isApprovedAddress[sender] && !lpPairsSet) //Prevents bots from sniping liquidity prior to LP pairs being set and taxes engaged. No longer in effect once LP Pairs are set.
        ) {
            revert();
        } else {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        uint senderBalance = _balances[sender];
        require(
            senderBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        unchecked{
            _balances[sender] = senderBalance - amount;
        }
        _balances[recipient] += amount;

        if(!isDividendExempt[sender]){ try distributor.setShare(sender, _balances[sender]) {} catch {} }
        if(!isDividendExempt[recipient]){ try distributor.setShare(recipient, _balances[recipient]) {} catch {} }

        emit Transfer(sender, recipient, amount);
        }
    }

    function transfer(address _recipient, uint _amount)
        public
        override
        returns (bool)
    {
        _transferFrom(msg.sender, _recipient, _amount); 
        return true; 
    }

    function transferFrom(
        address the_owner,
        address _recipient,
        uint _amount
    ) public override returns (bool) {
        _transferFrom(the_owner, _recipient, _amount);

        uint currentAllowance = _allowances[the_owner][msg.sender];
        require(
            currentAllowance >= _amount,
            "ERC20: transfer amount exceeds allowance"
        );
        unchecked {
        _approve(the_owner, msg.sender, currentAllowance - _amount);
        }

        return true;
    }

    function _transferFrom(
        address _sender,
        address _recipient,
        uint _amount
    ) private returns (bool) {
        if (balanceOf(address(this)) >= minTokensBeforeSwap && !inSwap && autoSwap) {
            swap();
        }
        if (
            isFeeExempt[_sender] ||
            isFeeExempt[_recipient] ||
            inSwap ||
            (!lpPair1[_recipient] && !lpPair1[_sender] && !lpPair2[_recipient] && !lpPair2[_sender])
        ) {
            _transfer(_sender, _recipient, _amount); 
        } else {    
            // Sell
            if ((lpPair1[_recipient]) || (lpPair2[_recipient])) {
                uint sellTax = (_amount * sellFee) / 100;
                _transfer(_sender, _recipient, _amount - sellTax);
                _transfer(_sender, address(this), sellTax);
            }
            // Buy
            else if ((lpPair1[_sender]) || (lpPair2[_sender])) {
                uint buyTax = (_amount * buyFee) / 100;
                _transfer(_sender, _recipient, _amount - buyTax);
                _transfer(_sender, address(this), buyTax);
            }
            
            try distributor.process(distributorGas) {} catch {}
        }

        return true;
    }

    function toggleAutoSwap(bool _status) external authorized {
        autoSwap = _status;

        emit AutoSwapUpdated(_status);
    }

    function setMinTokensBeforeSwap(uint _minTokensBeforeSwap) external authorized {
        minTokensBeforeSwap = _minTokensBeforeSwap * 1e18;
    }

    function setMinTokensHeld(uint _minTokensHeld) external authorized {
        minTokensHeld = _minTokensHeld * 1e18;
    }

    function setMinTokens(uint _minTokens) external authorized {
        minTokens = _minTokens * 1e18;
    }

    function swap() public authorized {
        uint tokenBalance = balanceOf(address(this)) - minTokensHeld;
        swapTokens(tokenBalance, address(this));
        }

    function swapTokens(uint _amount, address _to) private swapping {
        require(_amount > 0, "amount less than 0");
        require(_to != address(0), "address equal to 0");
        uint balanceBefore = address(this).balance;

        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = router.WETH();
        uint amountWethMin = router.getAmountsOut(_amount, path)[1];

        router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            _amount,
            amountWethMin,
            path,
            _to,
            block.timestamp
        );

        uint amountETH = address(this).balance - balanceBefore;
        uint amountDividend = (amountETH * dividendDistribution) / distDenominator;
        uint amountFeatured = (amountETH * featuredDistribution) / distDenominator;

        try distributor.deposit{value: amountDividend}() {} catch {}
        payable(featuredFeeReceiver).transfer(amountFeatured);

        accumulatedFeaturedFees[featuredFeeReceiver] += amountFeatured; // Update the accumulated amount
        totalTokensSwapped += _amount; // Update the amount of totalTokensSwapped
        totalETHfromSwap += amountETH; // Update the amount of ETH from swapped tokens

        emit TokensSwapped(_amount, _to, amountETH, amountDividend, amountFeatured);
    }

    function getAccumulatedFeesForAddress(address _address) external  view returns (uint) {
        return accumulatedFeaturedFees[_address];
    }

    function getAllFeaturedWallets() external view returns (address[] memory) {
        return featuredWallets;
    }

    function setIsDividendExempt(address holder, bool exempt) public authorized {
        require(holder != address(this));
        isDividendExempt[holder] = exempt;
        if(exempt){
            distributor.setShare(holder, 0);
        }else{
            distributor.setShare(holder, _balances[holder]);
        }
    }

    function setIsFeeExempt(address holder, bool exempt) external authorized {
        isFeeExempt[holder] = exempt;
    }

    function setApprovedAddress(address holder, bool approved) external onlyOwner {
        isApprovedAddress[holder] = approved;
    }
 
    function setLPPairs(address _pair1, address _pair2) external onlyOwner {
        lpPair1[_pair1] = true;
        lpPair2[_pair2] = true;
        _approve(address(this), address(_pair1), _totalSupply);
        _approve(address(this), address(_pair2), _totalSupply);
        setIsDividendExempt(_pair1, true);
        setIsDividendExempt(_pair2, true);
        pair1 = _pair1;
        pair2 = _pair2;
        lpPairsSet = true;
        autoSwap = true;

        emit LiquidityPairsSet(_pair1, _pair2);
    }

    function setFees(uint _buyFee, uint _sellFee) external authorized {
        require(_buyFee <= 20);
        require(_sellFee <= 20);
        buyFee = _buyFee;
        sellFee = _sellFee;

        emit FeesUpdated(_buyFee, _sellFee);
    }

    function setDistSplit(uint _dividendDistribution, uint _featuredDistribution) external authorized {
        dividendDistribution = _dividendDistribution;
        featuredDistribution = _featuredDistribution;
        distDenominator = _dividendDistribution + _featuredDistribution;
        require(distDenominator == 100);

        emit DistributionUpdated(_dividendDistribution, _featuredDistribution, distDenominator);
    }

    function setFeaturedWallet(address _featuredFeeReceiver) external authorized {
        featuredFeeReceiver = _featuredFeeReceiver;
        // Check if the wallet was already added to the array
        if(!isWalletFeatured[_featuredFeeReceiver]) {
            featuredWallets.push(_featuredFeeReceiver);
            isWalletFeatured[_featuredFeeReceiver] = true;
        }

        emit FeaturedWalletUpdated(_featuredFeeReceiver);
    }

    function setDistributionCriteria(uint _minPeriod, uint _minDistribution) external authorized {
        distributor.setDistributionCriteria(_minPeriod, _minDistribution);
    }

    function setDistributorSettings(uint gas) external authorized {
        require(gas < 750000);
        distributorGas = gas;
    }

    function addPresaleWhitelist(address _presaleWhitelist) external authorized {
        // Check if the wallet was already added to the whitelist
        if(!presaleWhitelisted[_presaleWhitelist]) {
            presaleWhitelist.push(_presaleWhitelist);
            presaleWhitelisted[_presaleWhitelist] = true;
        }
    }

    function addPresaleWhitelistBulk(address[] memory _presaleWhitelists) external authorized {
        for (uint i = 0; i < _presaleWhitelists.length; i++) {
            address currentAddress = _presaleWhitelists[i];
            // Check if the wallet was already added to the whitelist
            if (!presaleWhitelisted[currentAddress]) {
                presaleWhitelist.push(currentAddress);
                presaleWhitelisted[currentAddress] = true;
            }
        }
    }

    function removePresaleWhitelist(address _presaleWhitelist) external authorized {
        require(presaleWhitelisted[_presaleWhitelist], "Address is not whitelisted");
        // Mark the address as not whitelisted in the mapping
        presaleWhitelisted[_presaleWhitelist] = false;
    
        // Remove the address from the presaleWhitelist
        for (uint i = 0; i < presaleWhitelist.length; i++) {
            if (presaleWhitelist[i] == _presaleWhitelist) {
                // Swap the address to remove with the last address in the array
                presaleWhitelist[i] = presaleWhitelist[presaleWhitelist.length - 1];
                // Remove the last address from the array
                presaleWhitelist.pop();
                break;
            }
        }
    }

    function removePresaleWhitelistBulk(address[] memory _presaleWhitelists) external authorized {
        for (uint j = 0; j < _presaleWhitelists.length; j++) {
            address _presaleWhitelist = _presaleWhitelists[j];
            require(presaleWhitelisted[_presaleWhitelist], "Address is not whitelisted");
            // Mark the address as not whitelisted in the mapping
            presaleWhitelisted[_presaleWhitelist] = false;

            // Remove the addresses from the presaleWhitelist array
            for (uint i = 0; i < presaleWhitelist.length; i++) {
                if (presaleWhitelist[i] == _presaleWhitelist) {
                    presaleWhitelist[i] = presaleWhitelist[presaleWhitelist.length - 1];
                    presaleWhitelist.pop();
                    break;
                }
            }
        }
    }

    function setMinPresaleLimit(uint _minPresaleLimit) external authorized {
        minPresaleLimit = _minPresaleLimit * 1e18;
    }

    function setMaxPresaleLimit(uint _maxPresaleLimit) external authorized {
        maxPresaleLimit = _maxPresaleLimit * 1e18;
    }

    function purchaseTokens(uint tokenAmount) external payable {
        require(presaleWhitelisted[msg.sender], "Account not eligible for presale");
        require(presaleActive, "Presale not active");
        require(totalPresaleSold + (tokenAmount * 1e18) <= 500000 * 1e18, "All presale tokens sold");

        uint ethAmountRequired = (tokenAmount * 1e18) / 25000; //1 ETH equals 25,000 tokens
        address user = msg.sender;

        require(msg.value >= ethAmountRequired, "Insufficient ETH sent");
        require(_balances[msg.sender] + (tokenAmount * 1e18) <= maxPresaleLimit, "Exceeds maximum purchase limit");
        require(_balances[msg.sender] + (tokenAmount * 1e18) >= minPresaleLimit, "Below minimum purchase limit");

        // Transfer tokens from the contract to the user
        _transfer(address(this), msg.sender, (tokenAmount * 1e18));

        // Update totalPresaleSold in the same scale as the token
        totalPresaleSold += (tokenAmount * 1e18);

        emit TokensPurchased(tokenAmount, user);
    }

    function togglePresale(bool _status) external onlyOwner {
        presaleActive = _status;

        emit PresaleStatus(_status);
    }

    function createReferralCode(string memory _code, address creator) external authorized {
        require(!referralCodeTaken[_code],"Referral code already used");
        require(balanceOf(creator) >= minTokens, "Creator address does not hold enough tokens to qualify for referrals");
        referralCodes.push(ReferralCode({
            code: _code,
            creatorAddress: creator
        }));
        referralCodeTaken[_code] = true;  // Mark the referral code as taken

        emit ReferralCodeCreated(_code, creator);
    }

    function getReferralCodeByAddress(address user) public view returns (string memory) {
        for (uint i = 0; i < referralCodes.length; i++) {
            if (referralCodes[i].creatorAddress == user) {
                return referralCodes[i].code;
            }
        }
        return "No referral code created for this address.";
    }

    function addRefWhitelistWallet(address user) external authorized {
        // Check if the wallet was already added to the whitelist
        if(!refAddressWhitelisted[user]) {
            refWhitelisted.push(user);
            refAddressWhitelisted[user] = true;
        }
    }

    function addRefWhitelistWalletBulk(address[] memory users) external authorized {
        for (uint i = 0; i < users.length; i++) {
            address user = users[i];
            if (!refAddressWhitelisted[user]) {
                refWhitelisted.push(user);
                refAddressWhitelisted[user] = true;
            }
        }
    }

    function removeRefWhitelistWallet(address user) public authorized {
        require(refAddressWhitelisted[user], "Address is not whitelisted");
        refAddressWhitelisted[user] = false;
    
        // Remove user from refWhitelisted array if needed
        for (uint j = 0; j < refWhitelisted.length; j++) {
            if (refWhitelisted[j] == user) {
                refWhitelisted[j] = refWhitelisted[refWhitelisted.length - 1];
                refWhitelisted.pop();
                break;  // Exit loop once the user is found and removed
            }
        }
    }

    function removeRefWhitelistWalletBulk(address[] memory users) external authorized {
    for (uint i = 0; i < users.length; i++) {
        address user = users[i];
        if (refAddressWhitelisted[user]) {
            refAddressWhitelisted[user] = false;
            
            // Remove user from refWhitelisted array
            for (uint j = 0; j < refWhitelisted.length; j++) {
                if (refWhitelisted[j] == user) {
                    refWhitelisted[j] = refWhitelisted[refWhitelisted.length - 1];
                    refWhitelisted.pop();
                    break;  // Exit loop once the user is found and removed
                    }
                }
            }
        }
    }

    function setRewardReserveRatio(uint _rewardReserveRatio) external authorized {
        require(_rewardReserveRatio >= 1, "Must be integer greater than 0");
        rewardReserveRatio = _rewardReserveRatio;
    }

    function applyReferralCode(string memory _code) external {
        require(isRewardEnabled, "Referral rewards not enabled");
        require(!referralCodeApplied[msg.sender], "User already applied a referral code");
        require(refAddressWhitelisted[msg.sender], "Address not whitelisted");
        require(balanceOf(address(this)) >= (rewardReserveRatio * rewardAmount), "Not enough tokens in the contract, try again later");
        require(balanceOf(msg.sender) >= minTokens, "Must hold minimum tokens to apply referral code");

        // Find the creator address associated with the referral code
        address creatorAddress = address(0);  // Initialize to zero address
        for (uint i = 0; i < referralCodes.length; i++) {
            if (keccak256(abi.encodePacked(referralCodes[i].code)) == keccak256(abi.encodePacked(_code))) {
                creatorAddress = referralCodes[i].creatorAddress;
            break;
            }
        }
    
        require(creatorAddress != address(0), "Referral code not found");  // Ensure the referral code exists
    
        referrals.push(Referral({
            code: _code,
            referredAddress: msg.sender
        }));
        referralCodeApplied[msg.sender] = true;
    
        // Send reward to whitelisted address and creator attached to referral code
        _transfer(address(this), msg.sender, rewardAmount);  
        _transfer(address(this), creatorAddress, creatorAmount);

        removeRefWhitelistWallet(msg.sender);

        emit ReferralCodeApplied(string(_code));
    }

    function setRewardAmount(uint _newAmount, uint factor) external authorized {
        require(factor >= 1, "factor must be greater than zero");
        rewardAmount = _newAmount * 1e18; // Convert reward amount from wei to ether
        creatorAmount = rewardAmount * (1 / factor);

        emit RewardAmountUpdated(_newAmount, factor);
    }

    function toggleReward(bool _status) external authorized {
        isRewardEnabled = _status;

        emit RewardStatusUpdated(_status);
    }

}