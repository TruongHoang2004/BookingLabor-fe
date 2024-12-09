'use client'
// MovingProps.tsx
import React from 'react'
import { FaBoxOpen } from "react-icons/fa6";
import ServiceProps from './ServiceProps';

const MovingProps: React.FC = () => {
    const data = {
        imageSrc: '/img/services_img/service_moving.webp',
        title: 'Moving Service',
        description: 'From heavy lifting to unpacking and organizing your furniture!',
        services: [
            { icon: FaBoxOpen, text: "Truck Assisted Help Moving" },
            { icon: FaBoxOpen, text: "Packing Services & Help" },
            { icon: FaBoxOpen, text: "Unpacking Services" },
            { icon: FaBoxOpen, text: "Furniture Movers" },
            { icon: FaBoxOpen, text: "Storage Unit Moving" },
            { icon: FaBoxOpen, text: "Furniture Removal" },
            { icon: FaBoxOpen, text: "Appliance Removal" },
            { icon: FaBoxOpen, text: "Heavy Furniture Moving" },
            { icon: FaBoxOpen, text: "Rearrange Furniture" },
            { icon: FaBoxOpen, text: "Full Service Help Moving" },
        ],
    }
    return (
        <ServiceProps {... data}/>
    )
}

export default MovingProps;