import React from "react";
import { Lobster } from 'next/font/google'
import { Kanit } from 'next/font/google'
import {Divider} from "@nextui-org/divider";

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

const Header: React.FC = () => {
    return (
        <header className="border-b border-slate-300 text-green-950 py-4">
            <div className="w-10/12 m-auto flex items-center justify-between">
                <h1 className={`${lobster.className} text-5xl mr-9`} id="header_name">DREAM LABOUR</h1>
                <div className={`${kanit.className} text-lg  font-normal flex h-5 items-center space-x-4 justify-between gap-x-2`}>
                    <a href="/services" className="no-underline hover:underline">Services</a>
                    <Divider orientation="vertical" className="bg-lime-500"/>
                    <a href="/login" className="no-underline hover:underline">Sign-up / Login</a>
                    <Divider orientation="vertical" className="bg-lime-500"/>
                    <a href="" className="no-underline rounded-xl border border-lime-500 py-1 px-3 font-medium hover:bg-emerald-100 hover:underline">Register as a Tasker</a>
                </div>
            </div>
        </header>
    )
}

export default Header;