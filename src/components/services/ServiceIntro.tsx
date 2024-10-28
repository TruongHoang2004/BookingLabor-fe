// ServiceIntro.tsx
import React from "react";
import Image from "next/image";


const ServiceIntro: React.FC = () => {
    return (
        <div >
            <div className="w-full relative" style={{height: '400px'}}>
                <Image src="/img/services_img/service_bg.jpg" alt="img" className="object-cover" fill />
                <div className="absolute top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-lime-100 text-center">
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
