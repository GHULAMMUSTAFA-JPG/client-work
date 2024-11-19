"use client";

import React from 'react'
import { ToastContainer } from 'react-toastify';
import Header from "@/app/layout/Header"
import Footer from "@/app/layout/Footer"
import Sidebar from '@/app/layout/Sidebar';
import withAuth from '@/utils/withAuth';

const menuItems = [
  { label: "Dashboard", href: "/creatordashboard", icon: "bi bi-house" },
  { label: "Campaigns", href: "/campaigns", icon: "bi bi-briefcase" },
  { label: "Discover", href: "/discover", icon: "bi bi-kanban" },
  { label: "My Company", href: "/mycompany", icon: "bi bi-building" },
  { label: "Analytics", href: "/analytics", icon: "bi bi-bar-chart" },
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
            <main className='main-content'>{children}</main>
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
