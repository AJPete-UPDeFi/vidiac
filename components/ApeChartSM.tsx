// ApeChart.tsx
import React from 'react';

const ApeChartSM = () => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <iframe
        height="100%"
        width="100%"
        id="geckoterminal-embed"
        title="GeckoTerminal Embed"
        src="https://www.geckoterminal.com/bsc/pools/0x5159ba5435fbefaddc889051ba83ee17e8206786?embed=1&info=1&swaps=1"
        frameBorder="0"
        allow="clipboard-write"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ApeChartSM;
