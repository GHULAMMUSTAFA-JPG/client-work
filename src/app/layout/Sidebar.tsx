"use client";
import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';

interface SidebarProps {
  menuItems: { label: string; href: string; icon?: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  return (
    <div className={`d-flex flex-column bg-light sidebar`} style={{ width: '250px', height: '100vh' }}>
      <div className="p-4 border-bottom">
        <h4 className="text-center">My App</h4>
      </div>
      <ul className="nav flex-column p-2">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link href={item.href} className="nav-link d-flex align-items-center text-dark">
              {item.icon && <i className={`${item.icon} me-2`}></i>}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
