'use client'
import React, { CSSProperties, useState, useRef } from 'react';
import { Input, Textarea } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

const TaskInforAndPhotoTasker: React.FC = () => {
    const [images, setImages] = useState<string[]>([
        "https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg",
        "https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg",
        "https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg",


    ]);


    const fileInputRefs = useRef<HTMLInputElement[]>([]);


    const handleImageClick = (index: number) => {
        fileInputRefs.current[index]?.click();
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(file);
            setImages(newImages);
        }
    };
    return (
        <div style={containerStyles}>
            <h2 style={headerStyles}>Task Information</h2>
            <div style={contentStyles}>
                <div
                    style={{
                        width: '80%',
                        height: 'auto',
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 300,
                        fontFamily: 'Inter',
                        lineHeight: '36px',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        background: '#CAE5E8',/* Light gray, soft and neutral */
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        gap: '15px', // Space between each input field
                    }}
                >
                    <Input
                        isReadOnly
                        type='text'
                        //key="outside-left"
                        label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Category</span>}
                        variant="bordered"
                        labelPlacement='outside'
                        defaultValue="Education"
                        fullWidth
                        className='text-black label-text-color-100'

                    />
                    <Input
                        isReadOnly
                        type='text'
                        //key="outside-left"
                        label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Address</span>}
                        variant="bordered"
                        labelPlacement='outside'
                        defaultValue="New York"
                        fullWidth
                    />
                    <Input
                        isReadOnly
                        type='text'
                        //key="outside-left"
                        label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Time</span>}
                        variant="bordered"
                        labelPlacement='outside'
                        defaultValue="10:00 AM - 12:00 PM"
                        fullWidth
                    />
                    <Input
                        isReadOnly
                        type='text'
                        //key="outside-left"
                        label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Duration</span>}
                        variant="bordered"
                        labelPlacement='outside'
                        defaultValue="30 minutes"
                        fullWidth
                    />
                    <Input
                        isReadOnly
                        type='text'
                        //key="outside-left"
                        label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Estimated Fee</span>}
                        variant="bordered"
                        labelPlacement='outside'
                        defaultValue="$50"
                        fullWidth
                    />

                    <Textarea
                        isReadOnly
                        type='text'
                        //key="outside-left"
                        label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Description</span>}
                        variant="bordered"
                        labelPlacement='outside'
                        defaultValue="em co phan hoi gi khong"
                        fullWidth
                    />
                </div>

                <h2 style={MidStyles}>Photo of Completion</h2>
                <div style={imageContainerStyles}>
                    {images.map((src, index) => (
                        <div key={index} style={{ position: 'relative', marginRight: '10px' }}>
                            <Image
                                width={300}
                                height={200}
                                alt={`Completion Photo ${index + 1}`}
                                src={src}
                                style={{ cursor: 'pointer', borderRadius: '8px' }}
                                onClick={() => handleImageClick(index)}
                            />
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={el => {
                                    if (el) fileInputRefs.current[index] = el;
                                }}
                                onChange={(e) => handleFileChange(e, index)}
                            />
                        </div>
                    ))}
                </div>


                <h2 style={MidStyles}> Your review</h2>

                <div style={{
                    width: "80%",
                    color: 'black',
                }} >

                    <Textarea

                        variant="bordered"
                        placeholder="Write your review about task and tasker here."
                        disableAnimation
                        disableAutosize
                        classNames={{
                            base: "80%",
                            input: "resize-y min-h-[40px]",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

const containerStyles: CSSProperties = {
    width: '100%',
    maxWidth: '980px',
    height: 'auto',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    marginLeft: '30px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    color: 'black',
};

const headerStyles: CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'black'
};

const MidStyles: CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'black',
    marginTop: '20px'
};

const contentStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px', // Space between each child component
    width: '100%',
    height: '100%',
    color: 'black',
};

const imageContainerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',

};



export default TaskInforAndPhotoTasker;