import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import React from "react";
import "./globals.css";
import { ReduxProvider } from "@/redux/reduxProvider";
import { Toaster } from "react-hot-toast";

const layout_font = Montserrat({
  weight: ['400', '500', '700', '600', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "DreamLabour",
  description: "Tinh ban dieu ki",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">
      <body className={`${layout_font.className} antialiased`}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
                fontFamily: 'var(--font-geist-sans)',
              },
              success: {
                style: {
                  background: '#4aed88',
                  color: '#000',
                },
              },
              error: {
                style: {
                  background: '#ff4444',
                  color: '#fff',
                },
              },
            }}
          />
        </ReduxProvider>
      </body>
    </html>

  );
}