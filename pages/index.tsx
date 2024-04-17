import React from 'react';
import Head from 'next/head';
import NavbarVidiac from '../components/NavbarVidiac';
import VidiDashboard from '../components/Dashboards/VidiDashboard';
import Presale from '../components/Presale';
import { Button, Link, Divider, Image } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import VidiReferral from '../components/VidiReferral';
import SpotlightSwiper from '../components/SpotlightSwiper';
import SpotlightSwiperSmall from '../components/SpotlightSwiperSmall';
import Tokenomics from '../components/Tokenomics';
import TokenomicsSmall from '../components/TokenomicsSmall';
import TokenomicsXS from '../components/TokenomicsXS'; 
import VidiFAQ from '../components/VidiFAQ';
import DividendCalculator from '../components/DividendCalculator'; 
//update deployment

const Vidiac = () => {
    return (
        <div className='bg-gradient6'>
          <Head>
            <title>Vidiac - Empowering Video Creators, Welcoming All Video Maniacs | UP DeFi</title>
            <meta content="Discover Vidiac by UP DeFi, a platform dedicated to amplifying and supporting video creators across various platforms. Join us in reshaping the world of digital content creation." name="description" />
            <link href="/images/playbutton1.png" rel="icon" type="image/svg+xml" />
            <link rel="alternate icon" href="/images/playbutton1.png" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"></link>
          </Head>
    
          <NavbarVidiac />
          <main className="flex flex-col items-center justify-center">

        <section id="connectbutton" className='xs:hidden p-10'>
          <ConnectButton />
        </section>

        <section id="dashboard" className='flex flex-col xl:flex-row justify-center items-center gap-4 p-4'>
            <VidiDashboard />
        </section>

        <section id="referral" className='mb-10'></section>

        <section>
          <VidiReferral />
        </section>

        <Divider className='mt-5 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

        <section id="spotlight" className='mt-10 mb-5 bg-white/40 border-2 border-white rounded-2xl p-4'>
        <p className='text-center text-5xl font-extrabold text-gray-900 mb-5'>Creator Spotlight</p>

        <section className='justify-center mb-10 hidden sm:flex flex-col'>
          <SpotlightSwiper />
        </section>
        <section className='sm:hidden'>
          <SpotlightSwiperSmall />
        </section>
        </section>

        <Divider className='mt-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

        <section id="creatorkit" className='mb-10'></section>

        <section className="flex flex-col max-w-[1000px] items-center justify-between text-center text-white p-2 m-1 border-2 bg-black/60 rounded-xl xs:p-8 xs:mb-10">
          <div className="text-center items-center">
          <p className='text-2xl font-bold mb-10 sm:text-4xl'>Support Creators with Every Purchase: Shop Exclusive Merchandise at www.vidiac.shop Now!</p>
          <a href="https://www.vidiac.shop" target="_blank" rel="noopener noreferrer">
            <img src="/images/shopexample.png" alt="Shop Example" className="h-auto rounded-lg items-center mb-10" />
          </a>
            <p className='text-2xl font-bold mb-10 sm:text-4xl'>Are you a creator and want to get featured in the Vidiac spotlight?</p>
            <p className='text-xl font-bold mb-4 sm:text-2xl'>Download our Creator Kit to get started!</p>
          <div className='text-lg font-semibold text-center'>
            <a href="/files/CreatorKit.zip" download="CreatorKit.zip">
              <Button
                className="text-xl p-4 font-bold max-w-xs xs:text-3xl xs:p-8"
                color='primary'
              >
                Download Creator Kit
              </Button>
            </a>
          </div>
            <p className='text-base font-bold mb-4 sm:mb-auto mt-8 sm:text-xl sm:mt-10'>Ask the Vidiac team how to get paid for creating digital media.</p>
          </div>
        </section>

        <Divider className='mt-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

        <section id="howitworks" className='mb-10'></section>

        <section className="flex flex-col xl:flex-row max-w-[1400px] items-center justify-between text-center text-white p-2 m-1 border-2 bg-black/60 rounded-xl xs:p-8 xs:mb-5">
          <div className="text-center lg:text-left">
          <p className='text-2xl font-bold mb-8'>Vidiac is more than just a token. Several built in features ensure that investors always win while supporting their favorite video creators.</p>
          <p className='text-xl font-bold mb-6'>Here's how it works:</p>
          <div className='text-lg text-left font-semibold'>
          <p>1. Vidiac is a Dual DEX token encouraging arbitrage trades as each chart experiences their own price changes.</p>
          <p>2. Each trade is taxed and those taxes are converted to USDC.</p>
          <p>3. The USDC is then distributed directly to the investor and the Featured Creator.</p>
          <p>4. The Featured Creator is chosen by the community.</p>
          <p>5. Creators can create referral codes to encourage their audience to become new investors.</p>
          <p>6. Both the investor and the creator receive Vidiac tokens when the referral code is used.</p>
          <p>7. The investor trades those tokens starting the cycle all over again.</p>
          </div>
          </div>
          <Divider orientation= 'vertical' className='m-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>
          <div>
            <img src="/images/howitworks.svg" alt="How It Works" className="max-w-full h-auto" />
          </div>
        </section>

        <Divider className='mt-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

        <section id="dividendcalculator" className='mb-10'></section>

        <section className='max-w-xl bg-white/80 border-2 border-white rounded-2xl p-4 mx-1 flex flex-col'>
          <p className='text-center text-5xl font-extrabold text-gray-900 mb-4'>Dividend Calculator</p>
          <p className='text-center text-2xl font-bold text-gray-900 mb-4'>Try different values to see your potential earnings!</p>
          <DividendCalculator/>
        </section>

        <Divider className='mt-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

        <section id="tokenomics" className='mb-10'></section>

        <section className='bg-white/40 border-2 border-white rounded-2xl p-4 mb-10 hidden sm:flex flex-col'>
          <p className='text-center text-5xl font-extrabold text-gray-900 mb-10'>Tokenomics</p>
          <Tokenomics/>
        </section>
        <section className='bg-white/40 border-2 border-white rounded-2xl p-4 mb-10 hidden xs:flex flex-col sm:hidden'>
          <p className='text-center text-5xl font-extrabold text-gray-900 mb-10'>Tokenomics</p>
          <TokenomicsSmall/>
        </section>
        <section className='bg-white/40 border-2 border-white rounded-2xl p-4 mb-10 xs:hidden'>
          <p className='text-center text-4xl font-extrabold text-gray-900 mb-10'>Tokenomics</p>
          <TokenomicsXS/>
        </section>

        <Divider className='mb-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

        <section id="faq" className=''></section>

        <section>
          <VidiFAQ />
        </section>

        <Divider className='m-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

        <section id="mission" className="text-center text-white p-1 m-1 bg-black/60 border-2 rounded-xl xs:m-10 xs:p-8">
          <p className='text-2xl font-extrabold xs:text-4xl'>Unleashing Creative Potential: Vidiac's Vision</p>
          <p className='text-lg font-bold mt-8 xs:text-2xl'>Empowering creators, engaging investors. Vidiac blends blockchain innovation with digital creativity for sustainable growth in DeFi.</p>
          <p className='text-md font-bold mt-6 xs:text-xl md:text-2xl'>Join Vidiac today!</p> <p className='font-semibold md:text-2xl'>Support creators and explore investment opportunities in a thriving DeFi community. Start your journey now.</p>
          <Link href="https://t.me/vidiac_token">
            <Button
              className="text-xl p-4 font-bold mt-8 max-w-xs xs:text-3xl xs:p-8"
              color='primary'
            >
              Join Us
            </Button>
          </Link>
          <div className='mt-6'>
          <a href="../files/VidiacWhitepaper.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              className="text-xl p-4 font-bold max-w-xs xs:text-3xl xs:p-8"
              color='primary'
            >
              Whitepaper</Button>
          </a>
          <a href="../files/VidiacSlideDeck.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              className="text-xl m-5 p-4 font-bold max-w-xs xs:text-3xl xs:p-8"
              color='primary'
            >
              SlideDeck</Button>
          </a>
          </div>
        </section>

        <Divider className='m-10 xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-xs'/>

        <footer className="p-4">
          <div className="flex flex-col items-center text-center text-gray-900 font-bold text-2xl">
            <p>&copy; 2024 UP DeFi LLC - Vidiac. All rights reserved.</p>
              <div className="flex justify-center gap-4 mt-4 p-2 bg-white w-fit rounded-lg">
                <button aria-label='UP DeFi' onClick={() => window.open('https://www.up-defi.com', '_blank')}>
                  <Image src="../images/UPDeFiLogo2WhiteBG.png" alt="UP DeFi" width={36} height={36}/>
                </button>
                <button aria-label='Telegram' onClick={() => window.open('https://t.me/vidiac_token', '_blank')}>
                  <Image src="../images/Telegram.svg" alt="Telegram" width={36} height={36}/>
                </button>
                <button aria-label='X' onClick={() => window.open('https://twitter.com/UPDefiCrypto', '_blank')}>
                  <Image src="../images/X.svg" alt="X" width={36} height={36}/>
                </button>
                <button aria-label='Instagram' onClick={() => window.open('https://www.instagram.com/updeficrypto/', '_blank')}>
                  <Image src="../images/Instagram.svg" alt="Instagram" width={36} height={36}/>
                </button>
                <button aria-label='Discord' onClick={() => window.open('https://discord.gg/U2B8vhTN2P', '_blank')}>
                  <Image src="../images/Discord.svg" alt="Discord" width={36} height={36}/>
                </button>
             </div>
          </div>
        </footer>
      </main>
          </div>
    );
};

export default Vidiac;