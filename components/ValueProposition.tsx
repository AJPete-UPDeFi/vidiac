// ValueProposition.tsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ValueProposition = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);
  return (
    <div
      data-aos="fade-up"
      className="m-2 flex max-w-[1200px] flex-col justify-start py-8 md:flex-row"
    >
      <p className="text-center text-2xl font-bold text-gray-900 sm:text-xl">
        Vidiac is revolutionizing video content creation by leveraging
        blockchain to directly reward creativity and engagement, transforming
        passion into profits. We address the pressing needs of video creators
        seeking more revenue and exposure, while providing crypto investors with
        safe, stable investment opportunities.
      </p>
    </div>
  );
};

export default ValueProposition;
