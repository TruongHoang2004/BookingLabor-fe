import React from "react";
import { Kanit } from 'next/font/google'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { Card, CardBody } from "@nextui-org/react";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900', '100', '200', '300'],
    display: 'swap',
})

// <input type="text"  placeholder="Name" className="py-3 pl-2 font-semibold border-2 border-amber-900 rounded-xl"/>
const Footer: React.FC = () => {
    return (
        <footer className={`w-full bg-[#fdf6ee] text-[#7a776e] ${kanit.className} py-14`}>
            <div className="w-7/12 m-auto flex 2sm:justify-center 1200:justify-between items-center flex-wrap 2sm:gap-x-10 1200:gap-x-0 2sm:gap-y-10 1200:gap-y-0">
                <div className="flex gap-x-2">
                    <a href="https://x.com/?lang=vi" title="x"><FaTwitter className="text-white bg-black p-2 rounded-full w-10 h-10 " /></a>
                    <a href="https://www.facebook.com/" title="fb"><FaFacebookF className="text-white bg-black p-2 rounded-full w-10 h-10" /></a>
                    <a href="https://www.instagram.com/" title="ins"><FaInstagram className="text-white bg-black p-2 rounded-full w-10 h-10" /></a>
                </div>
                <div>
                    <Image width={180} height={100} src="/img/footer/logo.png" alt="" className="" />
                </div>
                <div className="relative h-36">
                    <p className="text-lg font-light">SIGN UP FOR OUR EMAIL NEWSLETTER</p>
                    <form action="">
                        <input type="text" placeholder="Name" className={`w-36 placeholder-gray-800 py-3 px-2 font-semibold  border-amber-900  bg-[url('../../public/img/footer/2.jpg')] bg-cover bg-no-repeat mr-4 mt-2 rounded-md placeholder:font-light placeholder:text-[15px]`} />
                        <input type="text" placeholder="Email Address" className={`w-36 placeholder-gray-800 py-3 px-2 font-semibold  border-amber-900 bg-[url('../../public/img/footer/2.jpg')] bg-cover bg-no-repeat mr-4 mt-2 rounded-md  placeholder:font-light placeholder:text-[15px]`} />
                        <button type="submit" className={`border py-1 px-4 border-[#d4cbc1] 2sm:mt-2 x-sm:mt-0 x-sm:absolute x-sm:bottom-3 x-sm:right-4 hover:bg-amber-50 hover:border-2`}>GO</button>
                    </form>
                </div>
            </div>
            <Card isBlurred className={`w-8/12 m-auto md:mt-10 2sm:mt-28 1200:py-4`} shadow="md">
                <CardBody>
                    <div className="flex 1200:h-5 items-center justify-center gap-x-8 text-xl 1200:flex-row 2sm:flex-col x-sm:text-lg 2sm:text-sm">
                        <div className="2sm:pb-3 1200:pb-0">Vietnam</div>
                        <Divider orientation="vertical" className={`border-[#d4cbc1] sm:hidđen 1200:block`} />
                        <Divider className={`border-[#d4cbc1] sm:block 1200:hidden`} />
                        <div className="2sm:py-3 1200:py-0">Ha Noi</div>
                        <Divider orientation="vertical" className={`border-[#d4cbc1] sm:hidden 1200:block`} />
                        <Divider className={`border-[#d4cbc1] sm:block 1200:hidden`} />
                        <div className="2sm:py-3 1200:py-0">dreamlabour@dreamlabour.com</div>
                        <Divider orientation="vertical" className={`border-[#d4cbc1] sm:hidden 1200:block`} />
                        <Divider className={`border-[#d4cbc1] sm:block 1200:hidden`} />
                        <div className="2sm:pt-3 1200:pt-0">+84 948196260</div>
                    </div>
                </CardBody>
            </Card>
        </footer>
    )
}

export default Footer;
