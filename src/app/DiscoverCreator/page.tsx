"use client"
import { getDiscoverCampaigns, getDiscoverCampaignsForFilters, getDiscoverCampaignsForSearch, login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';
import CampaignOffcanvas from '@/components/campaignoffcanvas';
import CampaignFilterModal from '@/components/campaignfiltermodal';
import ApplyModal from '@/components/ApplyModal';
import { useAuth } from '@/contexts/AuthContext';
import { defaultImagePath } from '@/components/constants';


function DiscoverCreator() {
    const [searchText, setSearchText] = useState<string>('')
    const [campaignData, setCampaignData] = useState<any>()
    const { setIsLoading, user } = useAuth()
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
    useEffect(() => {
        getDiscoverCampaigns(setCampaignData, setIsLoading, user?.email)
    }, [])

    const searchCampaign = () => {
        getDiscoverCampaignsForSearch(searchText, setCampaignData, setIsLoading)
    }

    const filterCampaignCall = (e: any) => {
        getDiscoverCampaignsForFilters(e, setCampaignData, setIsLoading)
    }

    return (
        <>
            <section className='dashboard'>
                <div className='container-fluid'>
                    <div className='row my-3'>
                        <div className='col-12'>
                            <div className='d-flex align-items-center justify-content-between mb-3'>
                                <div className="position-relative w-25">
                                    <input type="text" onChange={(e: any) => {
                                        setSearchText(e?.target?.value)
                                    }} className="form-control custom-input" id="exampleFormControlInput1" placeholder="Search for Campaigns" onKeyDown={(e: any) => {
                                        e.key == "Enter" && searchCampaign()
                                    }} />
                                    <Icon icon="ph:magnifying-glass" width={16} height={16} className='text-secondary position-absolute top-50 start-0 translate-middle-y ms-3' />
                                    {/* <Icon icon="ph:x" width={20} height={20} className='text-secondary position-absolute top-50 end-0 translate-middle-y me-3 cursor' /> */}
                                    {/* <Icon icon="akar-icons:settings-vertical" width={20} height={20} className='text-primary position-absolute top-50 end-0 translate-middle-y me-3 cursor' data-bs-toggle="modal" data-bs-target="#exampleModal" /> */}
                                </div>
                                <select className="form-select custom-select" onChange={(e: any) => {
                                    filterCampaignCall(e.target.value)
                                }} aria-label="Small select example">
                                    {/* <option selected value="popular">Most Popular</option> */}
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                                {/* <button className='btn btn-primary rounded-pill d-flex align-items-center' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <Icon icon="akar-icons:settings-vertical" width={20} height={20} />
                                    <span className='ms-2'>Advanced Filters</span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div className='row g-2 mb-3'>
                        {
                            campaignData?.map((campaign: any, index: number) => {
                                return (
                                    <div key={index} className='col-md-4'>
                                        <div className='card card-hover h-100'>
                                            <div className='card-body d-flex flex-column'>
                                                <div className='d-flex gap-2 mb-4 align-items-center'>
                                                    <Image
                                                        src={campaign?.Company_Logo || defaultImagePath}
                                                        className="border object-fit-cover rounded-circle flex-shrink-0"
                                                        alt="logo"
                                                        width={40}
                                                        height={40}
                                                    />
                                                    <p className='fw-medium mb-0 fs-16'>{campaign?.Headline?.slice(0, 100)}</p>
                                                    {/* <p className='mb-0 text-warning'>{campaign?.Company_Name}</p> */}
                                                    <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-2' />
                                                    <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-1' />
                                                    <div className='applied-btn-container ms-auto'>
                                                        {/* <button className='btn btn-outline-info btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                        setSelectedCampaign(campaign)
                                                    }}>Detail</button> */}
                                                        {/* <button className='btn btn-info ms-2 btn-sm' data-bs-toggle="modal" data-bs-target="#applyModal"
                                                            onClick={() => {
                                                                setSelectedCampaign(campaign)
                                                            }}
                                                            disabled={campaign?.Is_Applied}
                                                        >{campaign?.Is_Applied ? "Applied" : "Apply"}</button> */}
                                                        <button className='btn btn-dark ms-2 btn-sm w-s' data-bs-toggle="modal" data-bs-target="#applyModal"
                                                            onClick={() => {
                                                                setSelectedCampaign(campaign)
                                                            }} 
                                                        >Learn more</button>
                                                    </div>
                                                </div>
                                                <div className='d-flex gap-2 mb-2 align-items-center'>
                                                    <Icon icon="solar:eye-broken" width="18" height="18" className='text-gray flex-shrink-0' />
                                                    <p className='mb-0'>{campaign?.Target_Audience?.length > 100 ? campaign?.Target_Audience?.slice(0, 100) + "..." : campaign?.Target_Audience}</p>
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
            </section >
            <CampaignOffcanvas />
            <CampaignFilterModal selectedCampaign={selectedCampaign} />
            <ApplyModal selectedCampaign={selectedCampaign} />
        </>
    );
}

export default DiscoverCreator