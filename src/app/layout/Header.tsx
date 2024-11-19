"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";


export default function Header() {
    const router = useRouter(); // Initialize router without condition
    const pathname = usePathname(); // Initialize pathname without condition
    const [user, setUser] = useState<any>()

    useEffect(() => {
        setUser(localStorage.getItem("user"))

    }, [])
    const navigateToSignIn = () => {
        localStorage.removeItem("user")
        router.push('/login');
    };

    return (
        <>
            <header className="navbar-section">
                <nav className="navbar navbar-expand-lg bg-white">
                    <div className="container">
                        <Icon icon="ic:round-menu" width={24} height={24} />
                        <button
                            className="navbar-toggler bg-primary"
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
                            {/* <form className="d-flex" role="search">
                                {(pathname !== '/' && pathname !== '/login') && (
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        type="button" // Ensure button type is 'button'
                                        onClick={navigateToSignIn}
                                    >
                                        {user?"Sign Out":"Sign In"}
                                    </button>
                                )} */}
                            {/* Register button if needed */}
                            {/* </form> */}
                            <Icon icon="mingcute:notification-line" width={24} height={24}  className="text-warning" />
                            <Icon icon="mdi:message-outline" width={21} height={21} className="ms-3 text-warning"/>
                            <div className="dropdown ms-2">
                                <a className="btn bg-transparent dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="d-flex align-items-center">
                                        <Image src="/assets/images/user.jpg" alt="user" width={32} height={32} className="user-img" />
                                        <p className="mb-0 ms-2">Mark Phillips</p>
                                        <Icon icon="prime:chevron-down" className="ms-2" width={20} height={20} />
                                    </div>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">
                                        Update Profile
                                    </a>
                                    </li>
                                    <li><a className="dropdown-item" href="#">
                                        <form className="d-flex" role="search">
                                            {(pathname !== '/' && pathname !== '/login') && (
                                                <p
                                                    className="mb-0"
                                                    onClick={navigateToSignIn}
                                                >
                                                    {user ? "Sign Out" : "Sign In"}
                                                </p>
                                            )}
                                        </form>

                                    </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
