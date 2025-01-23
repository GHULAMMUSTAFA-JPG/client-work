"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import 'bootstrap/dist/css/bootstrap.css';
import Image from "next/image";
import { useAuth } from '@/contexts/AuthContext';
interface SidebarProps {
  menuItems: { label: string; href: string; icon?: string }[];
}
 
const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const {user} = useAuth()
  const [isActive, setIsActive] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(()=>{
      if(window){
        
          if(window.location.pathname == "/campaigns"){
            setIsActive(2)
          }
          else if(window.location.pathname=="/SubmitCampaigns" || window.location.pathname == "/buyerdashboard"){
            setIsActive(2)
          }
          else if(window.location.pathname=="/inbox"){
            user?.isBuyer ?   setIsActive(3) : setIsActive(4)
          }
      }  

  },[window.location.pathname])


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
