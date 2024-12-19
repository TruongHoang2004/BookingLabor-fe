'use client'
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Image from "next/image";
import { FaBell } from "react-icons/fa6";
import { Badge } from "@nextui-org/react";
import { useNotifications } from "@/service/notifications/useNotification";

const Notifications:React.FC = () => {
    const notis = [
        { text: 'Random Text 12345678910', date: "2 hours" },
        { text: 'Random Text 12345678sadadas dadsdadsdas dasdadsasd ádasdasdawdas dasdawdawdd asdwd910sss', date: "1 days" },
        { text: 'Random Text 12345678910 dadsdadsasdasdas dasdadasdasd ádaasdawdadasdas', date: "3 days" },
        { text: 'Random Text 12345678910', date: "4 days" },
        { text: 'Random Text 12345678910 dadsdadsadadsasdasdas dasddasdasd wdadasdas dadsadadsasdasdas', date: "5 days" },
        { text: 'Random Text 12345678910', date: "7 days" },
        { text: 'Random Text 12345678910', date: "10 days" },
        { text: 'Random Text 12345678910', date: "10 days" },
    ]
    const { notifications } = useNotifications();
    
    return (
        <Popover placement="bottom">
                <PopoverTrigger>
                        <div className="mt-1">
                            <Badge content={notis.length} color="danger">
                            <FaBell className="text-2xl text-emerald-700 hover:text-2xl cursor-pointer" />
                        </Badge>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                                <div className="flex flex-col gap-y-2 px-2 py-2 max-w-[400px] max-h-[400px] overflow-y-auto">
                                <p className="mb-3 font-semibold text-emerald-800 text-xl">Notifications</p>
                                {notis.map((noti, index) => (
                                <div key={index} className="flex items-start gap-x-3 border-emerald-800 pb-2 border-b">
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
    )
}

export default Notifications;