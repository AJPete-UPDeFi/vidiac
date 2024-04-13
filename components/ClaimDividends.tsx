//Presale.tsx
import React, { useEffect, useState } from 'react';
import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import contractsConfig from '../utils/contractsConfig';
import { formatEther } from 'viem'; 
import { Button } from '@nextui-org/react';

const ClaimDividends = () => {
    const [error, setError] = useState('');
    const { address: userAddress } = useAccount();
    const { VidiacETHDistributor } = contractsConfig.ETH;
    const vidiacETHDistributorAddress = VidiacETHDistributor.address as `0x${string}`;
    const [transactionStatus, setTransactionStatus] = useState<'success' | 'error' | null>(null);
    const [transactionMessage, setTransactionMessage] = useState('');
    const [isTransactionInProgress, setTransactionInProgress] = useState(false);

    const { write, data: writeData, error: writeError } = useContractWrite({
        address: contractsConfig.ETH.VidiacETHDistributor.address as `0x${string}`,
        abi: contractsConfig.ETH.VidiacETHDistributor.abi,
        functionName: 'claimDividend',
    });

    const handleClaim = () => {
        console.log("Claim dividend button clicked");
        setTransactionStatus(null);
        setTransactionMessage('');
        setTransactionInProgress(true);
        try {
            console.log(`Attempting to claim dividends for address: ${userAddress}`);
            write({
            });
        } catch (error: any) {
            console.error("Error in claiming dividends:", error.message);
        }
    };

    useEffect(() => {
        if (writeData) {
            console.log("Claim successful: ", writeData);
            setTransactionInProgress(false);
            setTransactionStatus('success');
            setTransactionMessage('Claim successful!');
        }
        if (writeError) {
            console.error("Transaction error: ", writeError);
            setTransactionInProgress(false);
            setTransactionStatus('error');
            setTransactionMessage('Transaction failed. Ensure you have enough ETH to cover the transaction fee.');
        }
    }, [writeData, writeError]);

    return (
        <>
            <div className="flex flex-col">
                <Button 
                    onClick={handleClaim} 
                    className="text-2xl font-bold mt-4 max-w-xs"
                    color='primary'
                >
                    Claim Dividends
                </Button>
            </div>
        </>           
    );
};

export default ClaimDividends;