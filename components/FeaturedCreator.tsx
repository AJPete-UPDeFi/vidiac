// FeaturedCreator.tsx
import React from 'react';

const FeaturedCreator = () => {
  // Directly define the featured creator's details
  const creator = {
    image: '/images/Creators/fcmeme.jpg',
    alt: 'Featured Creator Image',
    followLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    name: 'FC TBD',
    description:
      'We have not yet voted for our first Featured Creator. Stay tuned for updates!',
  };

  return (
    <div className="mt-3 flex max-w-xl h-full flex-col items-center p-2">
      <div className="flex w-full items-center gap-5">
        <div className="relative">
          <img
            src={creator.image}
            alt={creator.alt}
            className="border-2 border-black"
          />
        </div>
        <div className='flex flex-col items-center'>
      <p className="mt-5 text-4xl font-extrabold text-gray-800">
        {creator.name}
      </p>
      <p className="mb-5 text-center text-2xl text-gray-600">
        {creator.description}
      </p>
      </div>
      </div>
      <div className='flex flex-col items-center mt-4'>
      
      </div>
    </div>
  );
};

export default FeaturedCreator;
