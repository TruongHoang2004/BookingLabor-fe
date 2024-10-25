import React from 'react'
import { FaStar } from "react-icons/fa";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";

const Reviews = () => {
    return (
        <div>
            <div className='w-8/12 m-auto flex justify-center mb-8 mt-20'>
                <p className='text-4xl font-bold border-b-2 border-zinc-600 pb-2 px-10'>REVIEWS</p>
            </div>
            <div className='w-8/12 m-auto flex flex-col justify-center gap-y-6 bg-white text-black py-6 rounded-3xl px-8'>
                <p className='text-gray-700 font-medium text-lg text-center'>
                    “Thank you for building such an empowering tool, especially for designers! 
                    My job was finished in less than a day. Great!
                    Thank you for building such an empowering tool, especially for designers! 
                    My job was finished in less than a day. Great!”
                </p>
                <div className='flex justify-center'> 
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2'/>
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2'/>
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2'/>
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2 '/>
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2'/>
                </div>
                <div className='flex justify-between items-center py-2'>
                    <BiSolidLeftArrow className='w-16 h-16'/>
                    <div className='flex items-center justify-center gap-x-3'>
                        <img src="/img/home_img/profile.png" alt="" className='w-20 h-20'/>
                        <div>
                            <p className= {`text-xl font-semibold`} style={{marginBottom: "-2px"}}>Karla Ray</p>
                            <p className='text-sm font-semibold text-gray-500'>@kayray</p>
                        </div>
                    </div>
                    <BiSolidRightArrow className='w-16 h-16'/>
                </div>
            </div>
        </div>
    )
}

export default Reviews;