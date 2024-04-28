// WhyVidiac.tsx
import React, { useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WhyVidiac = () => {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);
    return (
      <section className="text-center justify-center justify-items-center p-1 xs:mb-10" style={{ maxWidth: '1400px', margin: 'auto' }}>
          <div className="grid grid-cols-1 justify-items-center gap-4 mt-14 md:grid-cols-2 lg:grid-cols-4">
            <div data-aos="fade-left" className="flex flex-col max-w-sm justify-between items-center bg-white rounded-2xl border-4">
            <p className="font-bold text-2xl text-center p-3 text-indigo-500">Why We Started Vidiac</p>
            <p className="text-lg p-2 font-semibold mb-auto text-center text-gray-900">We founded Vidiac to address a critical gap in the content creation landscape. 
            Recognizing that many creators were losing revenue, we set out to create a platform that supports free speech and the pursuit of passions without discrimination. 
            Our mission is to ensure creators always have an income and community to support them.</p>
              </div>
              <div data-aos="fade-right" className="flex flex-col max-w-sm justify-between items-center bg-white rounded-2xl border-4">
            <p className="font-bold text-2xl text-center p-3 text-indigo-500">Empowering Creators with the VIDI Token</p>
            <p className="text-lg p-2 font-semibold mb-auto text-center text-gray-900">Vidiac introduces the VIDI token, a revolutionary way for creators to earn sustainable revenue. 
            Regardless of the narrative pressures from major platforms, VIDI ensures a consistent income through USDC dividends, empowering creators to maintain their authenticity and independence.</p>
              </div>
              <div data-aos="fade-left" className="flex flex-col max-w-sm justify-between items-center bg-white rounded-2xl border-4">
            <p className="font-bold text-2xl text-center p-3 text-indigo-500">Build Your Brand with Our Merchandise Store</p>
            <p className="text-lg p-2 font-semibold mb-auto text-center text-gray-900">Expand beyond content creation with your very own merchandise line. 
            Vidiac's merchandise platform empowers creators to design, showcase, and sell their branded products, transforming viewers into a loyal fan base and opening additional revenue streams.</p>
              </div>
              <div data-aos="fade-right" className="flex flex-col max-w-sm justify-between items-center bg-white rounded-2xl border-4">
            <p className="font-bold text-2xl text-center p-3 text-indigo-500">Join the Creative Revolution</p>
            <p className="text-lg p-2 font-semibold mb-auto text-center justify-center text-gray-900">Are you ready to take control of your creative destiny? Join Vidiac, where freedom of expression meets financial freedom. 
            Start your journey with a platform that values your voice and rewards your creativity. Join the parallel market.</p>
              </div>
          </div>
        </section>
    );
  
};

export default WhyVidiac;