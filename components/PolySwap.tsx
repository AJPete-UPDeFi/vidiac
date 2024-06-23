import React, { useState, useEffect } from 'react';
import { PolyswapApp } from "@polyswapai/widget";

const PolySwap: React.FC = () => {
  const [priceData, setPriceData] = useState(null);
  const apiUrl = "/api/proxy-polyswap"; // Use relative path to the Vercel API endpoint

  const fetchPrice = async (sellToken: string, buyToken: string, sellAmount: number) => {
    const url = `${apiUrl}?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmount}&slippagePercentage=0.1201&hasFeeOnTransfer=true&chainId=56`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const getPriceData = async () => {
      const data = await fetchPrice("BNB", "0x237FA37Be83955C62d852B16516e6F4407bf3945", 1000000000000000000);
      setPriceData(data);
    };

    getPriceData();
  }, []);

  return (
    <div className="w-full m-2 sm:w-[500px] flex flex-col items-center justify-center">
      <div className="price-data mb-4">
        {priceData ? (
          <div>
            <p>Price Data:</p>
            <pre>{JSON.stringify(priceData, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading price data...</p>
        )}
      </div>
      <PolyswapApp
        marketer="polyswap-whitelabel"
        chainId={56}
        allowedChainIds={[56]}
        enableDarkMode={true}
        primaryColorDark="#6d66f9"
        defaultSlippage={12}
        defaultPinnedTokens={{
            56: [
                "0x237FA37Be83955C62d852B16516e6F4407bf3945"
            ],
        }}
        predefinedTokens={[
            {
                address: "0x237FA37Be83955C62d852B16516e6F4407bf3945",
                chainId: 56,
                decimals: 18,
                hasTransactonFees: true,
                logoURI: "https://www.vidiac.co/images/vidiac_logo.png",
                name: "Vidiac",
                symbol: "VIDI"
            }
        ]}
        defaultSelectedTokenByChains={{
            56: {
                defaultOutputToken: "0x237FA37Be83955C62d852B16516e6F4407bf3945"
            },
        }}
        overrides={{
            SwapCardTitle: "<div style=\"display: flex; align-items: center;\"><img src=\"https://www.vidiac.co/images/vidiac_logo.png\" style=\"width: 30px; height: 30px;\"><p style=\"margin: 0; margin-left: 5px; font-size: 28px;\">Swap</p></div>"
          }}
      />
    </div>
  );
};

export default PolySwap;
