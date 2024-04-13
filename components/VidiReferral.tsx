// VidiReferral.tsx
import React, { useEffect, useState } from 'react';
import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import contractsConfig from '../utils/contractsConfig';
import { Card, CardBody, CardHeader, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther } from 'viem';
import ReCAPTCHA from "react-google-recaptcha";

const VidiReferral = () => {
    const [code, setCode] = useState('');
    const [isEligible, setIsEligible] = useState(false);
    const [referralActive, setReferralActive] = useState(false);
    const [refCodeApplied, setRefCodeApplied] = useState(false);
    const [rewardAmount, setRewardAmount] = useState(0);
    const [error, setError] = useState('');
    const { address: userAddress } = useAccount();
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // Fetch referralActive status
    const { data: referralActiveData } = useContractRead({
        address: contractsConfig.BSC.VidiacBSCContract.address as `0x${string}`,
        abi: contractsConfig.BSC.VidiacBSCContract.abi,
        functionName: 'isReferralEnabled',
    });

    const { data: isWhitelistedData } = useContractRead({
        address: contractsConfig.BSC.VidiacBSCContract.address as `0x${string}`,
        abi: contractsConfig.BSC.VidiacBSCContract.abi,
        functionName: 'refAddressWhitelisted',
        args: [userAddress],
    });

    const { data: refCodeAppliedData } = useContractRead({
        address: contractsConfig.BSC.VidiacBSCContract.address as `0x${string}`,
        abi: contractsConfig.BSC.VidiacBSCContract.abi,
        functionName: 'referralCodeApplied',
        args: [userAddress],
    });

    const { write, error: writeError } = useContractWrite({
        address: contractsConfig.BSC.VidiacBSCContract.address as `0x${string}`,
        abi: contractsConfig.BSC.VidiacBSCContract.abi,
        functionName: 'applyReferralCode',
    });

    const { data: rewardAmountData} = useContractRead({
        address: contractsConfig.BSC.VidiacBSCContract.address as `0x${string}`,
        abi: contractsConfig.BSC.VidiacBSCContract.abi,
        functionName: 'referralAmount',
    });

    const applyCode = (referralCode: string) => {
      write({
        args: [referralCode],
      });
    };

    const handleRecaptcha = (token: any) => {
      setRecaptchaToken(token || '');
    };

  const handleWhitelistApplication = async () => {
    if (!recaptchaToken) {
        setError('Please complete the reCAPTCHA.');
        return;
    }

    // Call to the serverless function
    const response = await fetch('/api/applyWhitelistRef', {
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
            console.log('Your address has been added to the whitelist and is awaiting approval.');
            onOpen();
        }
    } else {
        setError('Failed to submit application');
    }
};
  
    const shareMessage = encodeURIComponent("Join the Vidiac revolution! 🎥 This is more than just a token; it's a movement to empower video creators and share in their success. www.up-defi.com/vidiac 🚀 #UPDeFi #Vidiac #VIDI");
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareMessage}`;

    useEffect(() => {
        if (referralActiveData !== null) {
            setReferralActive(!!referralActiveData);
        }
        if (isWhitelistedData !== null) {
            setIsEligible(!!isWhitelistedData);
        }
        if (refCodeAppliedData !== null) {
            setRefCodeApplied(!!refCodeAppliedData);
        }
        if (rewardAmountData) {
          const rewardAmountBigInt = BigInt(rewardAmountData.toString());
          const formattedRewardAmount = parseFloat(formatEther(rewardAmountBigInt));
          setRewardAmount(formattedRewardAmount); // Update state directly here
       }
    }, [referralActiveData, isWhitelistedData, refCodeAppliedData, rewardAmountData]);

    return (
        <Card className="max-w-xl shadow-lg m-4 mb-10 bg-black/60">
            <CardHeader className="bg-transparent rounded-t-lg">
                <p className="text-2xl font-bold text-white sm:text-4xl">Have a Referral Code? 
                <p className='text-xl font-bold py-2 sm:text-3xl'> Apply it here!</p>
                <p className='text-lg font-semibold sm:text-2xl'>Current Reward Amount: {rewardAmount} VIDI</p>
                </p>
            </CardHeader>
            <CardBody className="bg-gradient-to-t from-blue-50 to-blue-300 rounded-2xl">
                {!userAddress ? (
                  <div className='flex flex-grid justify-between justify-text-center'>
                    <div className='min-w-full'>
                    <ConnectButton />
                    </div>
                  </div>
                ) :referralActive && isEligible && !refCodeApplied? (
                    <>
                        <div className="flex flex-col items-center justify-center">
                        <input 
                            type="string"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter Referral Code:"
                            className="w-full max-w-xs text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg p-2"
                        />
                        <Button 
                          onClick={() => applyCode(code)}
                          disabled={!code}
                          className="text-2xl font-bold mt-4 max-w-xs"
                          color='primary'
                        >
                          Apply Code
                        </Button>
                        </div>
                    </>
                ) : refCodeApplied ? (
                    <div>
                    <p className="text-xl font-semibold">Congratulations, looks like you have already applied a referral code. Thank you for supporting Vidiac creators.</p>
                    </div>
                ) : !isEligible ? (
                    <div>
                    <p className="text-md font-semibold">Your address is not yet eligible for a referral. For the security of the contract, an address must be whitelisted prior to applying a referral code.</p>
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
                    Spread the word and share your enthusiasm for UP DeFi and Vidiac with your friends and followers on X! Let's make some noise!
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
                    <p className="text-xl font-semibold">Referral is not active.</p>
                )}
            </CardBody>
        </Card>
    );
};

export default VidiReferral;