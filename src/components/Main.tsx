"use client";

import React from 'react'
import { ToastContainer } from 'react-toastify';
import Header from "@/app/layout/Header"
import Footer from "@/app/layout/Footer"
import Sidebar from '@/app/layout/Sidebar';
import withAuth from '@/utils/withAuth';

const menuItems = [
  { label: "Home", href: "/homepage", icon: "bi bi-house" },
  { label: "Creater Dashboard", href: "/creatordashboard", icon: "bi bi-speedometer2" },
  { label: "Buyer Dashboard", href: "/buyerdashboard", icon: "bi bi-person" },
//   { label: "Logout", href: "/settings", icon: "bi bi-gear" },
];

const Main = ({
  children, isAuthenticated
}: any) => {
  return (
    <>
      {isAuthenticated ? (
        <div className="d-flex">
          <Sidebar menuItems={menuItems} />
          <div className="flex-grow-1">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
};

export default withAuth(Main);
