"use client"
import { useEffect } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css';
import { metadata } from '@/config/metadata';
import "../styles/style-global.scss";
import 'bootstrap-icons/font/bootstrap-icons.css'
import Head from 'next/head';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children
}: RootLayoutProps) {

  useEffect(() => {
    if(typeof document !== undefined){
      import('bootstrap/dist/js/bootstrap.bundle.min.js')
      AOS.init();
    }
  }, [])

  return (    
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <Header />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}
