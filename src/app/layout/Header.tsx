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
        router.push('/login');
    };

    return (
        <>
            <header className="navbar-section">
                <nav className="navbar navbar-expand-lg bg-dark">
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
                            <div className="dropdown">
                                <a className="btn bg-transparent dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <Icon icon="ion:settings" className="text-primary fs-4" />
                                </a>
                                <ul className="dropdown-menu bg-black">
                                    <li><a className="dropdown-item" href="#">
                                        <button
                                            className="btn btn-sm btn-outline-primary w-100"
                                            type="button" // Ensure button type is 'button'
                                            // onClick={navigateToSignIn}
                                        >
                                            Update Profile
                                        </button>
                                    </a>
                                    </li>
                                    <li><a className="dropdown-item" href="#">
                                        <form className="d-flex" role="search">
                                            {(pathname !== '/' && pathname !== '/login') && (
                                                <button
                                                    className="btn btn-sm btn-outline-primary w-100"
                                                    type="button" // Ensure button type is 'button'
                                                    onClick={navigateToSignIn}
                                                >
                                                    {user ? "Sign Out" : "Sign In"}
                                                </button>
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
