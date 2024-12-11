'use client'
// AssemblyProps.tsx
import { FaHammer } from "react-icons/fa";
import React from "react";
import ServiceProps from "./ServiceProps";

const AssemblyProps:React.FC = () => {
    const data = {
        imageSrc: '/img/services_img/service_assembly.webp',
        title: 'Funiture Assembly',
        description: 'Quick and efficient assembly for a wide range of furniture items!',
        services: [
            { icon: FaHammer, text: "Furniture Assembly" },
            { icon: FaHammer, text: "Patio Furniture Assembly" },
            { icon: FaHammer, text: "Desk Assembly" },
            { icon: FaHammer, text: "Dresser Assembly" },
            { icon: FaHammer, text: "Bed Assembly" },
            { icon: FaHammer, text: "Bookshelf Assembly" },
            { icon: FaHammer, text: "Couch Assembly" },
            { icon: FaHammer, text: "Chair Assembly" },
            { icon: FaHammer, text: "Wardrobe Assembly" },
            { icon: FaHammer, text: "Table Assembly" },
            { icon: FaHammer, text: "Disassemble Furniture" },
        ],
    }
    return (
        <ServiceProps {... data}/>
    )
}

export default AssemblyProps;