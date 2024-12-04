'use client'
import React from "react";
import { Lobster } from 'next/font/google'
import { Kanit } from 'next/font/google'
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Divider, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import Image from "next/image";
import { FaBell } from "react-icons/fa6";
import {Badge} from "@nextui-org/react";

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
    const notis = [
        {text: 'Random Text 12345678910', date: "2 hours"},
        {text: 'Random Text 12345678sadadas dadsdadsdas dasdadsasd ádasdasdawdas dasdawdawdd asdwd910sss', date: "1 days"},
        {text: 'Random Text 12345678910 dadsdadsasdasdas dasdadasdasd ádaasdawdadasdas', date: "3 days"},
        {text: 'Random Text 12345678910', date: "4 days"},
        {text: 'Random Text 12345678910 dadsdadsadadsasdasdas dasddasdasd wdadasdas dadsadadsasdasdas', date: "5 days"},
        {text: 'Random Text 12345678910', date: "7 days"},
        {text: 'Random Text 12345678910', date: "10 days"},
        {text: 'Random Text 12345678910', date: "10 days"},
    ]
    const isLoggedIn = true;
    return (
        <header className="border-slate-300 py-4 border-b text-green-950 caret-transparent">
            <div className="flex justify-between items-center m-auto w-10/12">
                <h1 className={`${lobster.className} sm:text-5xl 2sm:text-2xl h-full flex items-center cursor-pointer `} onClick={() => router.push('/')}>
                    <p>DREAM LABOUR</p>
                </h1>
                {/* Nếu chưa login thì hiển thị div này ~ màn hình to*/}
                <div className={`${isLoggedIn ? 'hidden' : '1100:block 2sm:hidden'}`}>
                    <div className={`${kanit.className} lg:text-lg sm:text-sm font-normal flex h-5 items-center space-x-4 justify-between gap-x-2`}>
                        <a href="/services" className="hover:underline no-underline">Services</a>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <a href="/login" className="hover:underline no-underline">Sign-up / Login</a>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <a href="/becometasker" className="hover:bg-emerald-100 px-3 py-1 border border-lime-500 rounded-xl font-medium hover:underline no-underline">Register as a Tasker</a>
                    </div>
                </div>
                 {/* Nếu chưa login thì hiển thị div này ~ màn hình nhỏ*/}
                <div className={`${isLoggedIn ? 'hidden' : 'sm:block 1100:hidden'}`}>
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
                            <DropdownItem key="becometasker">
                                Register as a Tasker
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                 {/* Nếu login vào rồi thì hiển thị giao diện khi này và không hiển thị giao diện mặc định nữa ~ Giao diện khi màn còn to*/}
                 <div className={`${isLoggedIn ? '1100:block 2sm:hidden' : 'hidden'}`}>
                    <div className={`${kanit.className} lg:text-lg sm:text-sm font-normal flex h-5 items-center space-x-4 justify-between gap-x-2`}>
                        <a href="/services" className="hover:underline no-underline">Services</a>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <a href="/task-manage" className="hover:underline no-underline">Task Manage</a>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <Popover placement="bottom">
                                <PopoverTrigger>
                                    <p className="hover:underline no-underline cursor-pointer">My Profile</p>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="px-1 py-2 flex flex-col gap-y-5">
                                        <div className="flex gap-x-3">
                                            <Image src="/img/header/cool-ava.jpg" width={60} height={30} className="rounded" alt="ava"/>
                                            <div>
                                                <p className="font-semibold text-lg">Jeremy Truong</p>
                                                <p className="font-medium text-emerald-600 t">x0ber143n@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center h-5 space-x-2 justify-center">
                                            <a href="" className="bg-emerald-100 px-3 py-1 border border-lime-500 rounded font-semibold  hover:underline no-underline">Register as a Tasker</a>
                                            <Divider orientation="vertical" className="bg-emerald-800" />
                                            <a href="/profile" className="bg-emerald-100 px-3 py-1 border border-lime-500 rounded font-semibold  hover:underline no-underline ml-2">Edit Your Profile</a>
                                        </div>
                                    </div>
                                </PopoverContent>
                                </Popover>
                                <Divider orientation="vertical" className="bg-lime-500" />
                                <Popover placement="bottom">
                                <PopoverTrigger>
                                    <div className="mt-1">
                                        <Badge content={notis.length} color="danger">
                                            <FaBell className="text-emerald-700 text-2xl cursor-pointer hover:text-2xl" /> 
                                        </Badge>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="px-2 py-2 flex flex-col gap-y-2 max-h-[400px] max-w-[400px] overflow-y-auto">
                                        <p className="text-xl font-semibold text-emerald-800 mb-3">Notifications</p>
                                        {notis.map((noti, index) => (
                                            <div key={index} className="flex gap-x-3 border-b border-emerald-800 pb-2 items-start ">
                                                <Image src="/img/header/clipboard.png" width={40} height={40} alt="noti"></Image>
                                                <div className="cursor-pointer">
                                                    <p className="font-semibold text-emerald-800">{noti.text}</p>
                                                    <p className="text-[10px]">{noti.date} ago</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </PopoverContent>
                        </Popover>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <a href="/logout" className="hover:underline no-underline">Log Out</a>
                    </div>
                </div>
                 {/* Nếu login vào rồi thì hiển thị giao diện này và không hiển thị giao diện mặc định nữa ~ Giao diện khi màn nhỏ đi*/}
                 <div className={`${isLoggedIn ? 'sm:block 1100:hidden' : 'hidden'}`}>
                    <div className=" flex items-center gap-x-5">
                        <Popover placement="bottom">
                                    <PopoverTrigger>
                                        <div className="mt-1">
                                            <Badge content={notis.length} color="danger">
                                                <FaBell className="text-emerald-700 text-2xl cursor-pointer hover:text-2xl" /> 
                                            </Badge>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="px-2 py-2 flex flex-col gap-y-2 max-h-[400px] max-w-[350px] overflow-y-auto overflow-x-hidden">
                                            {notis.map((noti, index) => (
                                                <div key={index} className="flex gap-x-3 border-b border-emerald-800 pb-2 items-start cursor-pointer">
                                                    <Image src="/img/header/clipboard.png" width={30} height={40} alt="noti"></Image>
                                                    <div>
                                                        <p className="font-semibold text-emerald-800 text-xs text-ellipsis">{noti.text}</p>
                                                        <p className="text-[8px] font-semibold">{noti.date} ago</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </PopoverContent>
                        </Popover>
                        <Dropdown>
                            <DropdownTrigger>
                                <IoMenu className="text-3xl text-emerald-700 cursor-pointer" />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Action event example"
                                onAction={(key) => handleEvent(key.toString())}
                            >
                                <DropdownItem key="services">Services</DropdownItem>
                                <DropdownItem key="task-manage">Task Manage</DropdownItem>
                                <DropdownItem key="profile">My Profile</DropdownItem>
                                <DropdownItem key="logout">Log Out </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;