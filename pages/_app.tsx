//_app.tsx
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  bsc,
  //arbitrum,
  //mainnet,
  //optimism,
  //polygon,
  //base,
  //zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { NextUIProvider } from '@nextui-org/react';
import Layout from '../components/Layout';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    bsc,
    //mainnet,
    //polygon,
    //optimism,
    //arbitrum,
    //base,
    //zora,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'UP DeFi Dashboard',
  projectId: '92d9ef16232791b0832a7aa3496b8ebd', // Walletconnect Project ID
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <NextUIProvider>
        <Layout>
        <Component {...pageProps} />
        </Layout>
        </NextUIProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
