"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css';
import Image from "next/image";

interface SidebarProps {
  menuItems: { label: string; href: string; icon?: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const [isActive, setIsActive] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div 
        className="offcanvas-lg offcanvas-start" 
        tabIndex={-1} 
        id="offcanvasResponsive" 
        aria-labelledby="offcanvasResponsiveLabel"
      >
        <div className="offcanvas-body">
          <button type="button" className="btn-close text-white float-end d-lg-none" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
          <div 
            className={`sidebar ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <a className="navbar-brand" href="#">
              <Image
                src="/assets/images/synnc-logo.svg"
                alt="logo"
                width={100}
                height={30}
                className="img-fluid p-3 ps-0"
              />
            </a>
            <ul className="nav">
              {menuItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link
                    onClick={() => { setIsActive(index) }}
                    href={item.href}
                    className={`nav-link d-flex align-items-center ${isActive == index ? 'active' : ''}`}
                  >
                    {item.icon && <i className={`${item.icon}`}></i>}
                    {isExpanded && <span className="nav-label">{item.label}</span>}
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
