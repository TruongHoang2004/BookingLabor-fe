'use client'
import Image from "next/image";
import { useState } from "react";
import { PiBroomDuotone } from "react-icons/pi";
import { PiTruckDuotone } from "react-icons/pi";
import { PiWrenchDuotone } from "react-icons/pi";
import { PiTreeDuotone } from "react-icons/pi";
import { PiPaintRollerDuotone } from "react-icons/pi";
import { PiFireDuotone } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";
const TaskOptions: React.FC = () => {
    const [activeOption, setActiveOption] = useState(1);
  
    const options_details = [
      {
        id: 1,
        title: 'Cleaning',
        description1: 'Comprehensive cleaning services to keep your home spotless and fresh.',
        description2: 'Popular tasks: Mopping floors, cleaning windows, vacuuming carpets.',
        bg_img_src: '/img/home_img/cleaning.jpg',
        bg_color: 'bg-cyan-100',
        options_img_src: '/img/home_img/bg1.png',
        options_bg_color: 'border-cyan-400',
        icon: <PiBroomDuotone className='w-8 h-8 absolute top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-fuchsia-950'/>,
      },
      {
        id:2,
        title: 'Moving',
        description1: 'Reliable moving assistance to make your relocation stress-free and seamless.',
        description2: 'Popular tasks: Packing household items, carrying boxes, moving furniture.',
        bg_img_src: '/img/home_img/moving.jpg',
        bg_color: 'bg-green-200',
        options_img_src: '/img/home_img/bg2.png',
        options_bg_color: 'border-green-400',
        icon: <PiTruckDuotone className='w-8 h-8 absolute top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-fuchsia-950'/>
      },
      {
        id: 3,
        title: 'Home Repairs',
        description1: 'Fix anything from broken furniture to malfunctioning appliances.',
        description2: 'Popular tasks: Fixing a broken cabinet, replacing a light bulb, repairing a TV or table.',
        bg_img_src: '/img/home_img/home_repair2.jpg',
        bg_color: 'bg-yellow-100',
        options_img_src: '/img/home_img/bg3.png',
        options_bg_color: 'border-yellow-300',
        icon: <PiWrenchDuotone className='w-8 h-8 absolute top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-fuchsia-950'/> 
      },
      {
        id: 4,
        title: 'Outdoor Help',
        description1: 'Get assistance with outdoor chores to maintain a beautiful yard and garden.',
        description2: 'Popular tasks: Lawn mowing, garden cleanup, trimming hedges.',
        bg_img_src: '/img/home_img/outdoor.jpg',
        bg_color: 'bg-purple-100',
        options_img_src: '/img/home_img/bg4.png',
        options_bg_color: 'border-purple-500',
        icon: <PiTreeDuotone className='w-8 h-8 absolute top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-fuchsia-950'/> 
      },
      {
        id: 5,
        title: 'Painting',
        description1: 'We handle wall painting, touch-ups, and complete color makeovers.',
        description2: 'Popular tasks: Painting fences, repainting doors, exterior house painting.',
        bg_img_src: '/img/home_img/painting.jpg',
        bg_color: 'bg-sky-200',
        options_img_src: '/img/home_img/bg5.png',
        options_bg_color: 'border-blue-700',
        icon: <PiPaintRollerDuotone className='w-8 h-8 absolute top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-fuchsia-950'/>
      },
      {
        id: 6,
        title: 'Other Tasks',
        description1: "Discover more tasks in other fields based on customers needs.",
        description2: 'Explore these tasks and feel free to choose the most suitable one.',
        bg_img_src: '/img/home_img/other_task.jpg',
        bg_color: 'bg-red-100',
        options_img_src: '/img/home_img/bg6.png',
        options_bg_color: 'border-red-400',
        icon: <PiFireDuotone className='w-8 h-8 absolute top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-fuchsia-950'/>
      },
    ];
    
    return (
          <div>
            <div className=' w-8/12 m-auto mt-20 flex align-center justify-between border-b-2 border-zinc-200'>
            {options_details.map(option => (
                    <div
                    key={option.id}
                    className={`relative w-16 pb-4 cursor-pointer ${option.options_bg_color} ${activeOption === option.id ? 'border-b-2' : 'border-0'}`}
                    onClick={() => setActiveOption(option.id)}
                    >
                        <Image src={option.options_img_src} alt={`bg${option.id}`} width={200} height={200} className={`${activeOption === option.id ? 'block' : 'hidden'}`}/>
                        {option.icon}
                    </div>
                ))}
            </div>

            <div className='w-full relative'>
                <Image src="/img/home_img/home_page_img_8.png" alt="Image 4" width={120} height={200} className='absolute top-0 right-0'/>
                <div className= {`w-8/12 m-auto mt-8 ${options_details[activeOption - 1].bg_color} rounded-2xl p-8 pl-20 pr-4`}>
                    <div className='w-11/12 m-auto relative' style={{height: "430px"}}>
                        <Image src={options_details[activeOption -  1].bg_img_src} alt="" className={`w-full object-cover rounded-xl`} fill />
                        <div className='rounded-xl absolute bg-slate-100 w-80 h-72 top-1/2 left-24 transform -translate-x-1/2 -translate-y-1/2'>
                            <div className='ml-8 mt-8 mr-4'>
                                <p className='text-3xl font-bold mb-6'>{options_details[activeOption - 1].title}</p>
                                <div className='flex items-start mb-6'>
                                    <IoMdCheckmark size={50} className='mr-4 pb-6'/>
                                    <p className='font-medium'>{options_details[activeOption - 1].description1}</p>
                                </div>
                                <div className='flex items-start'>
                                    <IoMdCheckmark size={50} className='mr-4 pb-6'/>
                                    <p className='font-medium'>{options_details[activeOption - 1].description2}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskOptions;
