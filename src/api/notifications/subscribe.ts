/*
// pages/api/notifications/subscribe.ts
import api from '@/service/config';
import { Observer } from '@reduxjs/toolkit';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Chỉ xử lý phương thức GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Chuyển tiếp yêu cầu tới NestJS server
    const response = await api.get<Observer[]>('/notifications/subscribe');

    if (!response.body) {
      res.status(500).end('No response body');
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    // Hàm để đọc và truyền tiếp dữ liệu từ NestJS tới client
    const stream = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          break;
        }
        const chunk = decoder.decode(value);
        res.write(`data: ${chunk}\n\n`);
      }
    };

    // Bắt đầu stream dữ liệu
    stream();
  } catch (error) {
    console.error('Error in SSE proxy:', error);
    res.status(500).end('Internal Server Error');
  }

  // Đảm bảo kết nối được giữ mở
  req.on('close', () => {
    console.log('Client disconnected');
    res.end();
  });
}
*/
