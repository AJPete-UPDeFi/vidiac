// VidiETHAddressCopy component
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BSCAddressCopy = () => {
  const [copySuccess, setCopySuccess] = useState('');
  const contractAddress = '0x237FA37Be83955C62d852B16516e6F4407bf3945';

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(contractAddress)
      .then(() => {
        // If successful, update the copySuccess state
        setCopySuccess('Address Copied!');
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  };

  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);

  return (
    <div className="max-w-[350px] p-2 text-lg font-semibold sm:max-w-full">
      <p data-aos="fade-right" className="mb-2 text-center text-3xl font-bold">
        VIDI BSC Contract Address
      </p>
      <button
        data-aos="fade-left"
        onClick={copyToClipboard}
        className="btn-copy flex items-center rounded-md p-3 transition-colors hover:bg-brandDeepBlue hover:text-white"
      >
        <img
          src="/images/binance.png"
          alt="Binance"
          className="mr-4 h-12 w-12"
        />
        <span className="text-md mb-2 break-all sm:text-2xl">
          {contractAddress}
        </span>
      </button>
      {copySuccess && (
        <div style={{ color: 'green', fontWeight: 'bold' }}>{copySuccess}</div>
      )}
    </div>
  );
};

export default BSCAddressCopy;
