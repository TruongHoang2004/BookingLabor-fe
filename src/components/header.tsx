import React from 'react';
import { Button } from "@nextui-org/react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar 
      className="bg-lime-300 shadow-sm"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarBrand className="gap-20">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 font-sans">
            MY PROFILE
          </h1>
        </div>
        <Button 
          radius="full" 
          color="success" 
          variant="solid"
          className="font-medium font-sans"
        >
          Change to Tasker Profile
        </Button>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-4">
        <Button
          radius="full"
          color="success"
          variant="solid"
          className="font-medium font-sans"
        >
          Delete profile
        </Button>
        <Button
          radius="full"
          color="success"
          variant="solid"
          className="font-medium font-sans"
        >
          Save changes
        </Button>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;