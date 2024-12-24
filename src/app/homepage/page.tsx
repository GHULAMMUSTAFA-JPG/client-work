"use client";

import { fetch_dashboard_data } from "@/@api";
import Topcard from "@/components/topcard";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import ChartsDashboard from "@/components/chartsdashboard";
import BarsDashboard from "@/components/barsdasboard";
import ProgressDashboard from "@/components/progressdashboard";
import VerticalBarChart from "@/components/verticalbarchart";
import Calendar from "@/components/Calendar";
import PostCalendar from "@/components/Calendar";
import EditProfileModal from "@/components/EditProfileModal";
import { useAuth } from "@/contexts/AuthContext";
function Homepage() {
    const { user, setUserProfile, userProfile } = useAuth()
    const [users, setUsers] = useState<any[]>([]);
    // const router = useRouter()
    useEffect(() => {
        fetchData()

    }, [])


    const fetchData = async () => {
        const response = await fetch_dashboard_data()
        console.log(response.data, "response")
        setUsers(response.data?.users)
    }

    return (
        <>
            <div className="container-fluid">
                {/* <div className="row mb-3 mt-3">
                    <div className="col-md-4 ms-auto">
                        <div className="card bg-primary-subtle">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-3">
                                    <Icon icon="ph:lightbulb" width={32} height={32} className='text-primary' />
                                    <p className="mb-0 fw-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row mt-3">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <p className='mb-0 fs-16 fw-medium'>Profile</p>
                                    <p className='mb-0 fs-12 fw-medium ms-auto cursor' data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit Profile</p>
                                    <Icon icon="ri:edit-line" width="16" height="16" className='cursor ms-1' />
                                </div>
                                <div className='d-flex gap-2 mb-3'>
                                    <Image
                                        src={userProfile?.Profile_Image}
                                        className="border object-fit-cover rounded-circle flex-shrink-0"
                                        alt="logo"
                                        width={40}
                                        height={40}
                                    />
                                    <div className='flex-grow-1'>
                                        <div className='d-flex align-items-center'>
                                            <p className='mb-0 fw-medium fs-16'>{userProfile?.Name}</p>
                                            <Icon icon="emojione:flag-for-united-states" width={16} height={16} className='ms-2' />
                                            <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-2' />
                                        </div>
                                        <div className="d-flex gap-2 align-items-center">
                                            <p className='mb-0 fs-12 text-warning'>{userProfile?.Email}</p>
                                            <div className="bg-light rounded-circle d-inline-block" style={{ width: '6px', height: '6px' }}></div>
                                            <p className='mb-0 fs-12 text-warning'><span className="text-dark fw-medium">{userProfile?.No_of_Followers} </span> followers</p>
                                            <div className="bg-light rounded-circle d-inline-block" style={{ width: '6px', height: '6px' }}></div>
                                            <p className='mb-0 fs-12 text-warning'>Post Activity <span className="text-dark fw-medium">Daily</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex gap-2 flex-wrap mb-3'>
                                    {userProfile?.Skills?.map((element: any, index: number) => {
                                        return (
                                            <span key={index} className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">{element}</span>
                                        )
                                    })}

                                </div>
                                <p className='mb-0 fs-12 text-warning'>{userProfile?.Description}</p>

                                <div className="row my-3 text-center">
                                    <div className="col-md-4 border-end">
                                        <p className='mb-0 fs-14 p-height'>Average Engagaements per post</p>
                                        <p className='mb-0 fs-20 fw-medium'>{userProfile?.Average_Engagements}</p>
                                    </div>
                                    <div className="col-md-4 border-end pe-4">
                                        <p className='mb-0 fs-14 p-height'>Average Impressions per post</p>
                                        <p className='mb-0 fs-20 fw-medium'>{userProfile?.Average_Impressions}</p>
                                    </div>
                                    <div className="col-md-4 pe-5">
                                        <p className='mb-0 fs-14 p-height'>S-Score</p>
                                        <p className='mb-0 fs-20 fw-medium'>{userProfile?.['S-Score']}</p>
                                    </div>
                                </div>
                                <div className="bg-campaigns mt-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <p className='mb-0 fs-16 fw-medium'>My Campaigns</p>
                                        <p className='mb-0 fs-12 fw-medium ms-auto cursor'>Campaigns</p>
                                        <Icon icon="ri:arrow-right-line" width="16" height="16" className='cursor ms-1' />
                                    </div>
                                    <div className="card mb-2">
                                        <div className="card-body py-2 ps-2 pe-3">
                                            <div className='d-flex gap-3 align-items-center'>
                                                <Image
                                                    src="/assets/images/apollo.png"
                                                    className="border object-fit-cover rounded flex-shrink-0"
                                                    alt="logo"
                                                    width={32}
                                                    height={32}
                                                />
                                                <p className='mb-0 fw-medium'>Apollo: Join our Creator Program</p>
                                                <p className='mb-0 fs-12 text-warning ms-auto'>Live Until Feb 08, 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-2">
                                        <div className="card-body py-2 ps-2 pe-3">
                                            <div className='d-flex gap-3 align-items-center'>
                                                <Image
                                                    src="/assets/images/avacast.png"
                                                    className="border object-fit-cover rounded flex-shrink-0"
                                                    alt="logo"
                                                    width={32}
                                                    height={32}
                                                />
                                                <p className='mb-0 fw-medium'>Acast: General Application</p>
                                                <p className='mb-0 fs-12 text-warning ms-auto'>Live Until Feb 08, 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-2">
                                        <div className="card-body py-2 ps-2 pe-3">
                                            <div className='d-flex gap-3 align-items-center'>
                                                <Image
                                                    src="/assets/images/avoma.png"
                                                    className="border object-fit-cover rounded flex-shrink-0"
                                                    alt="logo"
                                                    width={32}
                                                    height={32}
                                                />
                                                <p className='mb-0 fw-medium'>Avoma - Growth Acceleration Platform</p>
                                                <p className='mb-0 fs-12 text-warning ms-auto'>Live Until Feb 08, 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-2">
                                        <div className="card-body py-2 ps-2 pe-3">
                                            <div className='d-flex gap-3 align-items-center'>
                                                <Image
                                                    src="/assets/images/avacast.png"
                                                    className="border object-fit-cover rounded flex-shrink-0"
                                                    alt="logo"
                                                    width={32}
                                                    height={32}
                                                />
                                                <p className='mb-0 fw-medium'>Acast: General Application</p>
                                                <p className='mb-0 fs-12 text-warning ms-auto'>Live Until Feb 08, 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-2">
                                        <div className="card-body py-2 ps-2 pe-3">
                                            <div className='d-flex gap-3 align-items-center'>
                                                <Image
                                                    src="/assets/images/apollo.png"
                                                    className="border object-fit-cover rounded flex-shrink-0"
                                                    alt="logo"
                                                    width={32}
                                                    height={32}
                                                />
                                                <p className='mb-0 fw-medium'>Apollo: Join our Creator Program</p>
                                                <p className='mb-0 fs-12 text-warning ms-auto'>Live Until Feb 08, 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body py-2 ps-2 pe-3">
                                            <div className='d-flex gap-3 align-items-center'>
                                                <Image
                                                    src="/assets/images/apollo.png"
                                                    className="border object-fit-cover rounded flex-shrink-0"
                                                    alt="logo"
                                                    width={32}
                                                    height={32}
                                                />
                                                <p className='mb-0 fw-medium'>Apollo: Join our Creator Program</p>
                                                <p className='mb-0 fs-12 text-warning ms-auto'>Live Until Feb 08, 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <p className='mb-0 fs-16 fw-medium'>Upcoming Posts</p>
                                <PostCalendar />
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                <p className='mb-2 fs-16 fw-medium'>Notifications</p>
                                <div className='d-flex gap-2 mb-3'>
                                    <Image
                                        src="/assets/images/user.jpg"
                                        className="border object-fit-cover rounded-circle flex-shrink-0"
                                        alt="logo"
                                        width={40}
                                        height={40}
                                    />
                                    <div className='flex-grow-1'>
                                        <p className='mb-0 fw-medium'>Campaign Accepted</p>
                                        <p className='mb-0 fs-12 text-warning'>Your Content has been accepted</p>
                                    </div>
                                </div>
                                <hr className='my-3 text-warning' />
                                <div className='d-flex gap-2 mb-3'>
                                    <Image
                                        src="/assets/images/user.jpg"
                                        className="border object-fit-cover rounded-circle flex-shrink-0"
                                        alt="logo"
                                        width={40}
                                        height={40}
                                    />
                                    <div className='flex-grow-1'>
                                        <p className='mb-0 fw-medium'>Campaign Accepted</p>
                                        <p className='mb-0 fs-12 text-warning'>Your Content has been accepted</p>
                                    </div>
                                </div>
                                <hr className='my-3 text-warning' />
                                <div className='d-flex gap-2'>
                                    <Image
                                        src="/assets/images/user.jpg"
                                        className="border object-fit-cover rounded-circle flex-shrink-0"
                                        alt="logo"
                                        width={40}
                                        height={40}
                                    />
                                    <div className='flex-grow-1'>
                                        <p className='mb-0 fw-medium'>Campaign Accepted</p>
                                        <p className='mb-0 fs-12 text-warning'>Your Content has been accepted</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <p className='mb-2 fs-16 fw-medium'>Payments</p>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <p className='mb-0 fs-12'>Total Sync Earnings</p>
                                    <p className='mb-0 fw-medium fs-16'>$30k</p>
                                </div>
                                <hr className='my-2 text-warning' />
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <p className='mb-0 fs-12'>Payement Incoming for Campaign</p>
                                    <i className="bi bi-check-circle-fill text-primary ms-2"></i>
                                </div>
                                <hr className='my-2 text-warning' />
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <p className='mb-0 fs-12'>Payement Sent</p>
                                    <i className="bi bi-check-circle-fill text-primary ms-2"></i>
                                </div>
                                <hr className='my-2 text-warning' />
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0 fs-12'>Payement Incoming for Campaign</p>
                                    <i className="bi bi-check-circle-fill text-primary ms-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Topcard /> */}

                {/* <div className="row graphs g-3">
                    <div className="col-md-6">
                        <ChartsDashboard />
                    </div>
                    <div className="col-md-6">
                        <BarsDashboard />
                    </div>
                    <div className="col-md-6">
                        <VerticalBarChart />
                    </div>
                    <div className="col-md-6">
                        <ProgressDashboard />
                    </div>
                </div> */}
            </div>
            <EditProfileModal />
        </>
    );
}

export default withAuth(Homepage)