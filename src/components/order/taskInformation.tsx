import React, { CSSProperties } from 'react';
import { Input, Textarea } from "@nextui-org/react";
import { Card, CardBody, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

export default function TaskInformation() {
    return (
        <div style={leftStyles}>

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

                    <div
                        style={{
                            width: '80%',
                            height: 'auto',
                            textAlign: 'center',
                            color: 'black',
                            fontSize: '15px',
                            fontWeight: 300,
                            fontFamily: 'Inter',
                            lineHeight: '24px',
                            borderRadius: '10px',

                            //background: 'linear-gradient(to right, #c1dfc4,#deecdd)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            //marginTop: '15px',
                            //marginLeft: '630px',
                            padding: '10px',
                        }}
                    >
                        <Card
                            isBlurred
                            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                            shadow="sm"
                        >
                            <CardBody>
                                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                    <div className="relative col-span-6 md:col-span-4">
                                        <Image
                                            alt="Album cover"
                                            className="object-cover"
                                            height={200}
                                            shadow="md"
                                            src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.19.png"
                                            width="100%"
                                        />
                                    </div>

                                    <div className="flex flex-col col-span-6 md:col-span-8">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-0">

                                                <h1 className="text-large font-medium mt-2">Lê Văn Bảy</h1>
                                                <h1 className="text-large font-medium mt-2"><strong>Email:</strong> baychobochay@example.com</h1>
                                                <h1 className="text-large font-medium mt-2"><strong>Phone:</strong> (+000) 782 321 589</h1>
                                                <h1 className="text-large font-medium mt-2"><strong>Social media:   </strong>

                                                    <Link href="https://www.facebook.com/hunglecarat17" color="foreground">Facebook</Link>

                                                </h1>

                                            </div>

                                        </div>




                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div style={{
                        width: "80%",
                        color: 'black',
                    }} >

                        <Textarea
                            label={<span style={{ color: 'rgb(3 26 11)', fontWeight: 'bold' }}>Note</span>}
                            variant="bordered"
                            placeholder="Enter your Note"
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
        </div>
    );
}

const leftStyles: CSSProperties = {
    width: '100%',

    maxWidth: '1100px',
    marginLeft: '0px',
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
    color: 'black',
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

