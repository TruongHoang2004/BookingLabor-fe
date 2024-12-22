'use client'
// CleaningProps.tsx
import React from 'react'
import { LiaBroomSolid } from "react-icons/lia";
import ServiceProps from './ServiceProps';

const CleaningProps: React.FC = () => {
    const data = {
        imageSrc: '/img/services_img/service_cleaning1.jpg',
        title: 'Cleaning',
        description: 'Taskers will make your home sparkle!',
        services: [
            { icon: LiaBroomSolid, text: "House Cleaning Services" },
            { icon: LiaBroomSolid, text: "Disinfecting Services" },
            { icon: LiaBroomSolid, text: "Move In&Out Cleaning" },
            { icon: LiaBroomSolid, text: "Carpet Cleaning Service" },
            { icon: LiaBroomSolid, text: "Garage Cleaning" },
            { icon: LiaBroomSolid, text: "Car Washing" },
            { icon: LiaBroomSolid, text: "Laundry Help" },
            { icon: LiaBroomSolid, text: "Spring Cleaning" },
        ],
        skillID: 1
    }
    return (
        <ServiceProps {... data}/>
    )
}

export default CleaningProps;