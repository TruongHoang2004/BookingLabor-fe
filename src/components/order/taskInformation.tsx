'use client'
import React, { CSSProperties } from 'react';
import { Input, Textarea } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";


export default function TaskInformation() {
    return (
        <div className="container" style={containerStyles}>

            <div className="left" style={leftStyles} >
                <h2 style={headerStyles}>Task Information</h2>
                <div style={contentStyles}>
                    <div
                        style={{
                            width: '80%',
                            height: 'auto',
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


                </div>
            </div>

            <div className="sidebar" style={sidebarStyles}>
                <h2 style={headerStyles}>Tasker Information</h2>

                {/* Tasker Information */}
                <div
                    style={{
                        width: '80%',
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
                        marginTop: '0px',
                        marginRight: '2px',
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





                <div className="flex flex-wrap gap-4 items-center">

                    <Button color="primary" variant="ghost">
                        Booking
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
    height: '410px',
    marginBottom: '20px',

    backgroundColor: '#f0f0f0',
    borderRadius: '12px',

    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
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

const contentStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
    width: '100%',
    height: '100%',
    color: 'black',
};



