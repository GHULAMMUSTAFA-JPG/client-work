"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import "bootstrap/dist/css/bootstrap.css";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
interface SidebarProps {
  menuItems: { label: string; href: string; icon?: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const { user, isActive, setIsActive } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  // console.log("isActive", isActive);
  // console.log("menuItems", menuItems);
  useEffect(() => {
    // console.log("path changed useeffect calles");

    if (!user?.isBuyer) {
      if (window.location.pathname == "/homepage") {
        setIsActive(0);
      } else if (window.location.pathname == "/DiscoverCreator") {
        setIsActive(1);
      } else if (window.location.pathname == "/discover-brands") {
        setIsActive(2);
      } else if (window.location.pathname == "/campaigns") {
        setIsActive(3);
      } else if (window.location.pathname == "/creatordashboard") {
        setIsActive(4);
      } else if (window.location.pathname == "/inbox") {
        setIsActive(5);
      } else if (window.location.pathname == "/Profile") {
        setIsActive(6);
      } else if (window.location.pathname == "/analytics") {
        setIsActive(7);
      } else {
        console.log("sdsd");
      }
    } else if (user.isBuyer) {
      if (window.location.pathname == "/homepagebuyer") {
        setIsActive(0);
      } else if (window.location.pathname == "/mycreatorsbuyer") {
        setIsActive(1);
      } else if (window.location.pathname == "/campaign-details") {
        setIsActive(2);
      } else if (window.location.pathname == "/inbox") {
        setIsActive(3);
      } else if (window.location.pathname == "/companypage") {
        setIsActive(4);
      } else if (window.location.pathname == "/analytics") {
        setIsActive(5);
      } else {
        console.log("sdksj");
      }
    }
  }, [window.location.pathname, isActive]);

  return (
    <>
      <div
        className="offcanvas-lg offcanvas-start"
        tabIndex={-1}
        id="offcanvasResponsive"
        aria-labelledby="offcanvasResponsiveLabel"
      >
        <div className="offcanvas-body">
          <button
            type="button"
            className="btn-close text-white float-end d-lg-none"
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasResponsive"
            aria-label="Close"
          ></button>
          <div
            className={`sidebar ${isExpanded ? "expanded" : ""}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <ul className="nav">
              {menuItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link
                    onClick={() => {
                      // console.log("index", index);
                      setIsActive(index);
                    }}
                    href={item.href}
                    className={`nav-link d-flex align-items-center ${
                      isActive == index ? "active" : ""
                    }`}
                  >
                    {item.icon && <i className={`${item.icon}`}></i>}
                    {isExpanded && (
                      <span className="nav-label">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
