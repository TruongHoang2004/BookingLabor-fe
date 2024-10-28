import React from 'react';
import { Button } from "@nextui-org/react";
import { Kanit } from 'next/font/google'
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const Header = () => {
  return (
    <Navbar 
      className="bg-lime-300 shadow-sm"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarBrand className="gap-20">
        <div className={`${kanit.className} text-3xl text-green-800  font-bold flex h-5 items-center space-x-4 justify-between gap-x-2`}>
          <h1>
            MY PROFILE
          </h1>
        </div>
        <Button 
          radius="full" 
          color="success" 
          variant="solid"
          className={`${kanit.className} text-lg text-black font-bold flex items-center space-x-4 justify-between gap-x-2`}
        >
          Change to Tasker Profile
        </Button>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-4">
        <Button
          radius="full"
          color="success"
          variant="solid"
          className={`${kanit.className} text-lg text-black font-bold flex items-center space-x-4 justify-between gap-x-2`}
        >
          Delete profile
        </Button>
        <Button
          radius="full"
          color="success"
          variant="solid"
          className={`${kanit.className} text-lg text-black font-bold flex items-center space-x-4 justify-between gap-x-2`}
        >
          Save changes
        </Button>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;