import React from 'react';
import Image from 'next/image';

// Define the type for your props
type NavbarButtonProps = {
  onClick: () => void; // Type for a function that returns nothing
};

const NavbarButton: React.FC<NavbarButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Open menu" className="flex-none items-center justify-center p-2">
      <Image src="/images/menu.svg" alt="Menu" width={36} height={36} />
    </button>
  );
};

export default NavbarButton;