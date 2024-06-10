// MainDashboard component
import React, { useEffect, useState } from 'react';
import { FetchVidiacData } from '../FetchVidiData';
import ClaimDividends from '../ClaimDividends';
import BSCAddressCopy from '../VidiBSCAddressCopy';
import VidiReferral from '../VidiReferral';
import PolySwap from '../PolySwap';
import { Divider } from '@nextui-org/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const VidiDashboard = () => {
  useEffect(() => {
    AOS.init();
    duration: 2000;
    once: true;
  }, []);
  const vidiacData = FetchVidiacData(); // Use the custom hook to fetch data

  const formatCurrency = (value: any) => {
    if (!value || value === 'Loading...') return value;
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(
      Number(value)
    );
  };

  const formatTokenCount = (value: any) => {
    if (!value || value === 'Loading...') return value;
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
      Number(value)
    );
  };

  return (
    <div className="flex justify-center">
      <div className="mt-10 flex flex-col">
        <p
          data-aos="fade-up"
          className="mb-10 text-center text-4xl font-bold text-white"
        >
          Your Vidiac Dashboard{' '}
        </p>
        <div className="grid grid-cols-1 justify-items-center xl:grid-cols-2">
          <div className="mb-2 grid grid-cols-1 sm:grid-cols-3">
            <div
              data-aos="fade-right"
              className="m-2 h-[80px] w-[180px] rounded-lg bg-brandDeepBlue p-2"
            >
              <p className="text-xl font-bold text-white">VIDI Balance</p>
              <p className="text-xl font-bold text-white ">
                {formatTokenCount(vidiacData.data.total.userTokenBalance)}
              </p>
            </div>
            <div
              data-aos="fade-left"
              className="m-2 h-[80px] w-[180px] rounded-lg bg-brandDeepBlue p-2"
            >
              <p className="text-xl font-bold text-white">Your Dividends</p>
              <p className="text-xl font-bold text-white">
                ${formatCurrency(vidiacData.data.total.userDividends)}
              </p>
            </div>

            <div
              data-aos="fade-right"
              className="m-2 h-[80px] w-[180px] rounded-lg bg-brandDeepBlue p-2"
            >
              <p className="text-xl font-bold text-white">Total Dividends</p>
              <p className="text-xl font-bold text-white">
                ${formatCurrency(vidiacData.totalDividends)}
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="flex m-2 flex-wrap rounded-lg bg-white"
          >
            <BSCAddressCopy />
          </div>
        </div>
        <Divider className="mb-8 mt-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />
        <section id="swap">
        <div data-aos="fade-up" className="grid grid-cols-1 justify-items-center lg:grid-cols-2">
          <div>
          <PolySwap />
          </div>
          <div className='mt-10'>
          <VidiReferral />
          </div>
        </div>
        </section>{/*
        <Divider className="mb-8 mt-10 max-w-xs sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]" />
        <div data-aos="fade-up" className="flex justify-center">
          <VidiReferral />
        </div>*/}
      </div>
    </div>
  );
};

export default VidiDashboard;

{
  /*}
          <Card className="max-w-xl shadow-lg xs:m-4 bg-black/60">
            <CardHeader className="bg-transparent rounded-t-lg">
              <p className="text-2xl font-bold text-white sm:text-4xl">Elevate Your Content with Vidiac: 
              <p className='text-lg font-bold py-5 sm:text-3xl'>Unleashing Creative Potential Through Blockchain</p>
              <p className='text-sm text-white font-semibold mt-1 sm:text-2xl'>&#10003; Steady Earnings for Video Creators</p>
              <p className='text-sm text-white font-semibold sm:text-2xl'>&#10003; Cutting-Edge Platform for Digital Artistry</p>
              <p className='text-sm text-white font-semibold mb-3 sm:text-2xl'>&#10003; Amplifying Voices, One Creator at a Time</p>
              </p>
            </CardHeader>
            <CardBody className="bg-gradient-to-t from-blue-50 to-blue-300 rounded-lg">
              <p className="sm:text-xl text-lg font-bold text-green-800 mb-4">
                Total Dividends Distributed: ${formatCurrency(vidiacData.totalDividends)}
              </p>
              <section id="user-summary" className="pt-2 border-t">
                <p className="sm:text-xl text-lg font-bold text-brandBlue">Your Vidiac Snapshot</p>
                <p className="sm:text-lg text-base font-semibold py-1">
                  Dividends Sent to You: ${formatCurrency(vidiacData.data.total.userDividends)}
                </p>
                <p className="sm:text-lg text-base font-semibold">
                  Your Token Balance: {formatTokenCount(vidiacData.data.total.userTokenBalance)}
                </p>
                <p className="sm:text-lg text-base font-semibold mt-1">
                  Your Unpaid Dividends: ${formatCurrency(vidiacData.data.total.userUnpaidEarnings)}
                </p>
                <ClaimDividends />
                <p className='mt-4'><BSCAddressCopy/></p>
              </section>
            </CardBody>
          </Card>
        </div>
    */
}
