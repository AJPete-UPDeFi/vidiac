// PCSChart.tsx
import React from 'react';

const PCSChartSM = () => {
  return (
    <div className='flex items-center' style={{ height: '500px', width: '100%' }}>
      <iframe
        height="100%"
        width="100%"
        id="geckoterminal-embed"
        title="GeckoTerminal Embed"
        src="https://www.geckoterminal.com/bsc/pools/0x0be8d118fed68bc3c6bae9115dca9933ed9ac03d?embed=1&info=1&swaps=1"
        frameBorder="0"
        allow="clipboard-write"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PCSChartSM;
