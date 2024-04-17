// VidiReferral.tsx
import React, { useEffect, useState } from 'react';
import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import contractsConfig from '../utils/contractsConfig';
import { Card, CardBody, CardHeader, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther } from 'viem';

const VidiReferral = () => {
    const [code, setCode] = useState('');
    const [isEligible, setIsEligible] = useState(false);
    const [isAwaitingApproval, setIsAwaitingApproval] = useState(false);
    const [referralActive, setReferralActive] = useState(false);
    const [refCodeApplied, setRefCodeApplied] = useState(false);
    const [rewardAmount, setRewardAmount] = useState(0);
    const [error, setError] = useState('');
    const { address: userAddress } = useAccount();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { isOpen: isApplyCodeModalOpen, onOpen: onApplyCodeModalOpen, onClose: onApplyCodeModalClose } = useDisclosure();

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

    const { data: rewardAmountData} = useContractRead({
        address: contractsConfig.BSC.VidiacBSCContract.address as `0x${string}`,
        abi: contractsConfig.BSC.VidiacBSCContract.abi,
        functionName: 'referralAmount',
    });

    const {
      write,
      data: contractWriteData,
      error: contractWriteError
      } = useContractWrite({
      address: contractsConfig.BSC.VidiacBSCContract.address as `0x${string}`,
      abi: contractsConfig.BSC.VidiacBSCContract.abi,
      functionName: 'applyReferralCode',
      args: [code]
    });

    const applyCode = (code: string) => {
      if (!code) {
          console.error("Referral code is empty.");
          return;
      }
      write();
    };

    const checkWhitelistStatus = async () => {
      if (!userAddress) return;
      try {
          const response = await fetch(`/api/checkWhitelistStatus?walletAddress=${encodeURIComponent(userAddress)}`, {
              method: 'GET'
          });
          const data = await response.json();
          if (response.ok) {
              setIsAwaitingApproval(data.isAwaitingApproval);
          } else {
              setError("Failed to retrieve whitelist status.");
          }
      } catch (error) {
          console.error("Error checking whitelist status:", error);
          setError("An error occurred while checking whitelist status.");
      }
  };
  
    const handleWhitelistApplication = async () => {
  
      // Call to the serverless function with just the walletAddress
      const response = await fetch('/api/applyWhitelistRef', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAddress: userAddress }),
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
  
    const shareMessageApply = encodeURIComponent("Thank you for the free VIDI @Vidiac_Token 💵 Get yours by checking out www.vidiac.co 🚀 #UPDeFi #Vidiac #VIDI");
    const twitterShareUrlApply = `https://twitter.com/intent/tweet?text=${shareMessageApply}`;

    const shareMessageWhitelist = encodeURIComponent("@Vidiac_Token I just applied for the referral whitelist and I am excited to join the #Vidiac family! www.vidiac.co #VIDI");
    const twitterShareUrlWhitelist = `https://twitter.com/intent/tweet?text=${shareMessageWhitelist}`;

    useEffect(() => {
        if (contractWriteData) {
          console.log('Referral code successfully applied');
          onApplyCodeModalOpen(); // Open the modal upon successful contract write
        }
        if (contractWriteError) {
          console.error('Error applying referral code:', contractWriteError.message);
          // Assume setError is a state setter function for displaying errors
        }
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
        
        checkWhitelistStatus();
    }, [referralActiveData, isWhitelistedData, refCodeAppliedData, rewardAmountData, userAddress, contractWriteData, contractWriteError]);

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
                  ) : referralActive && isEligible && !refCodeApplied ? (
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
                        <Modal 
                          backdrop="opaque" 
                          isOpen={isApplyCodeModalOpen} 
                          onOpenChange={onOpenChange}
                          onClose={onApplyCodeModalClose}
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
                          <ModalHeader className="flex flex-col gap-1 text-xl text-gray-200 font-bold">The referral code has been applied!</ModalHeader>
                          <ModalBody>
                            <div className='text-lg text-gray-200 font-semibold'>
                              <p> 
                              Enjoy your VIDI tokens. We're excited to have you on board.
                              </p>
                          <Divider className='my-2'/>
                            <p>
                            Let the world know you're part of the Vidiac revolution! Share on Twitter:
                            </p>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" variant="light" onPress={onApplyCodeModalClose}>
                            Close
                            </Button>
                              <a 
                              href={twitterShareUrlApply} 
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
                          </div>
                    </>
                ) : refCodeApplied ? (
                    <div>
                    <p className="text-xl font-semibold">Congratulations, looks like you have already applied a referral code. Thank you for supporting Vidiac creators.</p>
                    </div>
              ) : isAwaitingApproval ? (
                <p className="text-xl font-semibold">
                Please be patient as your address is awaiting approval. Join the conversation here
                <a href="https://t.me/vidiac_token" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-500">
                <i className="fab fa-telegram-plane p-1"></i>
                </a>
                and let us know we need to hurry up.
                </p>
            ) : !isEligible ? (
                    <div>
                    <p className="text-md font-semibold">Your address is not yet eligible for a referral. For the security of the contract, an address must be whitelisted prior to applying a referral code.</p>
                    {error && <p className="text-red-600 text-2xl text-semibold">Error: {error}</p>}
                    {contractWriteError && <p className="text-red-600 text-2xl text-semibold">Error: {contractWriteError.message}</p>} 
                    <>      
            <Button 
              onClick={handleWhitelistApplication} 
              className="text-2xl font-bold mt-4 max-w-xs" 
              color="primary"
            >
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
                    Let the world know you're part of the Vidiac revolution! Share on Twitter:
                    </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                    Close
                    </Button>
                    <a 
                      href={twitterShareUrlWhitelist} 
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