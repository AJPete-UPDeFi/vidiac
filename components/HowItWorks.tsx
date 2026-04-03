// HowItWorks.tsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);
  return (
    <div>
      <div data-aos="fade-up" className="text-center lg:text-left">
        <p className="mb-14 text-center text-3xl font-bold text-pink-500">
          How VIDI Works
        </p>
        <div className="flex flex-wrap justify-center">
          <div className="">
            <div
              data-aos="fade-right"
              className="m-2 flex max-w-[500px] flex-row gap-4 rounded-lg border-2 p-4"
            >
              <div className="flex w-1/3 items-center justify-center">
                <img
                  src="/images/dualdexHIW.png"
                  alt="Dual DEX Token"
                  className="h-auto w-[75px]"
                />
              </div>
              <div className="flex w-2/3 flex-col justify-center">
                <p className="text-2xl font-bold text-brandDeepBlue">
                  Dual DEX Token
                </p>{' '}
                <p className="text-lg font-semibold text-gray-900">
                  Encourages arbitrage trades as each chart experiences their
                  own price changes.
                </p>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="m-2 flex max-w-[500px] flex-row gap-4 rounded-lg border-2 p-4"
            >
              <div className="flex w-1/3 items-center justify-center">
                <img
                  src="/images/taxedHIW.png"
                  alt="Taxes to USDC"
                  className="h-auto w-[75px]"
                />
              </div>
              <div className="flex w-2/3 flex-col justify-center">
                <p className="text-2xl font-bold text-brandDeepBlue">
                  Taxes to USDC
                </p>{' '}
                <p className="text-lg font-semibold text-gray-900">
                  VIDI trades on the DEX are taxed and those taxes are converted
                  to USDC.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div
              data-aos="fade-right"
              className="m-2 flex max-w-[500px] flex-row gap-4 rounded-lg border-2 p-4"
            >
              <div className="flex w-1/3 items-center justify-center">
                <img
                  src="/images/usdcHIW.png"
                  alt="USDC Dividends"
                  className="h-auto w-[75px]"
                />
              </div>
              <div className="flex w-2/3 flex-col justify-center">
                <p className="text-2xl font-bold text-brandDeepBlue">
                  USDC Dividends
                </p>{' '}
                <p className="text-lg font-semibold text-gray-900">
                  The USDC is then distributed directly to the investor and the
                  Featured Creator.
                </p>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="m-2 flex max-w-[500px] flex-row gap-4 rounded-lg border-2 p-4"
            >
              <div className="flex w-1/3 items-center justify-center">
                <img
                  src="/images/voteHIW.png"
                  alt="Featured Creator"
                  className="h-auto w-[75px]"
                />
              </div>
              <div className="flex w-2/3 flex-col justify-center">
                <p className="text-2xl font-bold text-brandDeepBlue">
                  Featured Creator
                </p>{' '}
                <p className="text-lg font-semibold text-gray-900">
                  Creators are chosen by the community to receive 10% of all the
                  USDC generated.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              data-aos="fade-right"
              className="m-2 flex max-w-[500px] flex-row gap-4 rounded-lg border-2 p-4"
            >
              <div className="flex w-1/3 items-center justify-center">
                <img
                  src="/images/referralHIW.png"
                  alt="Referral Codes"
                  className="h-auto w-[75px]"
                />
              </div>
              <div className="flex w-2/3 flex-col justify-center">
                <p className="text-2xl font-bold text-brandDeepBlue">
                  Referral Codes
                </p>{' '}
                <p className="text-lg font-semibold text-gray-900">
                  Creators can create referral codes to encourage their audience
                  to become new investors.
                </p>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="m-2 flex max-w-[500px] flex-row gap-4 rounded-lg border-2 p-4"
            >
              <div className="flex w-1/3 items-center justify-center">
                <img
                  src="/images/cashHIW.png"
                  alt="Merch Store"
                  className="h-auto w-[75px]"
                />
              </div>
              <div className="flex w-2/3 flex-col justify-center">
                <p className="text-2xl font-bold text-brandDeepBlue">
                  Merch Store
                </p>{' '}
                <p className="text-lg font-semibold text-gray-900">
                  Creators merch is sold on the Vidiac store. The proceeds are
                  used to purchase VIDI on the DEX and sent to the creator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
