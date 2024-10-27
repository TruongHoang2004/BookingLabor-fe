"use client"
import React, { useState } from 'react';

export default function TaskerRating() {
    const [rating, setRating] = useState(0); // Đánh giá mặc định là 0

    const handleClick = (index: number) => {
        setRating(index + 1); // Cập nhật đánh giá khi người dùng ấn vào ngôi sao
    };

    return (
        <div
            style={{
                width: '250px',
                padding: '15px',
                margin: '20px auto',
                background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif',
                marginLeft: '630px'

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
    );
}
