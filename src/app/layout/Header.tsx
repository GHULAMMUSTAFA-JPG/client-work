"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/contexts/AuthContext";
import { fetchBuyersData, fetchProfileData } from "@/@api";
import Loader from "@/components/loader";
import { defaultImagePath } from "@/components/constants";

export default function Header() {
    const pathname = usePathname(); // Initialize pathname without condition
    const [users, setUser] = useState<any>()
    const { user, logout, userProfile, setUserProfile, rendControl, isLoading } = useAuth()

    useEffect(() => {
        setUser(localStorage.getItem("user"))
    }, [])
    const navigateToSignIn = () => {
        logout()
    };

    useEffect(() => {

        if (user?.email) {
            !user?.isBuyer ? fetchProfileData(user?.email, setUserProfile) : fetchBuyersData(setUserProfile, user?.email)
        }

    }, [user, rendControl])

    return (
        <>
            {isLoading && <Loader />}
            <header className="navbar-section">
                <nav className="navbar bg-white">
                    <div className="container-fluid">
                        <Icon icon="ic:round-menu" width={24} height={24} type="button" className="d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive" />
                        <a className="navbar-brand" href="#">
                            <Image
                                src="/assets/images/synnc-logo.svg"
                                alt="logo"
                                width={80}
                                height={30}
                                className="img-fluid ps-3 ps-lg-0 mb-2 mb-lg-0"
                            />
                        </a>
                        {/* <Icon icon="ic:round-menu" width={24} height={24} type="button" className="d-none d-lg-block" /> */}
                        {/* <h5 className='mb-0 ms-3'>{pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1)}</h5> */}
                        {/* <button
                            className="navbar-toggler bg-primary"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            Navigation items here
                        </ul> */}
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
                        <div className="dropdown ms-auto">
                            <a className="btn bg-transparent dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Icon icon="mingcute:notification-line" width={24} height={24} className="text-warning" />
                            </a>
                            <ul className="dropdown-menu pt-0">
                                <li className="activated-subtle dropdown-header py-2 mb-2 sticky-top d-flex justify-content-between">
                                    <span className="text-dark">Notifications</span>
                                    {/* <a href="#" className="text-muted fs-12 text-decoration-none">View All</a> */}
                                </li>
                                <li><a className="dropdown-item" href="#">
                                    <div className='d-flex gap-2'>
                                        <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                                            <Icon icon="line-md:check-all" width="20" height="20" className="text-primary" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <p className='mb-0 fw-medium fs-12'>Campaign Accepted</p>
                                            <p className='mb-0 fs-10 text-warning'>Your Content has been accepted</p>
                                        </div>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className='d-flex gap-2'>
                                        <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                                            <Icon icon="pepicons-pencil:exclamation" width="22" height="22" className="text-danger" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <p className='mb-0 fw-medium fs-12'>Campaign Rejected</p>
                                            <p className='mb-0 fs-10 text-warning'>Your Content has been rejected</p>
                                        </div>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className='d-flex gap-2'>
                                        <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                                            <Icon icon="ci:add-plus" width="22" height="22" className="text-info" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <p className='mb-0 fw-medium fs-12'>Campaign Applied</p>
                                            <p className='mb-0 fs-10 text-warning'>Your Content has been applied</p>
                                        </div>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className='d-flex gap-2'>
                                        <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                                            <Icon icon="teenyicons:send-up-solid" width="16" height="16" className="text-primary" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <p className='mb-0 fw-medium fs-12'>Campaign Submitted</p>
                                            <p className='mb-0 fs-10 text-warning'>Your Content has been submitted</p>
                                        </div>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className='d-flex gap-2'>
                                        <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                                            <Icon icon="pepicons-pencil:exclamation" width="22" height="22" className="text-danger" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <p className='mb-0 fw-medium fs-12'>Campaign Rejected</p>
                                            <p className='mb-0 fs-10 text-warning'>Your Content has been rejected</p>
                                        </div>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className='d-flex gap-2'>
                                        <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                                            <Icon icon="line-md:check-all" width="20" height="20" className="text-primary" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <p className='mb-0 fw-medium fs-12'>Campaign Accepted</p>
                                            <p className='mb-0 fs-10 text-warning'>Your Content has been accepted</p>
                                        </div>
                                    </div>
                                </a></li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <a className="btn bg-transparent dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Icon icon="mdi:message-outline" width={21} height={21} className="text-warning" />
                            </a>
                            <ul className="dropdown-menu pt-0">
                                <li className="activated-subtle dropdown-header mb-2 py-2 sticky-top d-flex justify-content-between">
                                    <span className="text-dark">Messages</span>
                                    <a href="#" className="text-muted fs-12 text-decoration-none">View All</a>
                                </li>
                                <li><a className="dropdown-item" href="#">
                                    <div className="d-flex align-items-center hover-bg-light cursor-pointer">
                                        <Image
                                            src="/assets/images/user2.jpg"
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-circle me-2"
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0 fs-12">Sarah Yeary</h6>
                                            <small className="text-muted fs-10">Hey Awais, how are you?</small>
                                        </div>
                                        <small className="text-muted fs-10">1mo</small>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className="d-flex align-items-center hover-bg-light cursor-pointer">
                                        <Image
                                            src="/assets/images/user2.jpg"
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-circle me-2"
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0 fs-12">Sarah Yeary</h6>
                                            <small className="text-muted fs-10">Hey Awais, how are you?</small>
                                        </div>
                                        <small className="text-muted fs-10">1mo</small>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className="d-flex align-items-center hover-bg-light cursor-pointer">
                                        <Image
                                            src="/assets/images/user2.jpg"
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-circle me-2"
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0 fs-12">Sarah Yeary</h6>
                                            <small className="text-muted fs-10">Hey Awais, how are you?</small>
                                        </div>
                                        <small className="text-muted fs-10">1mo</small>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className="d-flex align-items-center hover-bg-light cursor-pointer">
                                        <Image
                                            src="/assets/images/user2.jpg"
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-circle me-2"
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0 fs-12">Sarah Yeary</h6>
                                            <small className="text-muted fs-10">Hey Awais, how are you?</small>
                                        </div>
                                        <small className="text-muted fs-10">1mo</small>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className="d-flex align-items-center hover-bg-light cursor-pointer">
                                        <Image
                                            src="/assets/images/user2.jpg"
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-circle me-2"
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0 fs-12">Sarah Yeary</h6>
                                            <small className="text-muted fs-10">Hey Awais, how are you?</small>
                                        </div>
                                        <small className="text-muted fs-10">1mo</small>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className="d-flex align-items-center hover-bg-light cursor-pointer">
                                        <Image
                                            src="/assets/images/user2.jpg"
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-circle me-2"
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0 fs-12">Sarah Yeary</h6>
                                            <small className="text-muted fs-10">Hey Awais, how are you?</small>
                                        </div>
                                        <small className="text-muted fs-10">1mo</small>
                                    </div>
                                </a></li>
                                <hr className='my-2 text-warning' />
                                <li><a className="dropdown-item" href="#">
                                    <div className="d-flex align-items-center hover-bg-light cursor-pointer">
                                        <Image
                                            src="/assets/images/user2.jpg"
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-circle me-2"
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0 fs-12">Sarah Yeary</h6>
                                            <small className="text-muted fs-10">Hey Awais, how are you?</small>
                                        </div>
                                        <small className="text-muted fs-10">1mo</small>
                                    </div>
                                </a></li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <a className="btn bg-transparent dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="d-flex align-items-center">
                                    {(userProfile?.Profile_Image || userProfile?.Company_Logo) ? <Image src={userProfile?.Profile_Image || userProfile?.Company_Logo} alt="user" width={32} height={32} className="user-img" /> : <img src={defaultImagePath} width={32} height={32} />}
                                    <p className="mb-0 ms-2">{userProfile?.Name}</p>
                                    <Icon icon="prime:chevron-down" className="ms-2" width={20} height={20} />
                                </div>
                            </a>

                            <ul className="dropdown-menu sign-out-menu">
                                {/* <li><a className="dropdown-item" href="#">
                                    Update Profile
                                </a>
                                </li> */}
                                <li><a className="dropdown-item" href="#" onClick={navigateToSignIn}>
                                    <form className="d-flex" role="search">
                                        {/* {(pathname !== '/' && pathname !== '/login') && ( */}
                                        <p
                                            className="mb-0"
                                        >
                                            Sign Out
                                        </p>

                                    </form>

                                </a>
                                </li>
                            </ul>
                        </div>
                        {/* </div> */}
                    </div>
                </nav>
            </header>
        </>
    );
}
