// HowItWorks.tsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
}, []);
  return (
    <div>
      <div data-aos="fade-up" className="text-center lg:text-left">
      <p className="mb-14 text-3xl font-bold text-center text-pink-500">How VIDI Works</p>
        <div className="flex flex-wrap justify-center">
          <div className="">
            <div data-aos="fade-right" className="border-2 rounded-lg max-w-[500px] flex flex-row gap-4 p-4 m-2">
                <div className="flex justify-center items-center w-1/3">
                    <img
                        src="/images/dualdexHIW.png"
                        alt="Dual DEX Token"
                        className="w-[75px] h-auto"
                    />  
                    </div>
                    <div className="flex flex-col justify-center w-2/3">
              <p className='text-brandDeepBlue font-bold text-2xl'>
                Dual DEX Token</p> <p className='text-lg text-gray-900 font-semibold'>Encourages arbitrage trades as
                each chart experiences their own price changes.
              </p>
              </div>
            </div>
            <div data-aos="fade-left" className="border-2 rounded-lg max-w-[500px] flex flex-row gap-4 p-4 m-2">
                <div className="flex justify-center items-center w-1/3">
                    <img
                        src="/images/taxedHIW.png"
                        alt="Taxes to USDC"
                        className="w-[75px] h-auto"
                    />  
                    </div>
                    <div className="flex flex-col justify-center w-2/3">
              <p className='text-brandDeepBlue font-bold text-2xl'>
                Taxes to USDC</p> <p className='text-lg text-gray-900 font-semibold'>VIDI trades on the DEX are taxed and those taxes are converted to USDC.
              </p>
              </div>
            </div>
            </div>

            <div>
            <div data-aos="fade-right" className="border-2 rounded-lg max-w-[500px] flex flex-row gap-4 p-4 m-2">
                <div className="flex justify-center items-center w-1/3">
                    <img
                        src="/images/usdcHIW.png"
                        alt="USDC Dividends"
                        className="w-[75px] h-auto"
                    />  
                    </div>
                    <div className="flex flex-col justify-center w-2/3">
              <p className='text-brandDeepBlue font-bold text-2xl'>
                USDC Dividends</p> <p className='text-lg text-gray-900 font-semibold'>The USDC is then distributed directly to the investor and the
              Featured Creator.
              </p>
              </div>
              </div>
            <div data-aos="fade-left" className="border-2 rounded-lg max-w-[500px] flex flex-row gap-4 p-4 m-2">
                <div className="flex justify-center items-center w-1/3">
                    <img
                        src="/images/voteHIW.png"
                        alt="Featured Creator"
                        className="w-[75px] h-auto"
                    />  
                    </div>
                    <div className="flex flex-col justify-center w-2/3">
              <p className='text-brandDeepBlue font-bold text-2xl'>
                Featured Creator</p> <p className='text-lg text-gray-900 font-semibold'>Creators are chosen by the community to receive 10% of all the USDC generated.
              </p>
              </div>
              </div>
              
          </div>
        <div>

        <div data-aos="fade-right" className="border-2 rounded-lg max-w-[500px] flex flex-row gap-4 p-4 m-2">
                <div className="flex justify-center items-center w-1/3">
                    <img
                        src="/images/referralHIW.png"
                        alt="Referral Codes"
                        className="w-[75px] h-auto"
                    />  
                    </div>
                    <div className="flex flex-col justify-center w-2/3">
              <p className='text-brandDeepBlue font-bold text-2xl'>
                Referral Codes</p> <p className='text-lg text-gray-900 font-semibold'>Creators can create referral codes to encourage their
                audience to become new investors.
              </p>
              </div>
              </div>
              <div data-aos="fade-left" className="border-2 rounded-lg max-w-[500px] flex flex-row gap-4 p-4 m-2">
                <div className="flex justify-center items-center w-1/3">
                    <img
                        src="/images/cashHIW.png"
                        alt="Merch Store"
                        className="w-[75px] h-auto"
                    />  
                    </div>
                    <div className="flex flex-col justify-center w-2/3">
              <p className='text-brandDeepBlue font-bold text-2xl'>
                Merch Store</p> <p className='text-lg text-gray-900 font-semibold'>Creators merch is sold on the Vidiac store. The proceeds are used to purchase VIDI on the DEX and sent to the creator.
              </p>
              </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
