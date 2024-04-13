//Presale.tsx
import React, { useEffect, useState } from 'react';
import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import contractsConfig from '../utils/contractsConfig';
import { formatEther } from 'viem'; 
import { Card, CardBody, CardHeader, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from '@nextui-org/react';
import PresaleProgress from './PresaleProgress';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ReCAPTCHA from "react-google-recaptcha";
import AddressCopy from './VidiETHAddressCopy'; 

const Presale = () => {
    const [tokenAmount, setTokenAmount] = useState('');
    const [isEligible, setIsEligible] = useState(false);
    const [presaleActive, setPresaleActive] = useState(false);
    const [error, setError] = useState('');
    const { address: userAddress } = useAccount();
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const { VidiacETHContract } = contractsConfig.ETH;
    const vidiacETHContractAddress = VidiacETHContract.address as `0x${string}`;
    const [totalPresaleSold, setTotalPresaleSold] = useState<string | null>(null); // Total tokens sold in presale
    const [userTokenBalance, setUserTokenBalance] = useState<string | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [transactionStatus, setTransactionStatus] = useState<'success' | 'error' | null>(null);
    const [transactionMessage, setTransactionMessage] = useState('');
    const [isTransactionInProgress, setTransactionInProgress] = useState(false);

    const formatCurrency = (value:any) => {
        if (!value || value === 'Loading...') return value;
        return new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(Number(value));
    };
    
    const formatTokenCount = (value:any) => {
        if (!value || value === 'Loading...') return value;
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value));
    };

    // Token price
    const TOKEN_PRICE_ETH = 0.00004; // Token price in ETH

    // Convert the string token balance to a number for comparison
    const numericUserTokenBalance = userTokenBalance ? parseFloat(userTokenBalance) : 0;

    // Fetch presaleActive status
    const { data: presaleActiveData } = useContractRead({
        address: contractsConfig.ETH.VidiacETHContract.address as `0x${string}`,
        abi: contractsConfig.ETH.VidiacETHContract.abi,
        functionName: 'presaleActive',
    });
    
    const { data: isWhitelistedData } = useContractRead({
        address: contractsConfig.ETH.VidiacETHContract.address as `0x${string}`,
        abi: contractsConfig.ETH.VidiacETHContract.abi,
        functionName: 'presaleWhitelisted',
        args: [userAddress],
    });

    const { data: userTokenBalanceData } = useContractRead({
        address: vidiacETHContractAddress,
        abi: VidiacETHContract.abi,
        functionName: 'balanceOf',
        args: [userAddress],
      });

    const { data: totalPresaleSoldData } = useContractRead({
        address: vidiacETHContractAddress,
        abi: VidiacETHContract.abi,
        functionName: 'totalPresaleSold',
      });

    const handleRecaptcha = (token: any) => {
        setRecaptchaToken(token || '');
    };

    // Handle token amount change
    const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        // Allow only whole numbers within the range of 1 to 24000
        if (value === '' || (isWholeNumber(value) && isWithinRange(value, 1, 25000))) {
            setTokenAmount(value);
        }
    };
    
    // Helper function to check if a string represents a whole number
    const isWholeNumber = (value: string) => {
        const number = parseInt(value, 10);
        return !isNaN(number) && number.toString() === value;
    };
    
    // Helper function to check if a number is within a specified range
    const isWithinRange = (value: string, min: number, max: number) => {
        const number = parseInt(value, 10);
        return number >= min && number <= max;
    };

    const { write, data: writeData, error: writeError } = useContractWrite({
        address: contractsConfig.ETH.VidiacETHContract.address as `0x${string}`,
        abi: contractsConfig.ETH.VidiacETHContract.abi,
        functionName: 'purchaseTokens',
    });

    const handlePurchase = () => {
        console.log("Presale button clicked");
        setTransactionStatus(null);
        setTransactionMessage('');
        setTransactionInProgress(true);
        if (!tokenAmount) {
            console.error("Token amount is not set");
            return;
        }
        try {
            const weiValue = BigInt(Math.floor(TOKEN_PRICE_ETH * parseFloat(tokenAmount) * 1e18));
            console.log(`Attempting to purchase tokens: ${tokenAmount}, Wei Value: ${weiValue}`);
            write({
                args: [tokenAmount],
                value: weiValue,
            });
        } catch (error: any) {
            console.error("Error in handlePurchase:", error.message);
        }
    };

    const handleWhitelistApplication = async () => {
        if (!recaptchaToken) {
            console.error('Please complete the reCAPTCHA.');
            return;
        }

        // Call to the serverless function
        const response = await fetch('/api/applyWhitelist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: userAddress, recaptchaToken }),
        });

        // Handle response
        const responseData = await response.json();
            if (response.ok) {
                if (responseData.addressExists) {
                // Show message that the address already exists
                setError('Your address is awaiting approval from the Vidiac team.');
            } else {
                // Show success message and open modal
                setError('');
                console.log('Your address has been added to the whitelist.');
                onOpen();
                }
        } else {
            setError('Failed to submit application');
        }
    };

    const shareMessage = encodeURIComponent("Exciting times ahead for video enthusiasts! I'm diving into the Vidiac (VIDI) presale – a revolutionary step to uplift indie video creators and secure USD dividends for investors. www.up-defi.com/vidiac 🎥💰 #UPDeFi #Vidiac #VIDI");
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareMessage}`;

    useEffect(() => {
        if (presaleActiveData !== null) {
            setPresaleActive(!!presaleActiveData);
        }
        if (isWhitelistedData !== null) {
            setIsEligible(!!isWhitelistedData);
        }
        if (userTokenBalanceData) {
            // Convert the string to a bigint
            const balanceBigInt = BigInt(userTokenBalanceData.toString());
            const balanceInEther = formatEther(balanceBigInt);
            setUserTokenBalance(balanceInEther);
        }
        if (totalPresaleSoldData) {
            // Convert the string to a bigint
            const totalPresaleSoldBigInt = BigInt(totalPresaleSoldData.toString());
            const tokensSold = formatEther(totalPresaleSoldBigInt);
            setTotalPresaleSold(tokensSold);
        }
        if (writeData) {
            console.log("Transaction successful: ", writeData);
            setTransactionInProgress(false);
            setTransactionStatus('success');
            setTransactionMessage('Transaction successful!');
        }
        if (writeError) {
            console.error("Transaction error: ", writeError);
            setTransactionInProgress(false);
            setTransactionStatus('error');
            setTransactionMessage('Transaction failed. Ensure you have enough ETH to cover the transaction fee. Ensure you are following purchase limits.');
        }
    }, [presaleActiveData, isWhitelistedData, userTokenBalanceData, totalPresaleSoldData, writeData, writeError]);

    const calculatePresaleProgress = () => {
        const maxTokens = 500000; // maximum tokens for presale
        const tokensSold = totalPresaleSold ? parseFloat(totalPresaleSold) : 0;
    return (tokensSold / maxTokens) * 100;
    };

    return (
        <>
        <Card className="max-w-xl shadow-lg bg-black/60 xs:m-4">
            <CardHeader className="bg-transparent rounded-t-lg">
                <p className="text-2xl font-bold text-white sm:text-4xl">Calling All Video Maniacs! 
                <p className='text-xl font-semibold py-3 sm:text-3xl'> Earn USD Dividends, Support Video Creators</p>
                <p className='text-xl font-semibold py-1 sm:text-3xl'> Join the Vidiac Private Sale!</p>
                </p>
            </CardHeader>
            <CardBody className="bg-gradient-to-t from-blue-50 to-blue-300 rounded-lg">
                {!userAddress ? (
                  <div>
                    <h3 className="text-xl font-bold text-brandBlue">Vidiac(VIDI) Private Sale</h3>
                        <p className="text-lg font-semibold">Soft Cap 10 ETH / Hard Cap 20 ETH</p>
                        <p><AddressCopy/></p>
                        <p className="text-lg font-semibold">Minimum Initial Purchase: 250 VIDI / 0.01 ETH</p>
                        <p className="text-lg font-semibold">Maximum Purchase: 25,000 VIDI / 1 ETH</p>
                        <p className="text-lg font-semibold">Your VIDI Balance: {formatTokenCount(userTokenBalance)} Please Connect Wallet</p>
                        <p className="text-lg font-semibold">
                            Tokens Remaining for Private Sale: {totalPresaleSold ? formatTokenCount((500000 - parseFloat(totalPresaleSold)).toString()) : 'Loading...'} VIDI
                        </p>
                        <div className="my-4">
                            <PresaleProgress value={calculatePresaleProgress()} />
                        </div>
                    <div className='min-w-full'>
                    <ConnectButton />
                    </div>
                  </div>
                ) : numericUserTokenBalance > 24999 ? (
                    <>
                        <h3 className="text-xl font-bold text-brandBlue">Vidiac(VIDI) Private Sale</h3>
                        <p className="text-lg font-semibold">Soft Cap 10 ETH / Hard Cap 20 ETH</p>
                        <p><AddressCopy/></p>
                        <p className="text-lg font-semibold">Minimum Initial Purchase: 250 VIDI / 0.01 ETH</p>
                        <p className="text-lg font-semibold">Maximum Purchase: 25,000 VIDI / 1 ETH</p>
                        <p className="text-lg font-semibold">Your VIDI Balance: {formatTokenCount(userTokenBalance)} VIDI</p>
                        <p className="text-lg font-semibold">
                            Tokens Remaining for Private Sale: {totalPresaleSold ? formatTokenCount((500000 - parseFloat(totalPresaleSold)).toString()) : 'Loading...'} VIDI
                        </p>
                        <div className="my-4">
                            <PresaleProgress value={calculatePresaleProgress()} />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-semibold p-2">
                                Thank you for participating in the private sale! You have reached the maximum private sale token amount.
                            </p>
                        </div>
                    </>
                ) : presaleActive && isEligible ? (
                    <>
                        <h3 className="text-xl font-bold text-brandBlue">Vidiac(VIDI) Private Sale</h3>
                        <p className="text-lg font-semibold">Soft Cap 10 ETH / Hard Cap 20 ETH</p>
                        <p><AddressCopy/></p>
                        <p className="text-lg font-semibold">Minimum Initial Purchase: 250 VIDI / 0.01 ETH</p>
                        <p className="text-lg font-semibold">Maximum Purchase: 25,000 VIDI / 1 ETH</p>
                        <p className="text-lg font-semibold">Your VIDI Balance: {formatTokenCount(userTokenBalance)} VIDI</p>
                        <p className="text-lg font-semibold">
                            Tokens Remaining for Private Sale: {totalPresaleSold ? formatTokenCount((500000 - parseFloat(totalPresaleSold)).toString()) : 'Loading...'} VIDI
                        </p>
                        {isTransactionInProgress && (
                            <div className="text-2xl font-bold">
                                Processing Transaction...
                            </div>
                        )}
                        {transactionStatus && (
                            <div className={transactionStatus === 'success' ? 'text-green-700 text-2xl font-bold' : 'text-red-500 text-2xl font-bold'}>
                                {transactionMessage}
                            </div>
                        )}
                        <div className="my-4">
                            <PresaleProgress value={calculatePresaleProgress()} />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                        <input 
                            type="number"
                            value={tokenAmount}
                            onChange={handleTokenAmountChange}
                            placeholder="Enter Token Amount:"
                            className="w-full max-w-xs text-center text-xl font-semibold border-2 border-gray-300 rounded-lg p-2"
                        />
                        <Button 
                            onClick={handlePurchase} 
                            disabled={!tokenAmount}
                            className="text-2xl font-bold mt-4 max-w-xs"
                            color='primary'
                        >
                            Purchase Tokens
                        </Button>
                        </div>
                    </>
                ) : !presaleActive ? (
                    <p className="text-xl font-bold">Private Sale is not active.</p>
                ) : !isEligible ? (
                    <div>
                        <h3 className="text-xl font-bold text-brandBlue">Vidiac(VIDI) Private Sale</h3>
                        <p className="text-lg font-semibold">Soft Cap 10 ETH / Hard Cap 20 ETH</p>
                        <p><AddressCopy/></p>
                        <p className="text-lg font-semibold">Minimum Initial Purchase: 250 VIDI / 0.01 ETH</p>
                        <p className="text-lg font-semibold">Maximum Purchase: 25,000 VIDI / 1 ETH</p>
                        <p className="text-lg font-semibold">Your VIDI Balance: {formatTokenCount(userTokenBalance)} VIDI</p>
                        <p className="text-lg font-semibold">
                            Tokens Remaining for Private Sale: {totalPresaleSold ? formatTokenCount((500000 - parseFloat(totalPresaleSold)).toString()) : 'Loading...'} VIDI
                        </p>
                        <div className="my-4">
                            <PresaleProgress value={calculatePresaleProgress()} />
                        </div>
                    <p className="text-xl font-semibold p-2 mb-1">Your address is not whitelisted for the private sale.</p>
                    {error && <p className="text-red-600 text-2xl text-semibold">Error: {error}</p>}
                    {writeError && <p className="text-red-600 text-2xl text-semibold">Error: {writeError.message}</p>}
                    <>
                <ReCAPTCHA
                    sitekey="6Lfv2EspAAAAAGmcwxiKTRLYzV7Bd1QMIRYG2XwZ"
                    onChange={handleRecaptcha}
                    className='mt-3'
                />
            <Button onClick={handleWhitelistApplication} className="text-2xl font-bold mt-4 max-w-xs" color="primary">
                Apply for Whitelist
            </Button>
            <Modal 
              backdrop="opaque" 
              isOpen={isOpen} 
              onOpenChange={onOpenChange}
              radius="lg"
              classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                  <ModalHeader className="flex flex-col gap-1 text-xl text-gray-200 font-bold">Thank you for your interest!</ModalHeader>
                  <ModalBody>
                    <div className='text-lg text-gray-200 font-semibold'>
                    <p> 
                    Your address will be whitelisted shortly. We're excited to have you on board.
                    </p>
                    <Divider className='my-2'/>
                    <p>
                    Spread the word and share your enthusiasm for UP DeFi and Vidiac with your friends and followers! Let's make some noise!
                    </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                    Close
                    </Button>
                    <a 
                      href={twitterShareUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-500 hover:bg-blue-700 shadow-lg shadow-indigo-500/20 py-2 px-4 rounded text-white font-semibold"
                    >
                      Share on X
                    </a>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
                    </div>
                ) : (
                    <p className="text-xl font-semibold">Private sale is not active.</p>
                )}
                <div className='flex flex-col sm:flex-row justify-center items-center'>
                    <div className="w-full sm:w-1/2 px-2">
                        <p className="text-lg font-semibold mt-4 text-center sm:text-left">To show our gratitude, purchase 2,500 VIDI in the private sale and receive a limited edition physical coin!</p>
                        <img src="/images/VidiacETHCoinFront.png" alt="VidiacETH Coin Front" className="rounded-full w-full mx-auto mt-4"/>
                    </div>
                    <div className="w-full sm:w-1/2 px-2">
                        <p className="text-lg font-semibold mt-4 text-center sm:text-left">Each coin will be personalized with your wallet address and QR code that can be used to send or receive crypto!</p>
                        <img src="/images/VidiacETHCoinBack.png" alt="VidiacETH Coin Back" className="rounded-full w-full mx-auto mt-4"/>
                    </div>
                </div>
            </CardBody>
        </Card>
        </>
    );
};

export default Presale;