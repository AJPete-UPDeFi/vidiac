// SpotlightSwiper.js
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { vidiCreatorConfig } from '../utils/vidiCreatorConfig';
import AOS from 'aos';
import 'aos/dist/aos.css';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectCards, Pagination, Keyboard } from 'swiper/modules';

export default function SpotlightSwiper() {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);
  // Utility to determine video source based on the URL
  const getVideoSrc = (url) => {
    if (url.includes('youtube.com')) {
      // YouTube URL
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('twitch.tv')) {
      // Twitch URL
      const channel = url.split('/').pop();
      return `https://player.twitch.tv/?channel=${channel}&parent=www.vidiac.co`;
    } else {
      // Default to YouTube if format is not supported or recognized
      return `https://www.youtube.com/embed/`;
    }
  };

  const renderCreatorSlide = (creatorKey) => {
    const creator = vidiCreatorConfig[creatorKey];
    const videoSrc = getVideoSrc(creator.videoUrl);

    return (
      <SwiperSlide key={creatorKey} className="bg-white">
        <div className="flex items-center justify-center p-2">
          <div data-aos="fade-right" className="w-5/6 p-2">
            <iframe
              src={videoSrc}
              allowFullScreen
              className="h-[450px] w-full"
            ></iframe>
          </div>
          <div
            data-aos="fade-left"
            className="flex w-1/2 flex-col items-center justify-center p-2"
          >
            <img
              src={creator.image}
              alt={`${creatorKey} Icon`}
              className="rounded-full border-2 border-black"
            />
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {creator.name}
            </p>
            <p className="mt-4 text-lg font-bold text-gray-900">
              {creator.description}
            </p>
            <div className="flex gap-4">
            <button
              aria-label="Shop Button"
              onClick={() => window.open(creator.shopLink, '_blank')}
              className="mt-8 w-[160px] rounded bg-brandDeepBlue px-4 py-2 font-bold text-white hover:bg-indigo-700"
            >
              Shop
            </button>
            <button
              aria-label="Shop Button"
              onClick={() => window.open(creator.donateLink, '_blank')}
              className="mt-8 w-[160px] rounded bg-brandDeepBlue px-4 py-2 font-bold text-white hover:bg-indigo-700"
            >
              Donate
            </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  };

  return (
    <div className="mt-10">
      <Swiper
        loop={true}
        effect={'cards'}
        grabCursor={true}
        autoplay={{ delay: 20000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Keyboard]}
        className="spotlight-swiper-container"
      >
        {Object.keys(vidiCreatorConfig).map(renderCreatorSlide)}
      </Swiper>
    </div>
  );
}
