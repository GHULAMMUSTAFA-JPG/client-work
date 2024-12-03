"use client";

import React from 'react'
import { ToastContainer } from 'react-toastify';
import Header from "@/app/layout/Header"
import Footer from "@/app/layout/Footer"
import Sidebar from '@/app/layout/Sidebar';
import withAuth from '@/utils/withAuth';


const Main = ({
  children, isAuthenticated, user
}: any) => {


  const creatorMenuItems = [
    { label: "Dashboard", href: "/homepage", icon: "bi bi-house" },
    { label: "Discover", href: "/DiscoverCreator", icon: "bi bi-briefcase" },
    { label: "Campaigns", href: "/campaigns", icon: "bi bi-briefcase" },
    { label: "My Company", href: "/creatordashboard", icon: "bi bi-building" },
    { label: "Analytics", href: "/analytics", icon: "bi bi-bar-chart" },
  ];

  const buyerMenuItems = [
    { label: "Dashboard", href: "/homepagebuyer", icon: "bi bi-house" },
    { label: "Campaigns", href: "/buyerdashboard", icon: "bi bi-briefcase" },
    { label: "My Company", href: "/mycreatorsbuyer", icon: "bi bi-building" },
    { label: "Active Compaigns", href: "/active-campaigns", icon: "bi bi-megaphone" },
    // { label: "Analytics", href: "/analyticsbuyer", icon: "bi bi-bar-chart" },

  ];

  // Determine which menu items to show based on role
  const menuItems =
    !user?.isBuyer ? creatorMenuItems : buyerMenuItems;

    return (
      <>
        {isAuthenticated ? (
          <div className="d-flex">
            <Sidebar menuItems={menuItems} />
            <div className="flex-grow-1">
              <Header />
              <main className="main-content">{children}</main>
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
