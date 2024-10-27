"use client"
import { withRouter } from 'next/router';
import React, { useState } from 'react';

export default function TaskerReview() {
    const [review, setReview] = useState<string>(''); // State để lưu đánh giá

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.target.value); // Cập nhật giá trị khi người dùng nhập vào textbox
    };

    return (
        <div
            style={{
                padding: '10px 15px',
                background: 'linear-gradient(to right, #c1dfc4,#deecdd)',
                borderRadius: '8px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                width: '605px',
                height: '180px', // Thay đổi chiều cao thành auto để phù hợp với nội dung
                margin: '0 auto',
                marginTop: '15px',
                marginLeft: '460px',
            }}
        >
            <h2
                style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '10px',
                }}
            >
                Tasker Review
            </h2>


            {/* Textbox cho review */}
            <textarea
                value={review}
                onChange={handleChange}
                placeholder="Write your review here..."
                style={{
                    width: '100%',
                    height: '100px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    padding: '10px',
                    marginTop: '10px',
                    resize: 'none',
                    background: 'white',
                    color: '#333', // Màu chữ cho text area
                    fontSize: '14px', // Kích thước chữ
                    fontFamily: 'Arial, sans-serif', // Font chữ
                }}
            />
        </div>
    );
}
