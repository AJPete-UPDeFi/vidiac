import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useContractRead } from 'wagmi';
import contractsConfig from '../utils/contractsConfig';
import { vidiCreatorConfig } from '../utils/vidiCreatorConfig';

// Import Swiper styles and required modules
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFlip, Pagination, Keyboard } from 'swiper/modules';

const { VidiacETHDistributor } = contractsConfig.ETH;

export default function SpotlightSwiperSmall() {
  const [creatorDividends, setCreatorDividends] = useState({});

  // Create an array of creator keys
  const creatorKeys = Object.keys(vidiCreatorConfig);

  // Use `useContractRead` for each creator
  const creatorData = creatorKeys.map(creatorKey => {
    const creator = vidiCreatorConfig[creatorKey];
    return useContractRead({
      address: VidiacETHDistributor.address,
      abi: VidiacETHDistributor.abi,
      functionName: 'getTotalDividendsForAddress',
      args: [creator.address],
      watch: true,
      chainId: 5,
    });
  });

  useEffect(() => {
    // Update state when data is fetched for any creator
    creatorKeys.forEach((creatorKey, index) => {
      const { data } = creatorData[index];
      if (data) {
        setCreatorDividends(prevDividends => ({
          ...prevDividends,
          [creatorKey]: data.toString()
        }));
      }
    });
  }, [creatorData]);

  const renderCreatorSlide = (creatorKey) => {
    const creator = vidiCreatorConfig[creatorKey];
    const dividendAmount = creatorDividends[creatorKey] || 'Loading...';

    return (
      <SwiperSlide className='bg-white flex flex-col shadow-2xl'>
        <div className="flex flex-col h-full mt-1 items-center p-2">
          <div className="flex w-full items-center justify-between">
            <div className="relative" style={{ width: '75px', height: '75px' }}>
              <Image src={creator.image} alt={`${creatorKey} Icon`} layout="fill" objectFit="cover" className='rounded-full border-2 border-black' />
            </div>
            <button aria-label="Follow Button" onClick={() => window.open(creator.followLink, '_blank')} 
              className="bg-[#53a5ff] w-[140px] h-[38px] text-white text-2xl gap-1 font-bold py-1 rounded-lg flex items-center justify-center hover:[#31be91] transition-colors space-x-1">
              <div className="relative" style={{ width: '29px', height: '29px' }}>
                <Image src="/images/VidiacPlayButtonBGWhite.svg" alt="Icon" layout="fill" />
              </div>
              <span>Profile</span>
            </button>
          </div>
          <p className="mt-3 mb-2 text-3xl text-gray-800 font-extrabold">{creatorKey}</p>
          <p className="text-gray-600 mt-auto text-center text-sm">
            {creator.description}
          </p>
          <p className="text-2xl text-gray-800 mb-4 font-semibold py-1">
            Rewards ${isNaN(Number(dividendAmount)) || dividendAmount === '' || dividendAmount === null || dividendAmount === undefined
            ? '0.00'
            : new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(Number(dividendAmount))}
          </p>
        </div>
      </SwiperSlide>
    );
  };

  return (
    <>
      <div className="mt-10">
        <Swiper
          loop={true}
          effect={'cards'}
          grabCursor={true}
          keyboard={true}
          autoplay={{
              delay: 5000,
              disableOnInteraction: false,
          }}
          modules={[EffectFlip, Autoplay, Pagination, Keyboard]}
          className="spotlight-swiper-container"
        >
          {Object.keys(vidiCreatorConfig).map(creatorKey => 
            renderCreatorSlide(creatorKey)
          )}
        </Swiper>
      </div>
    </>
  );
}