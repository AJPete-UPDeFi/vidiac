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
    { text: 'Home', href: '/' },
    { text: 'Dashboard', href: '/dashboard' },
    { text: 'Creator Spotlight', href: '/creators' },
    { text: 'Merch Store', href: 'https://www.vidiac.shop' },
    { text: 'Buy VIDI', href: 'https://guardiannn.ai/bsc/token/0x237fa37be83955c62d852b16516e6f4407bf3945?pair=0xf067afa4afb51216d2e5677ab7233effe8d119e0'},
    { text: 'Telegram', href: 'https://t.me/vidiac_token' },
    { text: 'X', href: 'https://twitter.com/UPDefiCrypto' },
    { text: 'Discord', href: 'https://discord.gg/U2B8vhTN2P' },
  ];

  return (
    <Navbar shouldHideOnScroll isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className='custom-navbar bg-transparent flex-row'>
        <NavbarContent className="w-16 h-16 pr-3" justify="start">
        <button aria-label="Open menu">
          <NavbarButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </button>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <button aria-label="Vidiac" onClick={() => router.push('/')}>
            <Image src="/images/vidiac_logo.png" alt="Vidiac Logo" width={40} height={40} />
            </button>
          </NavbarItem>
        </NavbarContent>    
  
      <NavbarMenu className="border-2 font-semibold rounded-lg shadow-md max-w-xs w-[200px] max-h-[300px] top-16 left-8 p-2">
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
