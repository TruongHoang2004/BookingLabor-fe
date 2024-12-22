'use client'
import React from "react";
import { Lobster } from 'next/font/google'
import { Kanit } from 'next/font/google'
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Divider, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useAppSelector } from '@/redux/store';
import { useAppDispatch } from '../../redux/store';
import { logout } from '@/redux/slices/authSlice';
import { Role } from "@/enum/role";
import HeaderAdmin from "./headerAdmin";
import NotificationListener from "./NotificationListener";

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
    const { isAuthenticated, user, isTasker } = useAppSelector((state) => state.auth);
    let isLoggedIn = false;
    //const user = {fullname: "jqnwd", email: "aodwnmoiamdio"}
    if (isAuthenticated && user) {
        isLoggedIn = true;
    }

    const router = useRouter();
    const handleEvent = (path: string) => {
        if (path === "logout") {
            handleLogOut()
        } else {
            router.push(path);
        }

    }
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        dispatch(logout());
    }

    if (user?.role === Role.ADMIN) {
        return (
            <HeaderAdmin />
        )
    }

    return (
        <header className="border-slate-300 py-4 border-b text-green-950 caret-transparent">
            <div className="flex justify-between items-center m-auto w-10/12">
                <h1 className={`${lobster.className} sm:text-5xl 2sm:text-2xl h-full flex items-center cursor-pointer `} onClick={() => router.push('/')}>
                    <p>DREAM LABOUR</p>
                </h1>
                {/* Nếu chưa login thì hiển thị div này ~ màn hình to*/}
                <div className={`${isLoggedIn ? 'hidden' : '1100:block 2sm:hidden'}`}>
                    <div className={`${kanit.className} lg:text-lg sm:text-sm font-normal flex h-5 items-center space-x-4 justify-between gap-x-2`}>
                        <p onClick={() => router.push('/services')} className="hover:underline no-underline cursor-pointer">Services</p>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <p onClick={() => router.push('/login')} className="hover:underline no-underline cursor-pointer">Login / Register</p>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <p onClick={() => router.push('/becometasker')} className="hover:bg-emerald-100 px-3 py-1 border border-lime-500 rounded-xl font-medium hover:underline no-underline cursor-pointer">Become a Tasker</p>
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
                        <p onClick={() => router.push('/services')} className="hover:underline no-underline cursor-pointer">Services</p>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <p onClick={() => router.push('/taskmanage')} className="hover:underline no-underline cursor-pointer">Task Manage</p>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <Popover placement="bottom">
                            <PopoverTrigger>
                                <p className="hover:underline no-underline cursor-pointer">My Profile</p>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex flex-col gap-y-5 px-1 py-2">
                                    <div className="flex gap-x-3">
                                        <Avatar src={user?.profile.avatar ? user?.profile.avatar : "/img/header/cool-ava.jpg"} size="lg" className="rounded" alt="ava" />
                                        <div>
                                            <p className="font-semibold text-lg">{`${user?.profile?.first_name ?? ''} ${user?.profile?.last_name ?? ''}`.trim()}</p>
                                            <p className="font-medium text-emerald-600 t">{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center space-x-2 h-5">
                                        {isTasker ? (
                                            <p onClick={() => router.push('/tasks')} className="bg-emerald-100 px-3 py-1 border border-lime-500 rounded font-semibold hover:underline no-underline cursor-pointer">View Task</p>
                                        ) : (
                                            <p onClick={() => router.push('/becometasker')} className="bg-emerald-100 px-3 py-1 border border-lime-500 rounded font-semibold hover:underline no-underline cursor-pointer">Register as a Tasker</p>
                                        )}
                                        <Divider orientation="vertical" className="bg-emerald-800" />
                                        <p onClick={() => router.push('/profile')} className="bg-emerald-100 ml-2 px-3 py-1 border border-lime-500 rounded font-semibold hover:underline no-underline cursor-pointer">Edit Your Profile</p>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        {/* <NotificationComponent /> */}
                        <NotificationListener />
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <p onClick={handleLogOut} className="hover:underline no-underline cursor-pointer">Log Out</p>
                    </div>
                </div>
                {/* Nếu login vào rồi thì hiển thị giao diện này và không hiển thị giao diện mặc định nữa ~ Giao diện khi màn nhỏ đi*/}
                <div className={`${isLoggedIn ? 'sm:block 1100:hidden' : 'hidden'}`}>
                    <div className="flex items-center gap-x-5">
                        <NotificationListener />
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
                                {isTasker ? 
                                (<DropdownItem key="tasks">View Tasks</DropdownItem>
                                ) 
                                :
                                (<DropdownItem key="becometasker">Become Tasker</DropdownItem>)
                                }
                                <DropdownItem key="taskmanage">Task Manage</DropdownItem>
                                <DropdownItem key="profile">My Profile</DropdownItem>
                                <DropdownItem key="logout">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header;