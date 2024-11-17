import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/components/nextuiProvider";
import React from "react";
import "./globals.css";

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
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>

      </body>
    </html>
  );
}