'use client'
import React, { CSSProperties, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { Input, Textarea } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { locationService as locations } from "@/service/location/location";
import { taskService } from '@/service/task/task';
import { useAppSelector } from '@/redux/store';

export default function TaskInformation() {

    const searchParams = useSearchParams();
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Chỉ lấy phần yyyy-mm-dd
    };
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        const getLocationNames = async () => {
            try {
                const districtCode = parseInt(searchParams.get('district') || '0');
                const wardCode = parseInt(searchParams.get('ward') || '0');

                const districtData = await locations.getDistrictByCode(districtCode);
                const wardData = await locations.getWardByCode(wardCode);

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


    const taskID = parseInt(searchParams.get('taskId') || '0', 10);

    const title = searchParams.get('title') || '';
    //const district = searchParams.get('district') || '';
    // const ward = searchParams.get('ward') || '';
    const detail_address = searchParams.get('detail_address') || '';
    const start_date = formatDate(searchParams.get('start_date') || '');
    const end_date = formatDate(searchParams.get('end_date') || '');
    const fee_per_hour = searchParams.get('fee_per_hour') || '';
    const estimated_duration = searchParams.get('estimated_duration') || '';
    const description = searchParams.get('description') || '';
    let total_fee;
    if (fee_per_hour && estimated_duration) {
        total_fee = parseInt(fee_per_hour, 10) * parseInt(estimated_duration)
        total_fee = (total_fee * 0.05).toFixed(2);
    }


    const router = useRouter();

    const handleConfirmPayment = async () => {
        try {
            //console.log("Task ID: ", taskID);
            await taskService.acceptTask(taskID); // Gọi hàm service với task.id

            router.push('/taskmanage/tasker'); // Chuyển hướng về trang danh sách tasker
            //setIsAccepted(!isAccepted)
        } catch (error) {

            console.error("Lỗi khi xác nhận:", error);
        }
    };

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
                            color='default'
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Title</span>}
                            labelPlacement='outside'
                            value={title}
                            fullWidth
                            className='label-text-color-100 text-black'
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            color='default'
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
                            color='default'
                            labelPlacement='outside'
                            value={wardName}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Specific Address</span>}
                            color='default'
                            labelPlacement='outside'
                            value={detail_address}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Start Date</span>}
                            color='default'
                            labelPlacement='outside'
                            value={start_date}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>End Date</span>}
                            color='default'
                            labelPlacement='outside'
                            value={end_date}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Duration</span>}
                            color='default'
                            labelPlacement='outside'
                            value={estimated_duration}
                            fullWidth
                        />
                        <Input
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Estimated Fee</span>}
                            color='default'
                            labelPlacement='outside'
                            value={fee_per_hour}
                            fullWidth
                        />

                        <Textarea
                            isReadOnly
                            type='text'
                            //key="outside-left"
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Description</span>}
                            color='default'
                            labelPlacement='outside'
                            value={description}
                            fullWidth
                        />
                    </div>


                </div>
            </div>

            <div className="sidebar" style={sidebarStyles}>
                <h2 style={headerStyles}>Payment</h2>

                {/* Tasker Information */}
                <div
                    style={{
                        width: '80%',
                        // height: '250px',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 300,
                        // fontFamily: 'Inter',
                        lineHeight: '24px',
                        borderRadius: '10px',
                        //border: '1px solid #ccc',
                        //background: '',
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
                        width: '250px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        padding: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                        <Image
                            src="/img/QR_Code/QR_Code.jpg"
                            alt="QR Code"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                marginBottom: '10px',
                            }}
                        />

                        <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#333' }}>Total fee: {total_fee} VND</p>
                        <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#333' }}>Transfer details: A{taskID}-T{user?.tasker?.id}</p>
                    </div>

                </div>





                <div className="flex flex-wrap items-center gap-4">
                    <Button onClick={handleConfirmPayment} color="primary" variant="ghost">
                        Confirm Payment
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
    height: '550px',
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



