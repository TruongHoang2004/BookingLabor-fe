// ServiceIntro.tsx
import React from "react";
import Image from "next/image";


const ServiceIntro: React.FC = () => {
    return (
        <div >
            <div className="w-full relative md:h-[400px] sm:h-[300px] 2sm:h-[250px]">
                <Image src="/img/services_img/service_bg.jpg" alt="img" className="object-cover" fill />
                <div className="absolute md:top-72 sm:top-56 2sm:top-44 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:text-4xl sm:text-xl 2sm:text-lg font-bold text-lime-100 text-center">
                    Let we take care of your to-do list
                </div>
            </div>
            <div className="text-black font-bold text-2xl text-center mt-8 mb-8 text-emerald-800">
                Hire a trusted Tasker presto
            </div>
        </div>
    )
}

export default ServiceIntro;
