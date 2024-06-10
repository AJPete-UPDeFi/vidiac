// Welcome.tsx
import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Welcome = () => {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);
  return (
    <div className="flex flex-col justify-center justify-items-center">
        <div className="flex justify-center mt-5 mb-5">
        <Image src="/images/playbutton1.png" alt="Vidiac Logo" width="300" height="300" className="animate-rotate" />
        </div>
        <div className="flex flex-row justify-center mt-4 mb-4">
        <p className="text-center font-bold text-2xl text-indigo pr-1">Empower Creators, <p className="text-center font-bold text-2xl text-pink-500">Enrich Yourself!</p></p>
        </div>
        <div className="flex flex-row justify-center mt-4 mb-4 ml-4 mr-4">
        <button data-aos="fade-right" aria-label='guardiannn-vidi' onClick={() => window.open('/dashboard#swap', '_blank')} className="bg-indigo-500 hover:bg-indigo-700 text-white text-xs sm:text-lg font-bold py-2 px-4 mr-3 rounded-xl">
          Buy Vidiac Tokens
        </button>
        <button data-aos="fade-left" aria-label='Vidiac-Telegram' onClick={() => window.open('https://t.me/vidiac_token', '_blank')} className="bg-purple-500 hover:bg-purple-700 text-white text-xs sm:text-lg font-bold py-2 px-4 rounded-xl">
          Join the Community
        </button>
        </div>
    </div>
  );
  
};

export default Welcome;