import React from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";

const GetStartedSection: React.FC = () => {
    const router = useRouter();
    return (
        <div>
            <div className='w-8/12 m-auto mt-24 flex justify-center'>
                <p className='text-4xl font-bold border-b-2 border-zinc-200 pb-2 px-10'>GET STARTED NOW</p>
            </div>
            <div className='w-full relative'>
                <Image src="/img/home_img/home_page_img_1.png" alt="Image 3" width={100} height={200} className='absolute bottom-0 left-0 md:block 2sm:hidden'/>
                <Image src="/img/home_img/home_page_img_6.png" alt="Image 4" width={120} height={200} className='absolute top-0 right-0 md:block 2sm:hidden'/>
                <div className='w-8/12 m-auto mt-10 text-zinc-800 flex flex-col justify-center gap-y-16'>
                    <div className='flex flex-wrap gap-x-16 justify-center gap-y-8 '>
                        <div className='w-96 h-80 relative'>
                            <Image src="/img/home_img/booking.jpg" alt='bg' fill className='object-cover rounded-xl'/>
                        </div>
                        <div className='w-96'>
                            <p className='font-bold text-4xl mb-4'>Book trusted help for home task</p>
                            <p className='font-semibold text-gray-400 text-lg mb-4'>Get matched with top-rated professionals for all your needs</p>
                            <button onClick={() => router.push('/create-task')} className='mr-4 font-bold bg-black text-white px-3 py-1.5 rounded-lg 2sm:mb-3 sm:mb-0'>Book now</button>
                            <button className='font-extrabold bg-gray-300 text-black px-3 py-1.5 rounded-lg'>Learn more</button>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-x-16 justify-center gap-y-8'>
                        <div className='w-96'>
                            <p className='font-bold text-4xl mb-4'>Become a versatile Home Task Experts</p>
                            <p className='font-semibold text-gray-400 text-lg mb-4'>Bring expertise, tools, and a can-do attitude to make sure customer&apos; project is completed efficiently.</p>
                            <button onClick={() => router.push('/becometasker')} className='mr-4 font-bold px-3 py-1.5 rounded-lg bg-black text-white 2sm:mb-3 sm:mb-0'>Start working now</button>
                            <button className='font-extrabold bg-gray-300 text-black px-3 py-1.5 rounded-lg'>Learn more</button>
                        </div>
                        <div className='w-96 h-80 relative'>
                            <Image src="/img/home_img/working.jpg" alt='bg' fill className='object-cover rounded-xl object-right'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetStartedSection;