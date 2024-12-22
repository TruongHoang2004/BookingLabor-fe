'use client';
import React from 'react';

interface BackgroundProps {
    imageUrl?: string;
}

const Background: React.FC<BackgroundProps> = ({
    imageUrl = '/img/login.jpg'
}) => {
    return (
        <div
            className="flex inset-2 z-0 w-full min-h-screen"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.5
            }}
        />
    );
};

export default Background;