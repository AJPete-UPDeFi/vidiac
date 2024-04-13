// MainDashboard component
import React, { useEffect, useState } from 'react';
import { FetchVidiacData } from '../FetchVidiData';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
// import TotalDivBarChart from '../TotalDivBarChart'; 
import ClaimDividends from '../ClaimDividends';
import BSCAddressCopy from '../VidiBSCAddressCopy';

const VidiDashboard = () => {
  const vidiacData = FetchVidiacData(); // Use the custom hook to fetch data

  const formatCurrency = (value:any) => {
    if (!value || value === 'Loading...') return value;
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(Number(value));
};
  
  const formatTokenCount = (value:any) => {
      if (!value || value === 'Loading...') return value;
      return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value));
  };

  /*const [chartData, setChartData] = useState({
    labels: ['Vidiac (ETH)', 'Vidiac (BSC)'],
      datasets: [
        {
          label: 'Dividends Distributed',
          data: [0, 0], // Initialize with zero values
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }); 

    useEffect(() => {
        // When vidiacData is updated, update the chart data
        if (vidiacData.total.totalDividends !== undefined) {
            setChartData(prevChartData => ({
                ...prevChartData,
                datasets: [
                    {
                        ...prevChartData.datasets[0],
                        data: [vidiacData.eth.totalDividends, vidiacData.bsc.totalDividends],
                    },
                ],
            }));
        }
    }, [vidiacData]); // Dependency array ensures this effect runs when vidiacData changes
    */

    return (
        <div className="flex flex-col md:flex-row justify-center py-8">
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
                <div>
                  {/* Uncomment the following line when ready */}
                  {/* <TotalDivBarChart data={chartData} /> */}
                </div>
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
        
    );
};

export default VidiDashboard;