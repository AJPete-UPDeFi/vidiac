// VidiShop.tsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const VidiShop = () => {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);
    return (
        <div className="text-center items-center">
          <p data-aos="fade-up" className='text-2xl font-bold mb-10 sm:text-4xl'>Support Creators with Every Purchase: Shop Exclusive Merchandise at www.vidiac.shop Now!</p>
          <div data-aos="fade-up" className="flex justify-center items-center p-2">
          <a href="https://www.vidiac.shop" target="_blank" rel="noopener noreferrer">
            <img src="/images/shopexample.png" alt="Shop Example" className="h-auto rounded-lg items-center mb-10" />
          </a>
          </div>
            <p data-aos="fade-up" className='text-2xl font-bold mb-10 sm:text-4xl'>Are you a creator and want to get featured in the Vidiac spotlight?</p>
            <p data-aos="fade-up" className='text-xl font-bold mb-4 sm:text-2xl'>Download our Creator Kit to get started!</p>
          <div data-aos="fade-up" className='text-lg font-semibold text-center'>
            <a href="/files/CreatorKit.zip" download="CreatorKit.zip">
              <button
                className="text-xl p-2 font-bold w-[240px] h-[64px] rounded bg-brandDeepBlue mt-4 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Download Creator Kit
              </button>
            </a>
          </div>
            <p data-aos="fade-up" className='text-base font-bold mb-4 sm:mb-auto mt-8 sm:text-xl sm:mt-10'>Ask the Vidiac team how to get paid for creating digital media.</p>
          </div>
    );
}

export default VidiShop;