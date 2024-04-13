// UPDeFiSwiper.js
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

const UPDeFiSwiper = () => {
  return (
    <>
      <Swiper
        navigation={true}
        loop={true}
        pagination={{
            clickable: true}}
        mousewheel={false}
        keyboard={true}
        autoplay={{
            delay: 15000,
            disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        
        <SwiperSlide>
        <div className="flex flex-row h-full">
                <img src="/images/volatilemarket.png" alt="Volatile Market" className="swiper-slide-img w-1/2" />
                <div className="flex flex-col justify-between w-1/2 p-4">
                <div className="text-white font-semibold text-lg text-left pl-4">
                    <p className='font-extrabold text-xl'>Imagine investing in a token,</p> <p>only to watch its dividends plummet in value, turning what seemed like a promising venture into a financial quagmire. This scenario is all too common in the crypto space, where dividends paid in native tokens can become virtually worthless overnight, leaving investors with more uncertainties than gains.
                    </p>
                </div>
                <div className="text-white font-semibold text-lg text-left pl-4">
                <p className='font-extrabold text-xl'>Enter UP DeFi -</p><p>a revolutionary approach to decentralized finance. By automatically converting dividends into stable USDC tokens, UP DeFi shields investors from market volatility, ensuring the dividends you earn retain their value in USD. This innovative model not only secures your investments but also empowers you with consistent, reliable returns, freeing you from the anxieties of fluctuating market trends.
                </p>
                </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="flex flex-row h-full">
                <img src="/images/passiveincome.png" alt="Passive Income" className="swiper-slide-img w-1/2" />
                <div className="flex flex-col justify-between w-1/2 p-4">
                <div className="text-white font-semibold text-lg text-left pl-4">
                    <p className='font-extrabold text-xl'>In today's bustling world,</p> <p>securing a steady stream of passive income can feel like a distant dream. Many find themselves navigating complex investment landscapes, often requiring extensive knowledge and constant market monitoring, which is both time-consuming and overwhelming. This challenge leaves countless individuals unable to tap into the potential of passive income, missing out on opportunities to enhance their financial security.
                    </p>
                </div>
                <div className="text-white font-semibold text-lg text-left pl-4">
                <p className='font-extrabold text-xl'>UP DeFi brings a groundbreaking solution to this dilemma.</p><p>By simply holding UP DeFi tokens in your wallet, you unlock the door to consistent USD dividends. This approach demystifies the process of earning passive income, making it accessible and straightforward. No more constant market watching or intricate investment strategies – just hold and earn. UP DeFi empowers you with a passive income stream, providing financial stability and peace of mind.
                </p>
                </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="flex flex-row h-full">
                <img src="/images/creatives.png" alt="Creatives" className="swiper-slide-img w-1/2" />
                <div className="flex flex-col justify-between w-1/2 p-4">
                <div className="text-white font-semibold text-lg text-left pl-4">
                    <p className='font-extrabold text-xl'>For many creatives and artists,</p> <p>financial uncertainty is a constant companion. Despite immense talent and dedication, earning a stable income from their art remains a formidable challenge. The journey is often riddled with hurdles, from the scarcity of profitable opportunities to the struggle of reaching a supportive audience, leaving many creatives underfunded and undervalued.
                    </p>
                </div>
                <div className="text-white font-semibold text-lg text-left pl-4">
                <p className='font-extrabold text-xl'>UP DeFi steps in as a beacon of hope for these creative souls.</p><p>Through its innovative featured wallet system, UP DeFi directs extra USD dividends directly to chosen creatives, providing them with a financial boost. This system not only rewards artists but also fosters a supportive community, propelling creative talents to new heights. By investing in UP DeFi tokens, you contribute to a thriving ecosystem where artistry is cherished and financially rewarded.
                </p>
                </div>
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default UPDeFiSwiper;
