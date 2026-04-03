// Welcome.tsx
import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Welcome = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);
  return (
    <div className="flex flex-col justify-center justify-items-center">
      <div className="mb-5 mt-5 flex justify-center">
        <Image
          src="/images/vidiac_logo.png"
          alt="Vidiac Logo"
          width="300"
          height="300"
          className="animate-rotate"
        />
      </div>
      <div className="mb-4 mt-4 flex flex-row justify-center">
        <p className="text-indigo pr-1 text-center text-2xl font-bold">
          Empower Creators,{' '}
          <p className="text-center text-2xl font-bold text-pink-500">
            Enrich Yourself!
          </p>
        </p>
      </div>
      <div className="mb-4 ml-4 mr-4 mt-4 flex flex-row justify-center">
        <button
          data-aos="fade-right"
          aria-label="buy-button"
          onClick={() =>
            window.open(
              'https://guardiannn.ai/bsc/token/0x237fa37be83955c62d852b16516e6f4407bf3945?pair=0xf067afa4afb51216d2e5677ab7233effe8d119e0',
              '_blank'
            )
          }
          className="mr-3 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 sm:text-lg"
        >
          Buy Vidiac Tokens
        </button>
        <button
          data-aos="fade-left"
          aria-label="Vidiac-Telegram"
          onClick={() => window.open('https://t.me/vidiac_token', '_blank')}
          className="rounded-xl bg-purple-500 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 sm:text-lg"
        >
          Join the Community
        </button>
      </div>
    </div>
  );
};

export default Welcome;
