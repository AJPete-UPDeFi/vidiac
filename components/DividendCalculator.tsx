import React, { use, useState, useEffect } from 'react';
import { Divider } from '@nextui-org/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DividendCalculator = () => {
    const [tokensOwned, setTokensOwned] = useState('2500');
    const [taxRate, setTaxRate] = useState('10');
    const [dividendRatio, setDividendRatio] = useState('90');
    const [dailyVolume, setDailyVolume] = useState('100000');

    const totalCirculatingVolume = 800000; // Total circulating volume of tokens

    const calculateDividends = () => {
        // Convert to numbers for calculation, treating empty strings as zero
        const numTokensOwned = tokensOwned ? Number(tokensOwned) : 0;
        const numTaxRate = taxRate ? Number(taxRate) : 0;
        const numDividendRatio = dividendRatio ? Number(dividendRatio) : 0;
        const numDailyVolume = dailyVolume ? Number(dailyVolume) : 0;
        const taxRateDecimal = numTaxRate / 100;
        const dailyDividends = ((numTokensOwned / totalCirculatingVolume) * (numDailyVolume * (taxRateDecimal * numDividendRatio)))/100;
        const weeklyDividends = dailyDividends * 7;
        const annualDividends = dailyDividends * 365;
        const featuredWalletDaily = (numDailyVolume * (taxRateDecimal - (taxRateDecimal * (numDividendRatio/100))));
        const featuredWalletWeekly = featuredWalletDaily * 7;

        return { dailyDividends, weeklyDividends, annualDividends, featuredWalletDaily, featuredWalletWeekly };
    };

    const { dailyDividends, weeklyDividends, annualDividends, featuredWalletDaily, featuredWalletWeekly } = calculateDividends();

    const handleTokensOwnedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTokensOwned(e.target.value);
    };
    
    const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, Math.min(Number(e.target.value), 20)); // Ensures value is between 0 and 20
        setTaxRate(value.toString());
    };
    
    const handleDividendRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, Math.min(Number(e.target.value), 100)); // Ensures value is between 0 and 100
        setDividendRatio(value.toString());
    };
    
    const handleDailyVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDailyVolume(e.target.value);
    };

    useEffect(() => {
        AOS.init();
        duration: 2000;
        once: true;
    }, []); 

    return (
        <div data-aos="fade-up" className="p-4">
            <p className='text-center text-5xl font-extrabold text-gray-900 mb-4'>Dividend Calculator</p>
          <p className='text-center text-2xl font-bold text-gray-900 mb-4'>Try different values to see your potential earnings!</p>
            <div className="mb-4">
                <label htmlFor="tokensOwned" className="block text-xl font-semibold text-gray-700">
                    Total Tokens Owned
                </label>
                <input
                    id="tokensOwned"
                    type="number"
                    value={tokensOwned}
                    onChange={handleTokensOwnedChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm max-w-xs"
                    placeholder="Enter total tokens owned"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="dailyVolume" className="block text-xl font-semibold text-gray-700">
                    Daily Volume
                </label>
                <input
                    id="dailyVolume"
                    type="number"
                    value={dailyVolume}
                    onChange={handleDailyVolumeChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm max-w-xs"
                    placeholder="Enter daily volume"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="taxRate" className="block text-xl font-semibold text-gray-700">
                    Tax Rate (%)
                </label>
                <input
                    id="taxRate"
                    type="number"
                    value={taxRate}
                    onChange={handleTaxRateChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm max-w-xs"
                    placeholder="Enter tax rate 0-20"
                />
            </div>

            {/* Results */}
            <div className="text-xl font-semibold text-gray-700">
            <p className="text-2xl font-bold text-gray-900 mb-4"> Your Dividends</p>
            <div className='flex flex-row text-lg sm:text-2xl'>Daily USD Dividends: <p className='text-green-700 font-bold ml-auto'>${dailyDividends.toFixed(2)}</p></div>
            <div className='flex flex-row text-lg sm:text-2xl'>Weekly USD Dividends: <p className='text-green-700 font-bold ml-auto'>${weeklyDividends.toFixed(2)}</p></div>
            <div className='flex flex-row text-lg sm:text-2xl'>Annual USD Dividends: <p className='text-green-700 font-bold ml-auto'>${annualDividends.toFixed(2)}</p></div>
            <Divider className='mt-4'/>
            <p className="text-2xl font-bold text-gray-900 mb-4 mt-4"> Featured Wallet Dividends</p>
            <div className='flex flex-row text-lg sm:text-2xl'>Daily USD Dividends: <p className='text-green-700 font-bold ml-auto'>${featuredWalletDaily.toFixed(2)}</p></div>
            <div className='flex flex-row text-lg sm:text-2xl'>Weekly USD Dividends: <p className='text-green-700 font-bold ml-auto'>${featuredWalletWeekly.toFixed(2)}</p></div>
            </div>
        </div>
    );
};

export default DividendCalculator;
