// FetchVidiData component
import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { formatEther } from 'viem';
import contractsConfig from '../utils/contractsConfig';

//const { VidiacETHContract, VidiacETHDistributor } = contractsConfig.ETH;
const { VidiacBSCContract, VidiacBSCDistributor } = contractsConfig.BSC;

const formatToken = (value: any, decimals = 18) => {
  return parseFloat(value) / Math.pow(10, decimals);
};

export const FetchVidiacData = () => {
  const { address } = useAccount();
  const [totalDividends, setTotalDividends] = useState(0); // Dedicated state for total dividends
  const [data, setData] = useState({
    /*eth: {
      userDividends: 0,
      userTokenBalance: 0,
      userUnpaidEarnings: 0,
    },*/
    bsc: {
      userDividends: 0,
      userTokenBalance: 0,
      userUnpaidEarnings: 0,
    },
    total: {
      userDividends: 0,
      userTokenBalance: 0,
      userUnpaidEarnings: 0,
    }
  });

  //const vidiacETHDistributorAddress = VidiacETHDistributor.address as `0x${string}`;
  //const vidiacETHContractAddress = VidiacETHContract.address as `0x${string}`;
  const vidiacBSCDistributorAddress = VidiacBSCDistributor.address as `0x${string}`;
  const vidiacBSCContractAddress = VidiacBSCContract.address as `0x${string}`;

  /*const totalDividendsDataETH = useContractRead({
    address: vidiacETHDistributorAddress,
    abi: VidiacETHDistributor.abi,
    functionName: 'totalDividends',
    watch: true,
    chainId: 1, 
  });*/

  // Example usage of useContractRead for fetching total dividends from BSC
  const totalDividendsDataBSC = useContractRead({
    address: vidiacBSCDistributorAddress,
    abi: VidiacBSCDistributor.abi,
    functionName: 'totalDividends',
    watch: true,
    chainId: 56,
  });

  // Use wagmi hooks to read contract data
  // VidiacETH

  /*const { data: userDividendsDataETH } = useContractRead({
    address: vidiacETHDistributorAddress,
    abi: VidiacETHDistributor.abi,
    functionName: 'getTotalDividendsForAddress',
    args: [address],
    watch: !!address,
    chainId: 1,
  });

  const { data: userUnpaidEarningsDataETH } = useContractRead({
    address: vidiacETHDistributorAddress,
    abi: VidiacETHDistributor.abi,
    functionName: 'getUnpaidEarnings',
    watch: !!address,
    chainId: 1,
  });

  const { data: userETHTokenBalanceData } = useContractRead({
    address: vidiacETHContractAddress,
    abi: VidiacETHContract.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: !!address,
  });*/

  // VidiacBSC

  const { data: userDividendsDataBSC } = useContractRead({
    address: vidiacBSCDistributorAddress,
    abi: VidiacBSCDistributor.abi,
    functionName: 'getTotalDividendsForAddress',
    args: [address],
    watch: !!address,
    chainId: 56,
  });

  const { data: userUnpaidEarningsDataBSC } = useContractRead({
    address: vidiacBSCDistributorAddress,
    abi: VidiacBSCDistributor.abi,
    functionName: 'getUnpaidEarnings',
    args: [address],
    watch: !!address,
    chainId: 56,
  });

  const { data: userBSCTokenBalanceData } = useContractRead({
    address: vidiacBSCContractAddress,
    abi: VidiacBSCContract.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: !!address,
});

  useEffect(() => {
    //let totalDividendsETH = 0;
    let totalDividendsBSC = 0;

    // Check if data from the ETH contract is available and use it
    /*if (totalDividendsDataETH.data) {
      totalDividendsETH = formatToken(totalDividendsDataETH.data.toString());
    }*/

    // Check if data from the BSC contract is available and use it
    if (totalDividendsDataBSC.data) {
      totalDividendsBSC = formatToken(totalDividendsDataBSC.data.toString());
    }

    // Update the total dividends state regardless of which contracts returned data
    setTotalDividends(/*totalDividendsETH + */totalDividendsBSC);

    if (!address) return;

    //let userDivsETH = 0;
    let userDivsBSC = 0;
    //let userETHBalance = 0;
    let userBSCBalance = 0;
    //let userUnpaidEarningsETH = 0;
    let userUnpaidEarningsBSC = 0;

    // Process contract reads for VidiacETH
  
    /*if (userDividendsDataETH) {
        const balanceBigInt = BigInt(userDividendsDataETH.toString());
        userDivsETH = formatToken(balanceBigInt); 
      }
    if (userUnpaidEarningsDataETH) {
        const balanceBigInt = BigInt(userUnpaidEarningsDataETH.toString());
        userUnpaidEarningsETH = formatToken(balanceBigInt); 
    }
    if (userETHTokenBalanceData) {
        const balanceBigInt = BigInt(userETHTokenBalanceData.toString());
        userETHBalance = parseFloat(formatEther(balanceBigInt));
      }*/  

    // Process contract reads for VidiacBSC
    
    if (userDividendsDataBSC) {
      const balanceBigInt = BigInt(userDividendsDataBSC.toString());
      userDivsBSC = formatToken(balanceBigInt); 
      }
    if (userUnpaidEarningsDataBSC) {
      const balanceBigInt = BigInt(userUnpaidEarningsDataBSC.toString());
      userUnpaidEarningsBSC = formatToken(balanceBigInt); 
      }
    if (userBSCTokenBalanceData) {
        const balanceBigInt = BigInt(userBSCTokenBalanceData.toString());
        userBSCBalance = parseFloat(formatEther(balanceBigInt));
      }

    setData({
        /*eth: {
          userDividends: userDivsETH,
          userTokenBalance: userETHBalance,
          userUnpaidEarnings: userUnpaidEarningsETH,
        },*/
        bsc: {
          userDividends: userDivsBSC,
          userTokenBalance: userBSCBalance,
          userUnpaidEarnings: userUnpaidEarningsBSC,
        },
        total: {
          userDividends: /*userDivsETH + */userDivsBSC,
          userTokenBalance: /*userETHBalance + */userBSCBalance,
          userUnpaidEarnings: /*userUnpaidEarningsETH + */userUnpaidEarningsBSC,
        }
      });
  }, [totalDividendsDataBSC.data, address, userDividendsDataBSC, userBSCTokenBalanceData]);

  return { totalDividends, data };
};
