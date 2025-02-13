"use client";

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Header from "@/app/layout/Header";
import Footer from "@/app/layout/Footer";
import Sidebar from "@/app/layout/Sidebar";
import withAuth from "@/utils/withAuth";
import Loader from "./loader";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const Main = ({ children, isAuthenticated, user }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("Auth status:", isAuthenticated);
    console.log("User data:", user);
    console.log("Current path:", pathname);

    if (isAuthenticated && user?.isBuyer) {
      if (pathname !== "/stripe" && pathname !== "/thankyou") {
        if (
          !user.subscription_status?.has_active_subscription &&
          user.subscription_status?.requires_payment
        ) {
          console.log("Redirecting to stripe...");
          router.push("/stripe");
        }
      }
    }
  }, [isAuthenticated, user, router, pathname]);

  // useEffect(() => {
  //   if(isAuthenticated && user?.isBuyer){
  //     if(pathname=="/DiscoverCreator" || pathname=="/homepage" || pathname=="/campaigns" || pathname=="/creatordashboard" || pathname=="Profile"){
  //       router.push("/")
  //     }
  //   }
  //   else if(isAuthenticated && user.isBuyer==false){
  //     if (pathname=="/homepagebuyer" || pathname="/mycreatorsbuyer" || pathname=="/buyerdashboard" ||pathname=="/companypage"){
  //       router.push("/")
  //     }
  //   }

  // }, [])

  const creatorMenuItems = [
    { label: "Dashboard", href: "/homepage", icon: "bi bi-house-door" },
    {
      label: "Discover",
      href: "/DiscoverCreator",
      icon: "bi bi-globe-americas",
    },
    { label: "Brands", href: "/discover-brands", icon: "bi bi-shop" },
    { label: "Campaigns", href: "/campaigns", icon: "bi bi-megaphone" },
    { label: "My Company", href: "/creatordashboard", icon: "bi bi-buildings" },
    { label: "Messages", href: "/inbox", icon: "bi bi-chat-left-text" },
    { label: "Profile", href: "/Profile", icon: "bi bi-person-circle" },
    { label: "Analytics", href: "/analytics", icon: "bi bi-bar-chart-line" },
  ];

  const buyerMenuItems = [
    { label: "Dashboard", href: "/homepagebuyer", icon: "bi bi-house-door" },
    { label: "Discover", href: "/mycreatorsbuyer", icon: "bi bi-people" },
    { label: "Campaigns", href: "/buyerdashboard", icon: "bi bi-megaphone" },
    { label: "Messages", href: "/inbox", icon: "bi bi-chat-left-text" },
    { label: "Company Page", href: "/companypage", icon: "bi bi-buildings" },
    { label: "Analytics", href: "/analytics", icon: "bi bi-bar-chart-line" },
  ];

  // Determine which menu items to show based on role
  const menuItems = !user?.isBuyer ? creatorMenuItems : buyerMenuItems;

  // Pages where we don't want to show sidebar and header
  const excludedPaths = ["/", "/stripe", "/login"];
  const shouldShowLayout = !excludedPaths.includes(pathname);

  return (
    <>
      {isAuthenticated && shouldShowLayout ? (
        <div className="d-flex">
          <Sidebar menuItems={menuItems} />
          <div className="flex-grow-1 overflow-auto">
            <Header />
            {/* <Loader /> */}
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
