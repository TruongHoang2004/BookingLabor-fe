'use client'
import { HiMiniBuildingOffice } from "react-icons/hi2";
import React from 'react'
import ServiceProps from './ServiceProps';

const OfficeProps: React.FC = () => {
    const data = {
        imageSrc: '/img/services_img/service_office.jpg',
        title: 'Office Services',
        description: 'Hire a Tasker to help around the office!',
        services: [
            { icon: HiMiniBuildingOffice, text: "Office Cleaning" },
            { icon: HiMiniBuildingOffice, text: "Office Movers" },
            { icon: HiMiniBuildingOffice, text: "Office Supply & Snack Delivery" },
            { icon: HiMiniBuildingOffice, text: "Office Furniture Assembly" },
            { icon: HiMiniBuildingOffice, text: "Office Setup & Organization" },
            { icon: HiMiniBuildingOffice, text: "Office Administration" },
            { icon: HiMiniBuildingOffice, text: "Moving Office Furniture" },
        ],
    }
    return (
        <ServiceProps {... data}/>
    )
}

export default OfficeProps;
