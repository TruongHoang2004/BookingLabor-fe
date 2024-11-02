'use client'
import React from "react";
import { Lobster } from 'next/font/google'
import { Kanit } from 'next/font/google'
import {Divider} from "@nextui-org/divider";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import { IoMenu } from "react-icons/io5";
import {Button} from "@nextui-org/button";
import { useRouter } from "next/navigation";
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
    const handleEvent = (path:string) => {
        router.push(path);
    }

    return (
        <header className="border-b border-slate-300 text-green-950 py-4">
            <div className="w-10/12 m-auto flex items-center justify-between">
                <h1 className={`${lobster.className} sm:text-5xl 2sm:text-2xl mr-9`} id="header_name"><a href="/">DREAM LABOUR</a></h1>
                <div className={`1100:block 2sm:hidden`}>
                    <div className={`${kanit.className} lg:text-lg sm:text-sm font-normal flex h-5 items-center space-x-4 justify-between gap-x-2`}>
                        <a href="/services" className="no-underline hover:underline">Services</a>
                        <Divider orientation="vertical" className="bg-lime-500"/>
                        <a href="/login" className="no-underline hover:underline">Sign-up / Login</a>
                        <Divider orientation="vertical" className="bg-lime-500"/>
                        <a href="" className="no-underline rounded-xl border border-lime-500 py-1 px-3 font-medium hover:bg-emerald-100 hover:underline">Register as a Tasker</a>
                    </div>
                </div>
                <div className="1100:hidden sm:block">
                <Dropdown>
                    <DropdownTrigger>
                        <Button 
                            className="font-semibold bg-white"
                        >
                            <IoMenu className="text-3xl text-emerald-700"/>
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