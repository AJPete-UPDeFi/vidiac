// Tokenomics component
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Tokenomics = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart<"doughnut", number[], string> | null>(null);

    useEffect(() => {
        const myChartRef = chartRef.current?.getContext("2d");

        // Clean up the previous chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
    
        if (myChartRef) {
          // Create a new chart instance and store it in the ref
          chartInstanceRef.current = new Chart(myChartRef, {
            type: 'doughnut',
      data: {
        labels: ['Presale', 'Liquidity', 'Marketing/Referral', 'Team Compensation', 'Utility Wallet'],
        datasets: [{
          data: [500000, 200000, 95000, 105000, 100000],
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                color: 'rgb(31, 41, 55)',
                font: {
                    size: 24,
                    family: 'sans-serif',
                    weight: 'bolder',
                    },
                padding: 20,
                }
            }
            }
      }
    });
}
    // Clean up function to destroy the chart instance when the component unmounts
    return () => {
        if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        }
      };
    }, []);

  return (
    <div style={{ width: '350px', height: '350px' }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default Tokenomics;
