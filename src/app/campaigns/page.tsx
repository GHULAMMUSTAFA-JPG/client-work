"use client"
import { getCampaignsCreatorsOverview, login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';
import CampaignOffcanvas from '@/components/campaignoffcanvas';
import { useRouter } from 'next/navigation';
import CampaignFilterModal from '@/components/campaignfiltermodal';
import { defaultImagePath } from '@/components/constants';

import { useAuth } from '@/contexts/AuthContext';
function Campaigns() {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<any>()
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
    const { user, setIsLoading } = useAuth()
    const handleRowClick = (e: any) => {
        router.push(`/SubmitCampaigns?id=${e.target.id}`);
    };

    useEffect(() => {
        user?.email && getCampaignsCreatorsOverview(user?.email, setCampaigns, setIsLoading)
    }, [user])



    return (
        <>
            <section className='dashboard'>
                <div className='container-fluid'>
                    {/* <TopCard /> */}
                    <div className='row my-3'>
                        <div className='col-12'>
                            {/* <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All Compaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Accepted Campaigns</button>
                                </li>
                            </ul> */}
                            {/* <hr /> */}
                            <div className='row'>
                                <div className='col-12 mb-2'>
                                    <div className="tab-content " id="myTabContent">
                                        <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="true" aria-controls="flush-collapseThree">
                                                            Active Campaigns ({campaigns?.Activated_Campaigns?.length || 0})
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseThree" className="accordion-collapse show" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">
                                                            {/* <table className="table align-middle table-hover">
                                                                <tbody>
                                                                    {campaigns?.Activated_Campaigns?.map((camp: any, index: number) => {
                                                                        return (

                                                                            <tr key={index} onClick={()=>{
                                                                                setSelectedCampaign(camp)
                                                                            }}>
                                                                                <td>
                                                                                    <p className='mb-0'>{camp?.Created_At}</p>
                                                                                    <p className='fs-12 text-warning mb-0'>{camp?.Time_Ago}</p>
                                                                                </td>
                                                                                <td>
                                                                                    <a id={(camp?._id)} onClick={handleRowClick} className='fw-medium cursor'>{camp?.Headline}</a>
                                                                                </td>

                                                                                <td>
                                                                                    <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                    }

                                                                </tbody>
                                                            </table> */}
                                                            <div className='row g-3 mb-3'>
                                                                {
                                                                    campaigns?.Activated_Campaigns?.map((campaign: any, index: number) => {
                                                                        return (
                                                                            <div key={index} className='col-md-4'>
                                                                                <div className='card card-hover h-100'>
                                                                                    <div className='card-body d-flex flex-column'>
                                                                                        <div className='d-flex gap-2 mb-4'>
                                                                                            <Image
                                                                                                src={campaign?.Company_Logo || defaultImagePath}
                                                                                                className="border object-fit-cover rounded-circle flex-shrink-0"
                                                                                                alt="logo"
                                                                                                width={40}
                                                                                                height={40}
                                                                                            />
                                                                                            <div>
                                                                                                <p className='fw-medium mb-0 fs-16'>{campaign?.Headline?.slice(0, 100)}</p>

                                                                                                <div className='d-flex align-items-center'>

                                                                                                    <p className='fs-12 text-warning mb-0'>{campaign?.Created_At}</p>
                                                                                                    <div className="vr mx-2"></div>

                                                                                                    <p className='fs-12 text-warning mb-0'>{campaign?.Time_Ago}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            {/* <p className='mb-0 text-warning'>{campaign?.Company_Name}</p> */}
                                                                                            <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-auto' />
                                                                                            <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-1' />
                                                                                            {/* <div className='applied-btn-container ms-auto'> */}
                                                                                            {/* <button className='btn btn-outline-info btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                        setSelectedCampaign(campaign)
                                                    }}>Detail</button> */}
                                                                                            {/* <button className='btn btn-info ms-2 btn-sm' data-bs-toggle="modal" data-bs-target="#applyModal"
                                                            onClick={() => {
                                                                setSelectedCampaign(campaign)
                                                            }}
                                                            disabled={campaign?.Is_Applied}
                                                        >{campaign?.Is_Applied ? "Applied" : "Apply"}</button> */}

                                                                                            {/* </div> */}
                                                                                        </div>
                                                                                        <div className='d-flex gap-2 mb-4 align-items-center'>
                                                                                            <Icon icon="solar:eye-broken" width="18" height="18" className='text-gray flex-shrink-0' />
                                                                                            <p className='mb-0'>{campaign?.Target_Audience?.length > 100 ? campaign?.Target_Audience?.slice(0, 100) + "..." : campaign?.Target_Audience}</p>
                                                                                        </div>
                                                                                        <div className='d-flex gap-3 justify-content-end'>

                                                                                            <button className='btn btn-outline-dark' id={(campaign?._id)} onClick={handleRowClick}>Manage Submissions</button>
                                                                                            <button className='btn btn-dark' key={index} onClick={() => {
                                                                                                setSelectedCampaign(campaign)
                                                                                            }} data-bs-toggle="modal" data-bs-target="#exampleModal">Detail</button>
                                                                                        </div>
                                                                                        {/* <div className='d-flex gap-2 mb-3'>
                                                    <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray flex-shrink-0 mt-1' />
                                                    <p className='mb-0'>{campaign?.Campaign_Required_Channels?.length > 100 ? campaign?.Campaign_Required_Channels?.slice(0,100) + "...": campaign?.Campaign_Required_Channels}</p>
                                                </div> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                            Submitted Campaigns ({campaigns?.Submitted_Campaigns?.length || 0})
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">
                                                            {/* <table className="table align-middle table-hover">
                                                                <tbody>
                                                                    {
                                                                        campaigns?.Submitted_Campaigns?.map((camp: any, index: number) => {
                                                                            return (
                                                                                <tr onClick={() => {
                                                                                    setSelectedCampaign(camp)
                                                                                }} key={index}
                                                                                    className='cursor'>
                                                                                    <td>
                                                                                        <p className='mb-0'>{camp?.Created_At}</p>
                                                                                        <p className='fs-12 text-warning mb-0'>{camp?.Time_Ago}</p>
                                                                                    </td>
                                                                                    <td>
                                                                                        <a className='fw-medium'>{camp?.Headline}</a>
                                                                                    </td>

                                                                                    <td>
                                                                                        <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                                                                    </td>
                                                                                </tr>
                                                                            )

                                                                        })
                                                                    }


                                                                </tbody>
                                                            </table> */}
                                                            <div className='row g-3 mb-3'>
                                                                {
                                                                    campaigns?.Submitted_Campaigns?.map((campaign: any, index: number) => {
                                                                        return (
                                                                            <div key={index} className='col-md-4'>
                                                                                <div className='card card-hover h-100'>
                                                                                    <div className='card-body d-flex flex-column'>
                                                                                        <div className='d-flex gap-2 mb-4'>
                                                                                            <Image
                                                                                                src={campaign?.Company_Logo || defaultImagePath}
                                                                                                className="border object-fit-cover rounded-circle flex-shrink-0"
                                                                                                alt="logo"
                                                                                                width={40}
                                                                                                height={40}
                                                                                            />
                                                                                            <div>
                                                                                                <p className='fw-medium mb-0 fs-16'>{campaign?.Headline?.slice(0, 100)}</p>
                                                                                                <div className='d-flex align-items-center'>

                                                                                                    <p className='fs-12 text-warning mb-0'>{campaign?.Created_At}</p>
                                                                                                    <div className="vr mx-2"></div>

                                                                                                    <p className='fs-12 text-warning mb-0'>{campaign?.Time_Ago}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            {/* <p className='mb-0 text-warning'>{campaign?.Company_Name}</p> */}
                                                                                            <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-auto' />
                                                                                            <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-1' />
                                                                                            {/* <div className='applied-btn-container ms-auto'> */}
                                                                                            {/* <button className='btn btn-outline-info btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                        setSelectedCampaign(campaign)
                                                    }}>Detail</button> */}
                                                                                            {/* <button className='btn btn-info ms-2 btn-sm' data-bs-toggle="modal" data-bs-target="#applyModal"
                                                            onClick={() => {
                                                                setSelectedCampaign(campaign)
                                                            }}
                                                            disabled={campaign?.Is_Applied}
                                                        >{campaign?.Is_Applied ? "Applied" : "Apply"}</button> */}

                                                                                            {/* </div> */}
                                                                                        </div>
                                                                                        <div className='d-flex gap-2 mb-4 align-items-center'>
                                                                                            <Icon icon="solar:eye-broken" width="18" height="18" className='text-gray flex-shrink-0' />
                                                                                            <p className='mb-0'>{campaign?.Target_Audience?.length > 100 ? campaign?.Target_Audience?.slice(0, 100) + "..." : campaign?.Target_Audience}</p>
                                                                                        </div>
                                                                                        <div className='d-flex gap-3 justify-content-end'>

                                                                                            {/* <button className='btn btn-outline-dark' id={(campaign?._id)} onClick={handleRowClick}>Manage Submissions</button> */}
                                                                                            <button className='btn btn-dark' key={index} onClick={() => {
                                                                                                setSelectedCampaign(campaign)
                                                                                            }} data-bs-toggle="modal" data-bs-target="#exampleModal">Detail</button>
                                                                                        </div>
                                                                                        {/* <div className='d-flex gap-2 mb-3'>
                                                    <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray flex-shrink-0 mt-1' />
                                                    <p className='mb-0'>{campaign?.Campaign_Required_Channels?.length > 100 ? campaign?.Campaign_Required_Channels?.slice(0,100) + "...": campaign?.Campaign_Required_Channels}</p>
                                                </div> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
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
                    </div>
                </div>
            </section >
            <CampaignOffcanvas />
            <CampaignFilterModal selectedCampaign={selectedCampaign} />
        </>
    );
}

export default Campaigns