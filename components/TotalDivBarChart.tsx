// Total Dividends Distributed Bar Chart
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartProps = {
  data: ChartData<"bar", number[], string>;
};

const options: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Total Dividends Distributed',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const TotalDivBarChart: React.FC<BarChartProps> = ({ data }) => {
  return <Bar options={options} data={data} />;
};

export default TotalDivBarChart;