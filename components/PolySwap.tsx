import React from 'react';
import { PolyswapApp } from "@polyswapai/widget";

const PolySwap: React.FC = () => {
  return (
    <div className="w-full m-2 sm:w-[500px] flex justify-center">
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
