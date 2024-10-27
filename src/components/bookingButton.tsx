"use client";
import { useState } from 'react';

export default function Booking() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                position: 'relative',
                height: '40px',
                width: '120px',
                overflow: 'visible',
                borderRadius: '9999px',
                padding: '0 48px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
                transition: 'transform 0.5s',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                marginLeft: '1000px',
                marginTop: '-75px',
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            Booking
            <span
                style={{
                    position: 'absolute',
                    borderRadius: '9999px',
                    inset: '0',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    zIndex: -1,
                    transition: 'all 0.5s',
                    transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                    opacity: isHovered ? 0 : 1,
                }}
            />
        </div>
    );
}
