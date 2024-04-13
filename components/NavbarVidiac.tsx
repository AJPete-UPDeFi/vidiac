import React from 'react';
import { useRouter } from 'next/router';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import NavbarButton from './NavbarButton';

export default function NavbarMain() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const closeMenuAndNavigate = (url: string) => {
    setIsMenuOpen(false);
    // Check if the URL is external
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // Open external URL in a new tab
      window.open(url, '_blank');
    } else {
      // Use Next.js router for internal navigation
      router.push(url);
    }
  };

  type MenuItem = {
    text: string;
    href: string;
  };

  const menuItems: MenuItem[] = [
    { text: 'Dashboard', href: '#dashboard' },
    { text: 'Referral', href: '#referral' },
    { text: 'Creator Spotlight', href: '#spotlight' },
    { text: 'About', href: '#howitworks' },
    { text: 'Calculator', href: '#dividendcalculator' },
    { text: 'Tokenomics', href: '#tokenomics' },
    { text: 'FAQ', href: '#faq' },
    { text: 'UP DeFi', href: '/' },
    { text: 'Telegram', href: 'https://t.me/vidiac_token' },
    { text: 'X', href: 'https://twitter.com/UPDefiCrypto' },
    { text: 'Discord', href: 'https://discord.gg/U2B8vhTN2P' },
    { text: 'Instagram', href: 'https://www.instagram.com/updeficrypto/' },
  ];

  return (
    <Navbar shouldHideOnScroll isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className='custom-navbar'>
        <NavbarContent className="w-16 h-16 pr-3" justify="start">
        <button aria-label="Open menu">
          <NavbarButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </button>
        </NavbarContent>
  
        <NavbarContent className="pr-3" justify="center">
          <NavbarBrand>
            <button aria-label="Vidiac" onClick={() => router.push('/vidiac')}>
            <Image src="/images/playbutton1.png" alt="Vidiac Logo" width={64} height={64} />
            </button>
            <p className="ml-2 font-extrabold text-3xl hidden md:flex">Vidiac</p>
          </NavbarBrand>
        </NavbarContent>
  
        <NavbarContent justify="end" className='hidden xs:flex'>
          <NavbarItem>
            <ConnectButton />
          </NavbarItem>
        </NavbarContent>
      
  
      <NavbarMenu className="bg-white border border-gray-200 font-semibold rounded-lg shadow-md max-w-xs w-auto max-h-[450px] top-16 left-8 p-2">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.text}-${index}`}>
            <Link
              className="w-full"
              href={item.href}
              onClick={(e) => {
                e.preventDefault(); // Prevent default
                closeMenuAndNavigate(item.href); // Close the menu
              }}
            >
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
