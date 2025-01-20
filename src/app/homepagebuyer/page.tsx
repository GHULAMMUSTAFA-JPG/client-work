"use client";

import { fetch_dashboard_data, fetchBuyerActiveCampaigns, fetchBuyersData } from "@/@api";
import TopCardBuyer from "@/components/TopCardBuyer";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import ChartsDashboard from "@/components/chartsdashboard";
import BarsDashboard from "@/components/barsdasboard";
import ProgressDashboardBuyer from "@/components/progressdashboardbuyer";
import VerticalBarChart from "@/components/verticalbarchart";
import CardsDashboardBuyer from "@/components/cardsdashboardbuyer";
import PostCalendar from "@/components/Calendar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';
import EditProfileModalBuyer from "@/components/EditProfileModalBuyer";


function homepagebuyer() {
    const { user, setIsLoading } = useAuth()
    const [rendControl, setRendControl] = useState<boolean>(false)
    const [users, setUsers] = useState<any[]>([]);
    const [userData, setUserData] = useState<any>()
    const [activeCampaigns, setActiveCampaigns] = useState<any>()
    const [viewRow, showViewRow] = useState<number>(6)
    const router = useRouter()
    useEffect(() => {

        fetchData()

    }, [rendControl])

    useEffect(() => {
        if (user?.email) {

            fetchBuyerActiveCampaigns(user?.email, setActiveCampaigns, setIsLoading)
            fetchBuyersData(setUserData, user?.email, setIsLoading)
        }
    }, [user?.email, rendControl])

    const fetchData = async () => {
        const response: any = await fetch_dashboard_data(setIsLoading)
        setUsers(response.data?.users)
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-7">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className='d-flex align-items-center justify-content-between gap-5'>
                                    <div>
                                        <h3 className='fw-medium'>Welcome Back, <span className='fw-bold'>{userData?.Company_Name && userData?.Company_Name?.slice(0,20) + "...."}</span></h3>
                                        {/* <p className='mb-0 fw-medium fs-20'>Apollo: Join our Creator Program</p> */}
                                        <p className='mb-0 fs-14 text-muted'>{userData?.Company_Description && userData?.Company_Description?.slice(0,200)+ '....'}</p>
                                    </div>
                                    <div>
                                        <div className="align-items-center cursor d-flex gap-2 justify-content-end mb-3 ms-auto rounded text-white" data-bs-toggle="modal" data-bs-target="#editProfileModal" style={{ width: '25px', height: '25px' }}>
                                            {/* <p className='mb-0 fs-12 fw-medium ms-auto'>Edit Profile</p> */}
                                            <Icon icon="mage:edit" width="20" height="20" className='cursor flex-shrink-0 text-dark' />
                                        </div>
                                        {userData?.Company_Logo && userData?.Company_Logo !== "" ?
                                            <Image
                                                src={userData?.Company_Logo}
                                                className="border object-fit-cover rounded flex-shrink-0"
                                                alt="logo"
                                                width={120}
                                                height={120}
                                            />
                                            :
                                            <div className="discussion-subtle border object-fit-cover rounded d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                                                <span className="fs-40 fw-medium text-uppercase"> {(userData?.Company_Name && userData?.Company_Name! == "") ? userData?.Company_Name?.slice(0, 2) : userData?.Email && userData?.Email !== "" ? userData?.Email?.slice(0, 2) : "NA"}</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card h-100">
                            <div className="card-body py-2">
                                <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Weekly</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Monthly</button>
                                    </li>
                                    {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">Draft Campaigns</button>
                                </li> */}
                                    <li className='nav-item' role="presentation">
                                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Quarterly</button>
                                    </li>
                                </ul>
                                {/* <hr className="" /> */}
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className="tab-content " id="myTabContent">
                                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                                <div className="row mb-3 mt-2 text-center">
                                                    <div className="col-md-6 border-end">
                                                        <p className='mb-2 fs-16'>Posts Analytics</p>
                                                        <p className='mb-0 fs-20 fw-medium'>30</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='mb-2 fs-16'>Impressions Analytics</p>
                                                        <p className='mb-0 fs-20 fw-medium'>40k</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                                <div className="row mb-3 mt-2 text-center">
                                                    <div className="col-md-6 border-end">
                                                        <p className='mb-2 fs-16'>Posts Analytics</p>
                                                        <p className='mb-0 fs-20 fw-medium'>50</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='mb-2 fs-16'>Impressions Analytics</p>
                                                        <p className='mb-0 fs-20 fw-medium'>80k</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex={0}>
                                                <div className="row mb-3 mt-2 text-center">
                                                    <div className="col-md-6 border-end">
                                                        <p className='mb-2 fs-16'>Posts Analytics</p>
                                                        <p className='mb-0 fs-20 fw-medium'>70</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='mb-2 fs-16'>Impressions Analytics</p>
                                                        <p className='mb-0 fs-20 fw-medium'>120k</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-8">
                        <div className="card card-with-table">
                            <div className="card-header p-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0 fw-medium fs-16">Campaigns</p>
                                  {activeCampaigns?.campaigns && activeCampaigns?.campaigns?.length > viewRow && <button className='btn btn-info btn-sm' onClick={()=>{
                                        showViewRow(activeCampaigns?.campaigns?.length)
                                    }}>View All</button>}
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive campaign-listing-table">
                                    <table className="table align-middle text-center mb-0 table-hover">
                                        <thead>
                                            <tr> 
                                                <th scope="col" className="text-start ps-4">Campaigns <span className='text-muted fs-12'>({activeCampaigns?.campaigns?.length || 0})</span></th>
                                                <th scope="col">Activated Creators</th>
                                                <th scope="col">New Applications</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                activeCampaigns?.campaigns?.length !== 0 ? activeCampaigns?.campaigns?.map((campaign: any, index: number) => {
                                                    if (index < viewRow) {
                                                        return (
                                                            <tr key={index} onClick={() => {
                                                                router.push(`/buyerdashboard?id=${campaign?._id}`);
                                                            }}>
                                                                <td className='text-start'>
                                                                    {/* <div className="d-flex align-items-center">
                                                                 <Image src="/assets/images/user1.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                                  <div className="ms-2 text-start">
                                                                  <p className="mb-0">Billi Ellish</p>
                                                                      <p className="fs-12 text-muted mb-0">Nov 20, 2024</p>
                                                                    </div>
                                                                   </div> */}
                                                                    <a href='#' className='fw-medium text-dark fs-16'>{campaign?.Headline}</a>
                                                                    <div className='d-flex align-items-center mt-1'>
                                                                        <p className='fs-12 text-warning mb-0'>{campaign?.Created_At}</p>
                                                                        <div className="vr mx-2"></div>
                                                                        <p className='fs-12 text-warning mb-0'>{campaign?.Time_Ago}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p className="mb-0">{campaign?.Creator_Insights?.Activated}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="mb-0">{campaign?.Creator_Insights?.To_Contact}</p>
                                                                </td>
                                                                <td>
                                                                    <Icon icon="ion:arrow-up-right-box-outline" width={24} height={24} className='text-warning cursor' />
                                                                </td>
                                                            </tr>
                                                        )
                                                    }

                                                })
                                                    :
                                                    <tr>
                                                        <td colSpan={4} style={{ textAlign: 'center' }}>
                                                            No Campaign Found
                                                        </td>
                                                    </tr>}


                                        </tbody>
                                    </table>
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
                                <p className='mb-2 fs-16 fw-medium'>Activity Feed</p>
                                <div className='d-flex gap-2 mb-3'>
                                    <Image
                                        src="/assets/images/user.jpg"
                                        className="border object-fit-cover rounded-circle flex-shrink-0"
                                        alt="logo"
                                        width={40}
                                        height={40}
                                    />
                                    <div className='flex-grow-1'>
                                        <p className='mb-0 fw-medium'>Campaign Created</p>
                                        <p className='mb-0 fs-12 text-warning line-clamp-1'>Your Campaign has been Created Successfully</p>
                                    </div>
                                    <p className='mb-0 fs-12 text-muted ms-auto flex-shrink-0'>8 Days ago</p>
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
                                        <p className='mb-0 fs-12 text-warning line-clamp-1'>Your Content has been accepted</p>
                                    </div>
                                    <p className='mb-0 fs-12 text-muted ms-auto flex-shrink-0'>8 Days ago</p>
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
                                        <p className='mb-0 fs-12 text-warning line-clamp-1'>Your Content has been accepted</p>
                                    </div>
                                    <p className='mb-0 fs-12 text-muted ms-auto flex-shrink-0'>8 Days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <TopCardBuyer /> */}
                {/* <div className="row graphs g-3">
                    <div className="col-md-6">
                        <BarsDashboard />
                    </div>
                    <div className="col-md-6">
                        <ProgressDashboardBuyer />
                    </div>
                </div>
                <div className="row my-3">
                    <CardsDashboardBuyer />
                </div> */}
            </div>
            <EditProfileModalBuyer user={user} userProfile={userData} setRendControl={setRendControl} rendControl={rendControl} />
        </>
    );
}

export default homepagebuyer