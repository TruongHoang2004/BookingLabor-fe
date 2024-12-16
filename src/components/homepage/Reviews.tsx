import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import Image from 'next/image';

const reviews = [
    {
        text: "Thank you for building such an empowering tool, especially for designers! My job was finished in less than a day. Great!",
        name: "Dinh Chi Kien",
        username: "@kiendc",
        avatar: "/img/home_img/profile.png"
    },
    {
        text: "This tool has significantly improved my workflow. Highly recommended! I will definitely use it again in the future.",
        name: "Truong Quang Minh",
        username: "@minhtrquang",
        avatar: "/img/home_img/profile.png"
    },
    {
        text: "The website has made my life significantly easier by eliminating the hassle of finding trustworthy workers for small but important tasks. ",
        name: "Le Quang Hung",
        username: "@hungle1707",
        avatar: "/img/home_img/profile.png"
    },
    {
        text: "I have been using this tool for a while now and I am very satisfied with the results. It is very easy to use and has saved me a lot of time.",
        name: "Hoang Xuan Truong",
        username: "@truongcontn",
        avatar: "/img/home_img/profile.png"
    },
    {
        text: "I have been using this tool for a while now and I am very satisfied with the results. It is very easy to use and has saved me a lot of time.",
        name: "Mai Tien Huy",
        username: "@huymaicute",
        avatar: "/img/home_img/profile.png"
    },

];

const Reviews = () => {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const handleNext = () => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const handlePrev = () => {
        setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    const currentReview = reviews[currentReviewIndex];

    return (
        <div>
            <div className='w-8/12 m-auto flex justify-center mb-8 mt-20'>
                <p className='text-4xl font-bold border-b-2 border-zinc-600 pb-2 px-10'>REVIEWS</p>
            </div>
            <div className='w-8/12 m-auto flex flex-col justify-center gap-y-6 bg-white text-black py-6 rounded-3xl px-8'>
                <p className='text-gray-700 font-medium text-lg text-center'>
                    {currentReview.text}
                </p>
                <div className='flex justify-center'>
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2' />
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2' />
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2' />
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2 ' />
                    <FaStar className='w-14 h-14 text-yellow-300 mr-2' />
                </div>
                <div className='flex justify-between items-center py-2'>
                    <BiSolidLeftArrow className='x-sm:w-16 x-sm:h-16 2sm:w-10 2sm:h-10 cursor-pointer' onClick={handlePrev} />
                    <div className='flex items-center justify-center gap-x-3'>
                        <Image width={80} height={80} src={currentReview.avatar} alt="avatar" className='2sm:w-10 2sm:h-10 x-sm:w-20 x-sm:h-20' />
                        <div>
                            <p className={`x-sm:text-xl 2sm:text-xs font-semibold`} style={{ marginBottom: "-2px" }}>{currentReview.name}</p>
                            <p className='x-sm:text-sm 2sm:text-xs font-semibold text-gray-500'>{currentReview.username}</p>
                        </div>
                    </div>
                    <BiSolidRightArrow className='x-sm:w-16 x-sm:h-16 2sm:w-10 2sm:h-10 cursor-pointer' onClick={handleNext} />
                </div>
            </div>
        </div>
    );
};

export default Reviews;