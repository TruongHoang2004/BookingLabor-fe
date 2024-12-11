// PaymentandBooking.tsx
"use client";
import React, { CSSProperties, useState } from 'react';
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/link";



export default function RatingandReviewTasker() {
    const [rating, setRating] = useState(0); // Đánh giá mặc định là 0

    const handleClick = (index: number) => {
        setRating(index + 1); // Cập nhật đánh giá khi người dùng ấn vào ngôi sao
    };
    return (
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
                    lineHeight: '24px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    background: '#e5e7eb',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '12px',
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
                    <img
                        src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.19.png"
                        alt="Tasker"
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
                <p style={{ margin: '5px 0', color: 'black', }}><strong>Social media:  </strong>
                    <Link href="https://www.facebook.com/hunglecarat17" style={{ color: 'blue' }} color="foreground">Facebook</Link></p>
            </div>

            <div
                style={{
                    width: '300px',
                    padding: '15px',
                    margin: '20px auto',
                    background: '#e5e7eb',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    marginRight: '30px',
                    color: 'black',

                }}
            >
                <h3 style={{
                    marginBottom: '10px',
                    color: 'black',
                    fontSize: '15px',
                    fontWeight: 300,
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
                    lineHeight: '24px'
                }}>Your rating: {rating} {rating > 0 ? 'star' : ''}</p>


            </div>
            <div className="flex flex-wrap gap-4 items-center">

                <Button color="primary" variant="ghost">
                    Confirm
                </Button>

            </div>

        </div>


    );
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
    justifyContent: 'center',
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
