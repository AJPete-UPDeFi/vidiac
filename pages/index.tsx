import React, { useEffect } from 'react';
import Head from 'next/head';
import NavbarVidiac from '../components/NavbarVidiac';
import { Button, Link, Divider, Image } from '@nextui-org/react';
import Tokenomics from '../components/Tokenomics';
import TokenomicsSmall from '../components/TokenomicsSmall';
import TokenomicsXS from '../components/TokenomicsXS';
import VidiFAQ from '../components/VidiFAQ';
import DividendCalculator from '../components/DividendCalculator';
import Welcome from '../components/Welcome';
import ValueProposition from '../components/ValueProposition';
import HowItWorks from '../components/HowItWorks';
import WhyVidiac from '../components/WhyVidiac';
import VidiBSCAddressCopy from '../components/VidiBSCAddressCopy';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Vidiac = () => {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);
  return (
    <div className="">
      <Head>
        <title>
          Vidiac - Empowering Video Creators, Welcoming All Video Maniacs | UP
          DeFi
        </title>
        <meta
          content="Discover Vidiac by UP DeFi, a platform dedicated to amplifying and supporting video creators across various platforms. Join us in reshaping the world of digital content creation."
          name="description"
        />
        <link href="/images/playbutton1.png" rel="icon" type="image/svg+xml" />
        <link rel="alternate icon" href="/images/playbutton1.png" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
          rel="stylesheet"
        ></link>
        <link
          href="https://cdn.jsdelivr.net/npm/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        ></link>
        <script src="https://cdn.jsdelivr.net/npm/aos@2.3.1/dist/aos.js"></script>
      </Head>

      <NavbarVidiac />
      <main className="flex flex-col items-center justify-center">
        <section id="welcome" className="mb-20 mt-10">
          <Welcome />
        </section>

        <VidiBSCAddressCopy />

        <Divider className="mt-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />

        <section
          id="valueproposition"
          className="flex flex-col justify-start gap-4 p-4 xl:flex-row"
        >
          <ValueProposition />
        </section>

        <Divider className="mt-5 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />

        <WhyVidiac />

        <Divider className="mt-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />

        <section id="howitworks" className="mb-10"></section>

        <p
          data-aos="fade-up"
          className="ml-4 mr-4 text-center text-2xl font-bold text-gray-900"
        >
          Vidiac is more than just a token. Several built in features ensure
          that investors always win while supporting their favorite video
          creators.
        </p>

        <Divider className="mb-10 mt-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />

        <section className="m-1 flex flex-col items-center justify-between p-2 text-center text-white xs:mb-5 xs:p-8 xl:flex-row">
          <HowItWorks />
        </section>

        <Divider className="mt-5 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />

        <section id="dividendcalculator" className="mb-5"></section>

        <section
          data-aos="fade-up"
          className="mx-1 mb-20 mt-10 grid grid-cols-1 justify-items-center p-4 xl:grid-cols-2 "
        >
          <div className="rounded-2xl border-4 mb-10">
            <DividendCalculator />
          </div>
          <div className="hidden grid-cols-1 flex-col rounded-2xl border-4 sm:flex">
            <Tokenomics />
          </div>
          <div className="set-center hidden flex-col rounded-2xl border-4 xs:flex sm:hidden">
            <TokenomicsSmall />
          </div>
          <div className="rounded-2xl border-4 xs:hidden">
            <TokenomicsXS />
          </div>
        </section>

        <Divider className="mb-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />

        <section id="faq" className=""></section>

        <section>
          <VidiFAQ />
        </section>

        <Divider className="m-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />

        <section
          id="mission"
          data-aos="fade-up"
          className="m-1 rounded-xl border-2 bg-black/60 p-1 text-center text-white xs:m-10 xs:p-8"
        >
          <p className="text-2xl font-extrabold xs:text-4xl">
            Unleashing Creative Potential: Vidiac's Vision
          </p>
          <p className="mt-8 text-lg font-bold xs:text-2xl">
            Empowering creators, engaging investors. Vidiac blends blockchain
            innovation with digital creativity for sustainable growth in DeFi.
          </p>
          <p className="text-md mt-6 font-bold xs:text-xl md:text-2xl">
            Join Vidiac today!
          </p>{' '}
          <p className="font-semibold md:text-2xl">
            Support creators and explore investment opportunities in a thriving
            DeFi community. Start your journey now.
          </p>
          <div className="mb-3 mt-6">
            <a
              href="../files/VidiacWhitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                data-aos="fade-right"
                className="mr-4 mt-4 w-[160px] rounded bg-indigo-700 px-4 py-2 text-2xl font-bold text-white hover:bg-indigo-500"
              >
                Whitepaper
              </button>
            </a>
            <a
              href="../files/VidiacSlideDeck.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                data-aos="fade-left"
                className="mt-4 w-[160px] rounded bg-indigo-700 px-4 py-2 text-2xl font-bold text-white hover:bg-indigo-500"
              >
                SlideDeck
              </button>
            </a>
          </div>
        </section>

        <Divider className="m-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />

        <footer data-aos="fade-up" className="p-4">
          <div className="flex flex-col items-center text-center text-2xl font-bold text-gray-900">
            <p>&copy; 2024 UP DeFi LLC - Vidiac. All rights reserved.</p>
            <div className="mt-4 flex w-fit justify-center gap-4 rounded-lg bg-white p-2">
              <button
                aria-label="Merch Store"
                onClick={() => window.open('https://www.vidiac.shop', '_blank')}
              >
                <Image
                  src="../images/vidiShop.png"
                  alt="VIDI Shop"
                  width={36}
                  height={36}
                />
              </button>
              <button
                aria-label="Telegram"
                onClick={() =>
                  window.open('https://t.me/vidiac_token', '_blank')
                }
              >
                <Image
                  src="../images/Telegram.svg"
                  alt="Telegram"
                  width={36}
                  height={36}
                />
              </button>
              <button
                aria-label="X"
                onClick={() =>
                  window.open('https://twitter.com/Vidiac_Token', '_blank')
                }
              >
                <Image src="../images/X.svg" alt="X" width={36} height={36} />
              </button>
              <button
                aria-label="Instagram"
                onClick={() =>
                  window.open(
                    'https://www.instagram.com/updeficrypto/',
                    '_blank'
                  )
                }
              >
                <Image
                  src="../images/Instagram.svg"
                  alt="Instagram"
                  width={36}
                  height={36}
                />
              </button>
              <button
                aria-label="Discord"
                onClick={() =>
                  window.open('https://discord.gg/U2B8vhTN2P', '_blank')
                }
              >
                <Image
                  src="../images/Discord.svg"
                  alt="Discord"
                  width={36}
                  height={36}
                />
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Vidiac;
