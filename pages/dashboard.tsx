// dashboard.tsx
import React, { useEffect } from 'react';
import VidiDashboard from '../components/Dashboards/VidiDashboard';
import NavbarVidiac from '../components/NavbarVidiac';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import VidiReferral from '../components/VidiReferral';
import PCSChart from '../components/PCSChart';
import ApeChart from '../components/ApeChart';
import ApeChartSM from '../components/ApeChartSM';
import PCSChartSM from '../components/PCSChartSM';
import { Divider, Image } from '@nextui-org/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Dashboard = () => {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);
  return (
    <div>
      <NavbarVidiac />
      <main className="bg-gradient7 flex flex-col justify-center justify-items-center">
        <div data-aos="fade-left" className="flex justify-end p-5">
          <ConnectButton />
        </div>
        <div>
          <div>
            <VidiDashboard />
            <Divider className="mb-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />
            <div
              data-aos="fade-up"
              className="hidden justify-center m-4 gap-2 p-2 sm:flex "
            >
              <PCSChart />
              
            </div>
            <div
              data-aos="fade-up"
              className="flex flex-col justify-center m-4 gap-2 p-1 sm:hidden"
            >
              <PCSChart />
              
            </div>
          </div>
        </div>

        <Divider className="m-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />

        <footer data-aos="fade-up" className="bg-white p-4">
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
export default Dashboard;
