// components/Layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';
import React from 'react';


type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main>
        {children}
        <SpeedInsights />
      </main>
    </>
  );
};

export default Layout;