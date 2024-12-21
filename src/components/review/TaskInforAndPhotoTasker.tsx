'use client'
import React, { CSSProperties, useState, useEffect } from 'react';
import { Input, Textarea, Button } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation';
import { locationService } from "@/service/location/location1";

const locations = new locationService();


const TaskInforAndPhotoTasker: React.FC = () => {
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = [...uploadedImages, ...Array.from(files)];
      setUploadedImages(newImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadedImages(prev => [...prev, ...files]);
  };

    const [rating, setRating] = useState(0); // Đánh giá mặc định là 0

    const handleClick = (index: number) => {
        setRating(index + 1); // Cập nhật đánh giá khi người dùng ấn vào ngôi sao
    };
    // const [images, setImages] = useState<string[]>([
    //     "https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg",

    // ]);



    const searchParams = useSearchParams();
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Chỉ lấy phần yyyy-mm-dd
    };





    useEffect(() => {
        const getLocationNames = async () => {
            try {
                const districtCode = parseInt(searchParams.get('district') || '0');
                const wardCode = parseInt(searchParams.get('ward') || '0');

                const districtData = locations.getDistrictByCode(districtCode);
                const wardData = locations.getWardByCode(wardCode);

                if (districtData) {
                    setDistrictName(districtData.name);
                }
                if (wardData) {
                    setWardName(wardData.name);
                }
            } catch (error) {
                //toast.error("Error loading location data");
                console.error(error);
            }
        };

        getLocationNames();
    }, [searchParams]);


    //const taskID = parseInt(searchParams.get('taskId') || '0', 10);

    const title = searchParams.get('title') || '';
    //const district = searchParams.get('district') || '';
    // const ward = searchParams.get('ward') || '';
    const detail_address = searchParams.get('detail_address') || '';
    const start_date = formatDate(searchParams.get('start_date') || '');
    const end_date = formatDate(searchParams.get('end_date') || '');
    const fee_per_hour = searchParams.get('fee_per_hour') || '';
    const estimated_duration = searchParams.get('estimated_duration') || '';
    const description = searchParams.get('description') || '';

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
                            labelPlacement='outside'
                            value={title}
                            fullWidth
                            className='text-black label-text-color-100'

                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>District</span>}
                            labelPlacement='outside'
                            value={districtName}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Ward</span>}
                            labelPlacement='outside'
                            value={wardName}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Specific Address</span>}
                            labelPlacement='outside'
                            value={detail_address}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Start Date</span>}
                            labelPlacement='outside'
                            value={start_date}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>End Date</span>}
                            labelPlacement='outside'
                            value={end_date}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Duration</span>}
                            labelPlacement='outside'
                            value={estimated_duration}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Estimated Fee</span>}
                            labelPlacement='outside'
                            value={fee_per_hour}
                            fullWidth
                        />

                        <Textarea
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Description</span>}
                            labelPlacement='outside'
                            value={description}
                            fullWidth
                        />
                    </div>

                    


                    {/* <h2 style={MidStyles}> Your review</h2>

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
                    </div> */}
                </div>
            </div>

            <div style={sidebarStyles}>
                <h2 style={headerStyles}>Rating Tasker</h2>
                    
                {/* Review */}
                {/* <div
                    style={{
                        width: '300px',
                        height: '250px',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 300,


                        lineHeight: '36px',

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
                > */}

                {/* <div style={{
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
                        Male</p> */}
                {/* </div> */}

                <div
                    style={{
                        width: '300px',
                        padding: '15px',
                        //margin: '20px auto',
                        background: '#CAE5E8',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        // fontFamily: 'Arial, sans-serif',
                        //marginRight: '30px',
                        color: 'black',


                    }}
                >
                    <h3 style={{
                        marginBottom: '10px',
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 300,
                        // fontFamily: 'Inter',
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
                        // fontFamily: 'Inter',
                        lineHeight: '24px'
                    }}>Your rating: {rating} {rating > 0 ? 'star' : ''}</p>


                </div>

                <h2 style={MidStyles}>Photos</h2>
                <div className="upload-section p-4">
                        {/* Upload Area */}
                        <div 
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            />
                            <label 
                            htmlFor="image-upload"
                            className="cursor-pointer flex flex-col items-center"
                            >
                            <span>Drag & drop images or click to upload</span>
                            </label>
                        </div>

                        {/* Preview Area */}
                        <div className="grid grid-cols-3 gap-4">
                            {uploadedImages.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
                                >
                                ×
                                </button>
                            </div>
                            ))}
                        </div>
                        </div>
                    {/* <div style={imageContainerStyles}>
                        {images.map((src, index) => (
                            <div key={index} style={{ position: 'relative', marginRight: '10px' }}>
                                <Image
                                    width={300}
                                    height={200}
                                    alt={`Completion Photo ${index + 1}`}
                                    src={src}
                                    style={{ cursor: 'pointer', borderRadius: '8px' }}
                                    onClick={() => handleImageClick(index)}
                                /> */}
                                {/* Hidden File Input */}
                                {/* <input
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
                    </div> */}

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
                <div className="flex flex-wrap gap-4 items-center">

                    <Button color="primary" variant="solid" className='max-w-xl' size='lg'>
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
    height: 'auto',
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
    // marginBottom: '20px',
    textAlign: 'center',
    color: 'black'
};

const MidStyles: CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    // marginBottom: '20px',
    textAlign: 'center',
    color: 'black',
    // marginTop: '20px'
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


export default TaskInforAndPhotoTasker;
