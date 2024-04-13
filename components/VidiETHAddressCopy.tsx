// VidiETHAddressCopy component
import React, { useState } from 'react';

const AddressCopy = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const contractAddress = "0x808A3C2d3A00449E897b66ee9CeBA22baFc35058";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(contractAddress)
            .then(() => {
                // If successful, update the copySuccess state
                setCopySuccess('Copied!');
            })
            .catch(err => {
                console.log('Something went wrong', err);
            })
    }

    return (
        <div>
            <p className="text-lg font-semibold max-w-[300px] sm:max-w-full">
                Vidiac ETH Contract Address: {contractAddress} <button onClick={copyToClipboard} className="btn-copy">
                📋
            </button>
            </p>
            {copySuccess && <div style={{ color: 'green' }}>{copySuccess}</div>}
        </div>
    );
}

export default AddressCopy;
