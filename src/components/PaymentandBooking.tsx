// PaymentandBooking.tsx
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
                    "bg-gray-700", // Default background color
                    "hover:bg-gray-600", // Background on hover
                    "data-[selected=true]:bg-green-800", // Background color when selected
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


    );
}

const sidebarStyles: CSSProperties = {
    width: '400px',
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
