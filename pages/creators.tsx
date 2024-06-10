// creators.tsx
import React, { useEffect } from "react";
import NavbarButton from "../components/NavbarButton";
import NavbarVidiac from "../components/NavbarVidiac";
import SpotlightSwiper from "../components/SpotlightSwiper";
import SpotlightSwiperSmall from "../components/SpotlightSwiperSmall";
import VidiShop from "../components/VidiShop";
import FeaturedCreator from "../components/FeaturedCreator";
import FeaturedVideo from "../components/FeaturedVideo";
import { Button, Link, Divider, Image } from '@nextui-org/react';
import AOS from "aos";
import "aos/dist/aos.css";
import FeaturedVideoSM from "../components/FeaturedVideoSM";

const Creators = () => {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);
    return (
        <div>
          <NavbarVidiac />
        <main className="flex flex-col items-center justify-center">
        {/*
        <p data-aos="fade-up" className="text-5xl text-center font-extrabold text-gray-900 mb-5 mt-10">Featured Creator</p>
       
        <section id="featured" className="flex justify-center justify-items-center mt-5 mb-5 p-2">
          <div className="grid grid-cols-1 xl:grid-cols-2">
          <div data-aos="fade-right" className="hidden sm:flex">
          <FeaturedVideo />
          </div>
          <div data-aos="fade-right" className="flex justify-center sm:hidden">
          <FeaturedVideoSM />
          </div>
          <div data-aos="fade-left" className="">
          <FeaturedCreator />
          </div>
          </div>
        </section>
      ` 
        <Divider className='m-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>
      */}
        <section id="spotlight" data-aos="fade-up" className='mt-10 mb-5 border-2 border-white rounded-2xl p-4'>
        <p className='text-center text-5xl font-extrabold text-gray-900 mb-5'>Partnered Creators</p>
        <section className='justify-center mb-10 hidden md:flex flex-col'>
          <SpotlightSwiper />
        </section>
        <section className='md:hidden'>
          <SpotlightSwiperSmall />
        </section>
        </section>

        <Divider className='m-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

          <VidiShop />

          <Divider className='m-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

          <footer data-aos="fade-up" className="p-4">
          <div className="flex flex-col items-center text-center text-gray-900 font-bold text-2xl">
            <p>&copy; 2024 UP DeFi LLC - Vidiac. All rights reserved.</p>
              <div className="flex justify-center gap-4 mt-4 p-2 bg-white w-fit rounded-lg">
                <button aria-label='Merch Store' onClick={() => window.open('https://www.vidiac.shop', '_blank')}>
                  <Image src="/images/vidiShop.png" alt="VIDI Shop" width={36} height={36}/>
                </button>
                <button aria-label='Telegram' onClick={() => window.open('https://t.me/vidiac_token', '_blank')}>
                  <Image src="/images/Telegram.svg" alt="Telegram" width={36} height={36}/>
                </button>
                <button aria-label='X' onClick={() => window.open('https://twitter.com/Vidiac_Token', '_blank')}>
                  <Image src="/images/X.svg" alt="X" width={36} height={36}/>
                </button>
                <button aria-label='Instagram' onClick={() => window.open('https://www.instagram.com/updeficrypto/', '_blank')}>
                  <Image src="/images/Instagram.svg" alt="Instagram" width={36} height={36}/>
                </button>
                <button aria-label='Discord' onClick={() => window.open('https://discord.gg/U2B8vhTN2P', '_blank')}>
                  <Image src="/images/Discord.svg" alt="Discord" width={36} height={36}/>
                </button>
             </div>
          </div>
        </footer>
        </main>
        </div>
    );
}

export default Creators;