'use client'
import React from "react";
import { Lobster } from 'next/font/google'
import { Kanit } from 'next/font/google'
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Divider, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";

const lobster = Lobster({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
});
const kanit = Kanit({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})
// lg: 1024 -> 
const Header: React.FC = () => {
    const router = useRouter();
    const handleEvent = (path: string) => {
        router.push(path);
    }

    return (
        <header className="border-slate-300 py-4 border-b text-green-950">
            <div className="flex justify-between items-center m-auto w-10/12">
                <h1 className={`${lobster.className} sm:text-5xl 2sm:text-2xl mr-9`}>
                    <Link legacyBehavior href="/">
                        <a>DREAM LABOUR</a>
                    </Link>
                </h1>
                <div className={`1100:block 2sm:hidden`}>
                    <div className={`${kanit.className} lg:text-lg sm:text-sm font-normal flex h-5 items-center space-x-4 justify-between gap-x-2`}>
                        <a href="/services" className="hover:underline no-underline">Services</a>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <a href="/login" className="hover:underline no-underline">Sign-up / Login</a>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <a href="" className="hover:bg-emerald-100 px-3 py-1 border border-lime-500 rounded-xl font-medium hover:underline no-underline">Register as a Tasker</a>
                    </div>
                </div>
                <div className="sm:block 1100:hidden">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="bg-white font-semibold"
                            >
                                <IoMenu className="text-3xl text-emerald-700" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Action event example"
                            onAction={(key) => handleEvent(key.toString())}
                        >
                            <DropdownItem key="services">Services</DropdownItem>
                            <DropdownItem key="login">Login</DropdownItem>
                            <DropdownItem key="register">Sign-up</DropdownItem>
                            <DropdownItem key="tasker_login">
                                Register as a Tasker
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}

export default Header;