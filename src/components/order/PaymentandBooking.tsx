// PaymentandBooking.tsx
'use client'
import React, { CSSProperties } from 'react';
import { RadioGroup, Radio, cn, RadioProps } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

interface CustomRadioProps extends RadioProps {
    children: React.ReactNode;
}

export const CustomRadio = (props: CustomRadioProps) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "bg-gray-200", // Default background color
                    "hover:bg-gray-300", // Background on hover
                    "data-[selected=true]:bg-blue-300", // Background color when selected
                    "data-[selected=true]:border-black-800" // Border color when selected
                ),
            }}
        >
            {children}
        </Radio>
    );
};

export default function PaymentandBooking() {
    return (
        <div style={rightStyles}>
            <div style={sidebarStyles}>
                <h2 style={headerStyles}>Payment Method</h2>

                {/* Payment method options */}
                <RadioGroup label="Please choose your payment method" description="Selected plan can be changed at any time.">
                    <CustomRadio description="Online banking" value="paying-in-advanced">
                        Paying in advanced
                    </CustomRadio>
                    <CustomRadio description="On cash" value="pay-later">
                        Pay later
                    </CustomRadio>
                    <CustomRadio description="Online banking" value="deposit">
                        Deposit
                    </CustomRadio>
                </RadioGroup>

                <div className="flex flex-wrap gap-4 items-center">

                    <Button color="primary" variant="ghost">
                        Booking
                    </Button>

                </div>
            </div>
        </div>


    );
}


const rightStyles: CSSProperties = {
    width: '100%',
    maxWidth: '820px',
    marginRight: '0px',
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
    color: 'black',

}
const sidebarStyles: CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    position: 'fixed',
    top: '90px',
    right: '30px',
};

const headerStyles: CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'black',
    textAlign: 'center',
};
