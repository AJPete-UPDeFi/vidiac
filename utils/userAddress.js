//userAddress.js
import { getAccount } from '@wagmi/core';

const getUserAddress = async () => {
  try {
    const account = await getAccount();
    return account;
  } catch (error) {
    console.error('Failed to get user address:', error);
    return null;
  }
};

export default getUserAddress;