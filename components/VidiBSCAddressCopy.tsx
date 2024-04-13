// VidiETHAddressCopy component
import React, { useState } from 'react';

const BSCAddressCopy = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const contractAddress = "0x237FA37Be83955C62d852B16516e6F4407bf3945";

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
                Vidiac BSC Contract Address: {contractAddress} <button onClick={copyToClipboard} className="btn-copy">
                📋
            </button>
            </p>
            {copySuccess && <div style={{ color: 'green' }}>{copySuccess}</div>}
        </div>
    );
}

export default BSCAddressCopy;
