import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/react';
import Image from 'next/image';

export default function KeyFeatures() {

    return (
        <section className="text-center justify-center justify-items-center p-1 xs:mb-10" style={{ maxWidth: '1400px', margin: 'auto' }}>
          <p className='text-white font-bold text-4xl'>Explore UP DeFi's Unique Benefits</p>
          <div className="grid grid-cols-1 justify-items-center gap-4 mt-14 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col max-w-sm justify-between items-center bg-white rounded-2xl ">
            <Image src="/images/stabledivs.png" alt="Stable Dividends" width={100} height={100} className='mt-5 lg:mt-10'/>
            <p className="font-bold text-2xl text-center p-2 text-brandGreen">Guaranteed USD Dividends!</p>
            <p className="text-lg font-semibold mb-5 text-center text-brandBlue lg:mb-10">Receive dividends in a USD-stable coin, ensuring the value of your dividends remain stable and unaffected by market volatility.</p>
              </div>
              <div className="flex flex-col max-w-sm justify-between items-center bg-white rounded-2xl ">
            <Image src="/images/automateddivs.png" alt="Automated Dividends" width={100} height={100} className='mt-5 lg:mt-10'/>
            <p className="font-bold text-2xl text-center p-2 text-brandGreen">Effortless Dividend Collection</p>
            <p className="text-lg font-semibold mb-5 text-center text-brandBlue lg:mb-10">Claiming your Vidiac dividends is a breeze with our website's dashboard. Quick, easy, and hassle-free!</p>
              </div>
              <div className="flex flex-col max-w-sm justify-between items-center bg-white rounded-2xl ">
            <Image src="/images/incentivesforcreators.png" alt="Incentives for Creators" width={100} height={100} className='mt-5 lg:mt-10'/>
            <p className="font-bold text-2xl text-center p-2 text-brandGreen">Enhanced Creator Rewards</p>
            <p className="text-lg font-semibold mb-5 text-center text-brandBlue lg:mb-10">UP DeFi tokens incentivize content creators through substantial rewards, promoting active participation and encouraging a thriving ecosystem of content generation.</p>
              </div>
              <div className="flex flex-col max-w-sm justify-between items-center bg-white rounded-2xl ">
            <Image src="/images/dualdex.png" alt="Dual DEX" width={100} height={100} className='mt-5 lg:mt-10'/>
            <p className="font-bold text-2xl text-center p-2 text-brandGreen">Optimized Trading Opportunities</p>
            <p className="text-lg font-semibold mb-5 text-center text-brandBlue lg:mb-10">Leverage our dual DEX integration strategy to explore arbitrage opportunities. This approach is designed to boost trading volume and liquidity, offering you more avenues for profitable trading.</p>
              </div>
          </div>
        </section>
    );
}