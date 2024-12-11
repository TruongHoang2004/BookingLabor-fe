'use client'
import React, { CSSProperties, useState, useRef } from 'react';
import { Input, Textarea, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

const TaskInforAndPhotoTasker: React.FC = () => {

    const [rating, setRating] = useState(0); // Đánh giá mặc định là 0

    const handleClick = (index: number) => {
        setRating(index + 1); // Cập nhật đánh giá khi người dùng ấn vào ngôi sao
    };
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
            <div style={leftStyles}>
                <h2 style={headerStyles}>Task Information</h2>
                <div style={contentStyles}>
                    <div
                        style={{
                            width: '80%',
                            height: 'auto',
                            color: 'black',
                            fontSize: '15px',
                            fontWeight: 300,
                            //fontFamily: 'Inter',
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
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Title</span>}
                            variant="bordered"
                            labelPlacement='outside'
                            defaultValue="Cleaning"
                            fullWidth
                            className='text-black label-text-color-100'

                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>District</span>}
                            variant="bordered"
                            labelPlacement='outside'
                            defaultValue="Cau Giay"
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Phuong</span>}
                            variant="bordered"
                            labelPlacement='outside'
                            defaultValue="Mai Dich"
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Specific Address</span>}
                            variant="bordered"
                            labelPlacement='outside'
                            defaultValue="32 Ngo 59 Pham Van Dong"
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Start Date</span>}
                            variant="bordered"
                            labelPlacement='outside'
                            defaultValue="12/12/2024"
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>End Date</span>}
                            variant="bordered"
                            labelPlacement='outside'
                            defaultValue="14/12/2024"
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Duration</span>}
                            variant="bordered"
                            labelPlacement='outside'
                            defaultValue="3 hours"
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
                            defaultValue="Clean all the house"
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

            <div style={sidebarStyles}>
                <h2 style={headerStyles}>Rating Tasker</h2>

                {/* Review */}
                <div
                    style={{
                        width: '300px',
                        height: '250px',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 300,
                        fontFamily: 'Inter',
                        lineHeight: '24px',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        background: '#CAE5E8',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '-15px',
                        //marginRight: '0px',
                        padding: '10px',
                    }}
                >

                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        border: '2px solid #ccc',

                    }}>
                        <Image
                            src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.19.png"
                            alt="Tasker"
                            width={80}
                            height={80}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                    <h2 style={{ margin: '5px 0', color: 'black', }}>Lê Văn Bảy</h2>
                    <p style={{ margin: '5px 0', color: 'black', }}><strong>Email:</strong> baychobochay@example.com</p>
                    <p style={{ margin: '5px 0', color: 'black', }} ><strong>Phone:</strong> (+000) 782 321 589</p>
                    <p style={{ margin: '5px 0', color: 'black', }}><strong>Gender:  </strong>
                        Male</p>
                </div>

                <div
                    style={{
                        width: '300px',
                        padding: '15px',
                        //margin: '20px auto',
                        background: '#e5e7eb',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        fontFamily: 'Arial, sans-serif',
                        //marginRight: '30px',
                        color: 'black',

                    }}
                >
                    <h3 style={{
                        marginBottom: '10px',
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 300,
                        fontFamily: 'Inter',
                        lineHeight: '24px'
                    }}>Rate the Tasker</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                onClick={() => handleClick(index)}
                                style={{
                                    fontSize: '30px',
                                    cursor: 'pointer',
                                    color: index < rating ? '#FFD700' : '#ccc', // Vàng nếu đã đánh giá, xám nếu chưa
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <p style={{
                        marginTop: '10px',
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 300,
                        fontFamily: 'Inter',
                        lineHeight: '24px'
                    }}>Your rating: {rating} {rating > 0 ? 'star' : ''}</p>


                </div>
                <div className="flex flex-wrap gap-4 items-center">

                    <Button color="primary" variant="ghost">
                        Confirm
                    </Button>

                </div>

            </div>
        </div>
    );
}

const containerStyles: CSSProperties = {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row', // Mặc định xếp ngang
    justifyContent: 'center', // Canh giữa theo chiều ngang
    flexWrap: 'wrap', // Đảm bảo các phần tử sẽ xuống dòng nếu không đủ không gian
    //alignItems: 'center', // Canh trên đầu theo chiều dọc
    gap: '20px',

}


const leftStyles: CSSProperties = {

    flex: '1 1 980px',
    height: 'auto',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    color: 'black',
    marginBottom: '20px',

};

const sidebarStyles: CSSProperties = {

    flex: '1 1 400px',
    height: '620px',
    marginBottom: '20px',

    backgroundColor: '#f0f0f0',
    borderRadius: '12px',

    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    alignItems: 'center',
    color: 'black',
    marginTop: '0px',


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