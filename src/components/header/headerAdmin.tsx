'use client'
import React from "react";
import { Lobster } from 'next/font/google'
import { Kanit } from 'next/font/google'
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Divider, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAppSelector } from '@/redux/store';
import { useAppDispatch } from '../../redux/store';
import { logout } from '@/redux/slices/authSlice';

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

const HeaderAdmin: React.FC = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    let isLoggedIn = false;
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

    return (
        <header className="border-slate-300 py-4 border-b text-green-950 caret-transparent">
            <div className="flex justify-between items-center m-auto w-10/12">
                <h1 className={`${lobster.className} sm:text-5xl 2sm:text-2xl h-full flex items-center cursor-pointer `} onClick={() => router.push('/admin')}>
                    <p>DREAM LABOUR</p>
                </h1>
                <div className={`${isLoggedIn ? 'hidden' : '1100:block 2sm:hidden'}`}>
                    <div className={`${kanit.className} lg:text-lg sm:text-sm font-normal flex h-5 items-center space-x-4 justify-between gap-x-2`}>
                        <p onClick={() => router.push('/admin/login')} className="hover:underline no-underline cursor-pointer">Login</p>
                    </div>
                </div>
                <div className={`${isLoggedIn ? 'hidden' : 'sm:block 1100:hidden'}`}>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="bg-white font-semibold">
                                <IoMenu className="text-3xl text-emerald-700" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Action event example" onAction={(key) => handleEvent(key.toString())}>
                            <DropdownItem key="login">Login</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className={`${isLoggedIn ? '1100:block 2sm:hidden' : 'hidden'}`}>
                    <div className={`${kanit.className} lg:text-lg sm:text-sm font-normal flex h-5 items-center space-x-4 justify-between gap-x-2`}>
                        <p onClick={() => router.push('/admin/users')} className="hover:underline no-underline cursor-pointer">User Management</p>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <p onClick={() => router.push('/admin/tasks')} className="hover:underline no-underline cursor-pointer">Task Management</p>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <p onClick={() => router.push('/admin/skills')} className="hover:underline no-underline cursor-pointer">Skill Management</p>
                        <Divider orientation="vertical" className="bg-lime-500" />
                        <p onClick={handleLogOut} className="hover:underline no-underline cursor-pointer">Log Out</p>
                    </div>
                </div>
                <div className={`${isLoggedIn ? 'sm:block 1100:hidden' : 'hidden'}`}>
                    <div className="flex items-center gap-x-5">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className="bg-white font-semibold">
                                    <IoMenu className="text-3xl text-emerald-700" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Action event example" onAction={(key) => handleEvent(key.toString())}>
                                <DropdownItem key="tasks">Task</DropdownItem>
                                <DropdownItem key="users">User</DropdownItem>
                                <DropdownItem key="skills">Skill</DropdownItem>
                                <DropdownItem key="logout">Log Out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderAdmin;
