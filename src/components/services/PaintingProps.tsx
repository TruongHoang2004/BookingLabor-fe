'use client'
import { FaPaintRoller } from "react-icons/fa";
import React from "react";
import ServiceProps from "./ServiceProps";

const PaintingProps: React.FC = () => {
    const data = {
        imageSrc: '/img/services_img/service_painting.jpg',
        title: 'Painting',
        description: 'Let us make your home come to life!',
        services: [
            { icon: FaPaintRoller, text: "Interior Wall Painting" },
            { icon: FaPaintRoller, text: "Exterior House Painting" },
            { icon: FaPaintRoller, text: "Cabinet Painting" },
            { icon: FaPaintRoller, text: "Wallpaper Removal and Painting" },
            { icon: FaPaintRoller, text: "Deck and Fence Painting" },
            { icon: FaPaintRoller, text: "Ceiling Painting" },
            { icon: FaPaintRoller, text: "Furniture Painting" }
        ],
        skillID: 6
    }
    return (
        <ServiceProps {... data}/>
    )
}

export default PaintingProps;