"use client"
import { AuthProvider } from "@/contexts/AuthContext"; // Import the provider
import { useEffect } from 'react';
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/style-global.scss";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from '@/components/Main';

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({
  children
}: RootLayoutProps) {

  useEffect(() => {
    if (typeof document !== undefined) {
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
      AOS.init();
    }
  }, []);

  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <AuthProvider> {/* Wrap with AuthProvider */}
          <Main>{children}</Main>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

export default RootLayout;
