"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/contexts/AuthContext";
import { conversationHistory, fetchBuyersData, fetchProfileData } from "@/@api";
import Loader from "@/components/loader";
import { defaultImagePath } from "@/components/constants";

export default function Header() {
    const router = useRouter()
    const pathname = usePathname(); // Initialize pathname without condition
    const [users, setUser] = useState<any>()
    const {setSockets, user, logout, userProfile, setUserProfile, rendControl, isLoading, setIsLoading, notifications, setNotifications, setConversations } = useAuth()
    const [conversationList, setConversationList] = useState<any>()
    
    const [socket, setSocket] = useState<any>()
    useEffect(() => {
        setUser(localStorage.getItem("user"))
    }, [])
    const navigateToSignIn = () => {
        logout()
    };

    useEffect(() => {
        if (user?.email) {
            // getHistoryOfUser();
            !user?.isBuyer ? fetchProfileData(user?.email, setUserProfile) : fetchBuyersData(setUserProfile, user?.email)
        }
    }, [user, rendControl])

    useEffect(() => {
        if (userProfile?._id) {
            const ws = new WebSocket(`wss://synncapi.onrender.com/ws/message/${userProfile._id}`);
            setSocket(ws)
            setSockets(ws)
            ws.onopen = () => {
                const data: any = {
                    "notification": true,
                    "recipient_id": userProfile?._id
                }
                ws.send(JSON.stringify(data))
                if (user?.email) {
                    const dtoForHistory: any = {
                        "email": user?.email
                    }
                    ws.send(JSON.stringify(dtoForHistory))
                }
            };

            ws.onmessage = (event) => {
                const message = event.data;
                const response = JSON.parse(message);
                console.log(response,"ws response")
                if (response?.notifications) {
                    setNotifications(response)
                }
                else if (response?.conversations) {
                    setConversationList(response)
                    setConversations(response)
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            ws.onclose = () => {
                console.log("WebSocket connection closed");
            };

            setSocket(ws);

            return () => {
                ws.close();
            };
        }
    }, [userProfile]);

    // const getHistoryOfUser = async () => {
    //     const response = await conversationHistory(user?.email, setConversationList, 1, 6, setIsLoading)
    // }

    // useEffect(() => {
    //     if (user?.email && socket && socket.readyState === WebSocket.OPEN) {
    //         const dtoForHistory: any = {
    //             "email": user?.email
    //         }
    //         socket.send(JSON.stringify(dtoForHistory))
    //     }
    // }, [socket, user])


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
                                {
                                    notifications?.notifications && notifications?.notifications?.length !== 0 ? notifications?.notifications?.map((notify: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                <li><a className="dropdown-item">
                                                    <div className='d-flex gap-2'>
                                                        <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                                                            {notify?.Notification_Icon_Type == "new_campaign_application" && <Icon icon="line-md:check-all" width="20" height="20" className="text-primary" />}
                                                            {notify?.Notification_Icon_Type == "campaign_application_accepted" && <Icon icon="pepicons-pencil:exclamation" width="22" height="22" className="text-danger" />}
                                                            {notify?.Notification_Icon_Type == "campaign_post_rejected" && <Icon icon="teenyicons:send-up-solid" width="16" height="16" className="text-primary" />}
                                                            {notify?.Notification_Icon_Type == "campaign_post_approved" && <Icon icon="ci:add-plus" width="22" height="22" className="text-info" />}
                                                            {notify?.Notification_Icon_Type == "campaign_post_submission" && <Icon icon="ci:add-plus" width="22" height="22" className="text-info" />}

                                                        </div>
                                                        <div className='flex-grow-1'>
                                                            <p className='mb-0 fw-medium fs-12'>{notify?.Title}</p>
                                                            <p className='mb-0 fs-10 text-warning'>{notify?.Message}</p>
                                                        </div>
                                                    </div>
                                                </a></li>

                                                <hr className='my-2 text-warning' />
                                            </div>
                                        )
                                    })
                                        :
                                        <div className=" mb-2 mt-2 text-center" >
                                            <small >No new Notifications </small>
                                        </div>
                                }

                            </ul>
                        </div>
                        <div className="dropdown">
                            <a className="btn bg-transparent dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Icon icon="mdi:message-outline" width={21} height={21} className="text-warning" />
                            </a>
                            <ul className="dropdown-menu pt-0">
                                <li className="activated-subtle dropdown-header mb-2 py-2 sticky-top d-flex justify-content-between">
                                    <span className="text-dark">Messages</span>
                                    <a href="#" className="text-muted fs-12 text-decoration-none" onClick={() => {
                                        router.push('/inbox')
                                    }}>View All</a>
                                </li>
                                {
                                    conversationList?.conversations?.map((conversation: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                <li onClick={() => {
                                                    router.push(`/inbox?id=${conversation?.Last_Message?.Recipient_ID}`)
                                                }}>
                                                    <a className="dropdown-item" >
                                                        <div className="d-flex align-items-center hover-bg-light cursor-pointer">
                                                            <Image
                                                                src={conversation?.Profile_Image || defaultImagePath}
                                                                alt="Profile"
                                                                width={32}
                                                                height={32}
                                                                className="rounded-circle me-2"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-0 fs-12">{conversation?.Name}</h6>
                                                                <small className="text-muted fs-10">{conversation?.Last_Message?.Message}</small>
                                                            </div>
                                                            <small className="text-muted fs-10">{conversation?.Last_Message?.Time_Ago}</small>
                                                        </div>
                                                    </a></li>
                                                <hr className='my-2 text-warning' />

                                            </div>
                                        )
                                    })
                                }



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
