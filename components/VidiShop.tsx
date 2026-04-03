// VidiShop.tsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const VidiShop = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);
  return (
    <div className="items-center text-center">
      <p data-aos="fade-up" className="mb-10 text-2xl font-bold sm:text-4xl">
        Support Creators with Every Purchase: Shop Exclusive Merchandise at
        www.vidiac.shop Now!
      </p>
      <div data-aos="fade-up" className="flex items-center justify-center p-2">
        <a
          href="https://www.vidiac.shop"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/shopexample.png"
            alt="Shop Example"
            className="mb-10 h-auto items-center rounded-lg"
          />
        </a>
      </div>
      <p data-aos="fade-up" className="mb-10 text-2xl font-bold sm:text-4xl">
        Are you a creator and want to get featured in the Vidiac spotlight?
      </p>
      <p data-aos="fade-up" className="mb-4 text-xl font-bold sm:text-2xl">
        Download our Creator Kit to get started!
      </p>
      <div data-aos="fade-up" className="text-center text-lg font-semibold">
        <a href="/files/CreatorKit.zip" download="CreatorKit.zip">
          <button className="mt-4 h-[64px] w-[240px] rounded bg-brandDeepBlue p-2 px-4 py-2 text-xl font-bold text-white hover:bg-indigo-700">
            Download Creator Kit
          </button>
        </a>
      </div>
      <p
        data-aos="fade-up"
        className="mb-4 mt-8 text-base font-bold sm:mb-auto sm:mt-10 sm:text-xl"
      >
        Ask the Vidiac team how to get paid for creating digital media.
      </p>
    </div>
  );
};

export default VidiShop;
