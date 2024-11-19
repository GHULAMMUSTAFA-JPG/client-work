"use client";
import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

interface SidebarProps {
  menuItems: { label: string; href: string; icon?: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  return (
    <div className={`d-flex flex-column sidebar`}>
      <a className="navbar-brand" href="#">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={100}
          height={30}
          className="img-fluid"
        />
      </a>
      <ul className="nav flex-column">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            {/* add active class in below link tag  */}
            <Link href={item.href} className="nav-link d-flex align-items-center">
              {item.icon && <i className={`${item.icon} me-3`}></i>}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
