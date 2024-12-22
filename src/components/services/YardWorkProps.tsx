'use client'
import React from "react";
import ServiceProps from "./ServiceProps";
import { GiTreeDoor } from "react-icons/gi";

const YardWorkProps: React.FC = () => {
    const data = {
        imageSrc: '/img/services_img/service_garden.jpg',
        title: 'Yard Work',
        description: 'Trust us in keeping your outdoor space clean and beautiful!',
        services: [
            { icon: GiTreeDoor, text: "Weed Removal" },
            { icon: GiTreeDoor, text: "Lawn Mowing&Care Services" },
            { icon: GiTreeDoor, text: "Landscaping Services" },
            { icon: GiTreeDoor, text: "Tree Trimming Service" },
            { icon: GiTreeDoor, text: "Vacation Plant Watering" },
            { icon: GiTreeDoor, text: "Patio Cleaning" },
            { icon: GiTreeDoor, text: "Fence Installation & Repair Services" },
            { icon: GiTreeDoor, text: "Lawn Fertilizer Service" },
            { icon: GiTreeDoor, text: "Outdoor Party Setup" },
        ],
        skillID: 4
    }
    return (
        <div>
            <ServiceProps {... data} />
        </div>
    )
}

export default YardWorkProps;