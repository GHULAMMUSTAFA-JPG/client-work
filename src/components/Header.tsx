"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter(); // Initialize router without condition
    const pathname = usePathname(); // Initialize pathname without condition
    const [user,setUser] = useState<any>()

    useEffect(()=>{
       setUser(localStorage.getItem("user"))

    },[])
    const navigateToSignIn = () => {
        router.push('/login');
    };

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-white">
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <Image
                                src="/assets/images/logo.png"
                                alt="logo"
                                width={100}
                                height={30}
                                className="img-fluid"
                            />
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {/* Navigation items here */}
                            </ul>
                            <form className="d-flex" role="search">
                                {(pathname !== '/' && pathname !== '/login') && (
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        type="button" // Ensure button type is 'button'
                                        onClick={navigateToSignIn}
                                    >
                                        {user?"Sign Out":"Sign In"}
                                    </button>
                                )}
                                {/* Register button if needed */}
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
