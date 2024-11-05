import React from "react";
import { Lobster } from 'next/font/google'
import { Kanit } from 'next/font/google'
import { Separator } from "@/components/ui/separator"
import styles from '../styles/header.module.css';

const lobster = Lobster({
    subsets: ['latin'],
    weight: ['400'],
});
const kanit = Kanit({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

const Header: React.FC = () => {
    return (
        <header className="border-b border-slate-300 text-green-950 py-4">
            <div className="w-10/12 m-auto flex items-center justify-between">
                <h1 className={`${lobster.className} text-5xl mr-9`} id="header_name">bookingLabour</h1>
                <div className={`${kanit.className} text-lg  font-normal flex h-5 items-center space-x-4`}>
                    <a href="" className="no-underline">Services</a>
                    <Separator orientation="vertical" className="bg-zinc-950 w-px" />
                    <a href="/register" className="no-underline">Sign-up</a>
                    <Separator orientation="vertical" className="bg-zinc-950 w-px" />
                    <a href="/login" className="no-underline">Login</a>
                    <Separator orientation="vertical" className="bg-zinc-950 w-px" />
                    <a href="" className="no-underline rounded-xl border border-lime-500 py-1 px-3 font-medium">Register as a Tasker</a>
                </div>
            </div>
        </header>
    )
}

export default Header;
