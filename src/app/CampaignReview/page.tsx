"use client"

import React, { useEffect } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from 'next/image'
import { useState } from 'react'
import ActivatedCreators from './ActivatedCreators'
import {  changeCreatorStatus } from '@/@api'
import { defaultImagePath } from '@/components/constants'
function CampaignOverview({ setCampaigns, selectedCampaignDetails, rendControl, setRendControl }: any) {
    const [creatorStatus, setCreatorStatus] = useState({
        'Adam Biddlecombe': 'Activated',
        'Josh Aharonoff': 'Not Fit'
    });
    const [showActivatedCreators, setShowActivatedCreators] = useState(false);
    const handleStatusChange = (creatorName: string, newStatus: string) => {
        setCreatorStatus(prev => ({
            ...prev,
            [creatorName]: newStatus
        }));
    };
    const [totalLenght, setTotalLenght] = useState<number>(0)
    const [selectedStatus, setSelectedStatus] = useState<string>('')
    function getTotalElements(dynamicObject: any) {
        let total = 0;
        for (let key in dynamicObject) {
            if (Array.isArray(dynamicObject[key])) {
                total += dynamicObject[key].length;
            }
        }
        console.log(total,"total")
        setTotalLenght(total);
    }




    useEffect(() => {
        selectedCampaignDetails?.campaign && getTotalElements(selectedCampaignDetails?.campaign?.Campaign_Progress)

    }, [selectedCampaignDetails])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Activated':
                return 'text-activated activated-subtle';
            case 'In_Discussion':
                return 'text-discussion discussion-subtle';
            case 'Contacted':
                return 'text-contacted contacted-subtle';
            case 'Not_Fit':
                return 'text-danger not-fit-subtle';
            case 'To_Contact':
                return 'text-to-contact to-contact-subtle';
            default:
                return 'text-dark base';     
        }
    };
    const [isOpen, setIsOpen] = useState(true); 

    const handleItemClick = (status: any,array_item:any) => {
        console.log(array_item,status,selectedCampaignDetails)
        changeCreatorStatus({
            creator_id: array_item?._id,
            campaign_id : selectedCampaignDetails?.campaign?._id,
            status : status
        }, setRendControl, rendControl)
        setSelectedStatus(status);
        // setIsOpen(false); 
    };
    const [selectedTab, setSelectedTab] = useState<"All" | "Applicants" | "Activated" | "In_Discussion" | "Contacted" | "To_Connect" | "Not_Fit">("All")
    return (
        <>
            {showActivatedCreators ? (
                <ActivatedCreators setShowActivatedCreators={setShowActivatedCreators} selectedCampaign={selectedCampaignDetails} />
            ) : (
                <section className='dashboard campaign-review'>
                    <div className='container-fluid'>
                        <div className='d-flex align-items-center justify-content-between my-3'>
                            <a style={{ cursor: 'pointer' }} onClick={() => setCampaigns(true)} className='text-dark text-decoration-none d-flex align-items-center'>
                                <Icon icon="akar-icons:arrow-left" width={18} height={18} />
                                <span className='ms-2' >All Campaigns</span>
                            </a>
                        </div>
                        <div className='card mb-3'>
                            <div className='card-body'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <div className='d-flex align-items-center gap-3 mb-1'>
                                            <h5 className='mb-0'>{selectedCampaignDetails?.campaign?.Headline}</h5>
                                            <button className='bg-primary-subtle border-0 btn btn-outline-primary btn-sm py-1 px-2 rounded-pill'>{selectedCampaignDetails?.campaign?.Is_Public ? "Public" : "Private"}</button>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <p className='fs-12 text-warning mb-0'>{selectedCampaignDetails?.campaign?.Created_At}</p>
                                            <div className="vr mx-2 vr-public"></div>
                                            <p className='fs-12 text-warning mb-0'>{selectedCampaignDetails?.campaign?.Time_Ago}</p>
                                            <div className="vr mx-2 vr-public"></div>
                                            <span>Budget: <span className='fw-medium'>${selectedCampaignDetails?.campaign?.Budget}</span></span>
                                            {/* <span className='me-3'>Public</span>     */}
                                            {/* <div className='form-check form-switch mb-0'>
                            <input className='form-check-input' type='checkbox' id='publicSwitch' checked />
                        </div> */}
                                        </div>
                                    </div>
                                    <button className='btn btn-outline-dark fs-12 btn-sm ms-3' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">
                                        Edit Campaign <Icon icon="ri:settings-4-line" width={16} height={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <div className='row'>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                <div className='d-flex align-items-center mb-3'>
                                    <div className='rounded-circle bg-circle bg-circle1 p-2 me-2'>
                                        <Icon icon="mdi:eye-outline" width={20} height={20} className="text-white" />
                                    </div>
                                    <p className='mb-0 text-muted text-start'>Impressions</p>
                                </div>
                                <h5>10</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                <div className='d-flex align-items-center mb-3'>
                                    <div className='rounded-circle bg-circle bg-circle2 p-2 me-2'>
                                        <Icon icon="mdi:file-document-outline" width={20} height={20} className="text-white" />
                                    </div>
                                    <p className='mb-0 text-muted text-start'>New Applications</p>
                                </div>
                                <h5>0</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                <div className='d-flex align-items-center mb-3'>
                                    <div className='rounded-circle bg-circle bg-circle3 p-2 me-2'>
                                        <Icon icon="mdi:account-check-outline" width={20} height={20} className="text-white" />
                                    </div>
                                    <p className='mb-0 text-muted text-start'>Activated Creators</p>
                                </div>
                                <h5>1</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                <div className='d-flex align-items-center mb-3'>
                                    <div className='rounded-circle bg-circle bg-circle4 p-2 me-2'>
                                        <Icon icon="mdi:currency-usd" width={20} height={20} className="text-white" />
                                    </div>
                                    <p className='mb-0 text-muted text-start'>Total Spend</p>
                                </div>
                                <h5>$10</h5>
                            </div>
                        </div>
                    </div>
                </div> */}
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <div className='rounded-circle bg-circle bg-circle1 p-2 me-2'>
                                                <Icon icon="mdi:trending-up" width={20} height={20} className="text-white" />
                                            </div>
                                        </div>
                                        <p className='mb-2 text-muted'>Impressions</p>
                                        <div className='d-flex align-items-baseline'>
                                            <h4 className='mb-0 me-2 fs-20'>0</h4>
                                            {/* <span className='text-muted small'>this month</span> */}
                                        </div>
                                        {/* <div className='text-primary mt-2'>+12.5%</div> */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <div className='rounded-circle bg-circle bg-circle2 p-2 me-2'>
                                                <Icon icon="mdi:account-outline" width={20} height={20} className="text-white" />
                                            </div>
                                        </div>
                                        <p className='mb-2 text-muted'>New Applications</p>
                                        <div className='d-flex align-items-baseline'>
                                            <h4 className='mb-0 me-2 fs-20'>{selectedCampaignDetails?.campaign?.Creator_Insights?.['To_Contact']}</h4>
                                            {/* <span className='text-muted small'>this month</span> */}
                                        </div>
                                        {/* <div className='text-success mt-2'>+8.2%</div> */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className='card' style={{ cursor: 'pointer' }} onClick={() => setShowActivatedCreators(true)}>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <div className='rounded-circle bg-circle bg-circle3 p-2 me-2'>
                                                <Icon icon="mdi:account-check" width={20} height={20} className="text-white" />
                                            </div>
                                        </div>
                                        <p className='mb-2 text-muted'>Activated Creators</p>
                                        <div className='d-flex align-items-center'>
                                            <h4 className='mb-0 me-2 fs-20'>{selectedCampaignDetails?.campaign?.Creator_Insights?.Activated}</h4>
                                            <p className='mb-0 fs-12 ms-auto fw-medium'>Review</p>
                                            <Icon icon="solar:arrow-right-outline" width="18" height="18" className="ms-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <div className='rounded-circle bg-circle bg-circle4 p-2 me-2'>
                                                <Icon icon="mdi:currency-usd" width={20} height={20} className="text-white" />
                                            </div>
                                        </div>
                                        <p className='mb-2 text-muted'>Total Spend</p>
                                        <div className='d-flex align-items-baseline'>
                                            <h4 className='mb-0 me-2 fs-20'>$ 0</h4>
                                            {/* <span className='text-muted small'>this month</span> */}
                                        </div>
                                        {/* <div className='text-orange mt-2'>+10.8%</div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container-fluid mt-4'>
                        {/* Filter Pills */}
                        <div className='d-flex align-items-center justify-content-between mb-3'>
                            <div className='d-flex gap-2'>
                                <button className={selectedTab == "All" ? 'btn btn-info btn-sm' : 'btn btn-outline-light text-dark btn-sm'} onClick={() => {
                                    setSelectedTab('All')
                                }}>
                                    All (Recent) <span className={`badge ${selectedTab == "All" ? 'bg-white' : 'bg-light'} text-dark ms-1`}>{totalLenght}</span>
                                </button>
                                {
                                    selectedCampaignDetails?.campaign && Object?.keys(selectedCampaignDetails?.campaign?.Campaign_Progress)?.map((inner_object: any, index: number) => (
                                        inner_object !== "Applicants" &&
                                        <button onClick={() => {
                                            setSelectedTab(inner_object)
                                        }} key={index} className={selectedTab == inner_object ? 'btn btn-info btn-sm' : 'btn btn-outline-light text-dark btn-sm'}>
                                            {inner_object == "In_Discussion" ? "In Discussion" : inner_object == "To_Contact" ? "To Contact" : inner_object == "Not_Fit" ? "Not Fit" : inner_object} <span className={`badge ${selectedTab == inner_object ? 'bg-white' : 'bg-light'} text-dark ms-1`}>{selectedCampaignDetails?.campaign?.Campaign_Progress?.[inner_object]?.length}</span>
                                        </button>
                                    ))
                                }

                            </div>
                            {/* <button className='btn btn-info btn-sm'>
                                Add Creators <Icon icon="material-symbols:add" width={20} height={20} />
                            </button> */}
                        </div>

                        {/* Table */}
                        <div className='card'>
                            <div className='card-body p-0'>
                                <table className="table align-middle">
                                    <thead>
                                        <tr>
                                            <th>Creator</th>
                                            <th>Status <Icon icon="mdi:arrow-up-down" /></th>
                                            <th className='text-center'>Actions</th>
                                            {/* <th>Actions</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ((selectedTab == "All" && totalLenght !== 0)  || (selectedCampaignDetails?.campaign?.Campaign_Progress?.[selectedTab]?.length !== 0)) ?

                                                selectedCampaignDetails?.campaign?.Campaign_Progress && Object?.keys(selectedCampaignDetails?.campaign?.Campaign_Progress)?.map((inner_object: any) => (
                                                    selectedCampaignDetails?.campaign?.Campaign_Progress[inner_object]?.map((array_item: any, index: number) => (
                                                        <tr key={index} style={selectedTab == "All" ? { display: 'table-row' } : selectedTab == inner_object ? { display: 'table-row' } : { display: 'none' }}>
                                                            <td className='w-75'>
                                                                <div className='d-flex align-items-center'>
                                                                    <Image
                                                                        src={array_item?.Profile_Image || defaultImagePath}
                                                                        className="rounded-circle"
                                                                        width={40}
                                                                        height={40}
                                                                        alt="User avatar"
                                                                        priority
                                                                    />
                                                                    <div className='ms-3'>
                                                                        <div>{array_item?.Name}</div>
                                                                        <div className='text-muted d-flex align-items-center fs-12'>
                                                                            <Icon icon="mdi:linkedin" className='me-1 text-info' width={16} height={16} />
                                                                            {array_item?.No_of_Followers}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="position-relative">
                                                                <div className="dropdown">
                                                                    <span
                                                                        className={`px-2 py-1 rounded rounded-pill dropdown-toggle ${getStatusColor(inner_object)}`}
                                                                        data-bs-toggle="dropdown"
                                                                        aria-expanded="false"
                                                                        role="button"
                                                                    >
                                                                        {inner_object =="In_Discussion" ?"In Discussion" : inner_object =="To_Contact" ? "To Contact" : inner_object =="Not_Fit" ? "Not Fit" : inner_object =="To_Contact" ? 'To Contact' : inner_object}
                                                                    </span>
                                                                    {/* <div className="dropdown">
                                                                        <button
                                                                            className="btn "
                                                                            type="button"
                                                                            
                                                                        >
                                                                            {inner_object.Status}  
                                                                        </button> */}

                                                                        {isOpen && ( 
                                                                            <ul className="dropdown-menu">
                                                                                <li
                                                                                    className="dropdown-item cursor text-dark"
                                                                                    onClick={() => handleItemClick("Activated",array_item)}
                                                                                >
                                                                                    Activated
                                                                                </li>
                                                                                <li
                                                                                    className="dropdown-item cursor text-dark"
                                                                                    onClick={() => handleItemClick("In_Discussion",array_item)}
                                                                                >
                                                                                    In Discussion
                                                                                </li>
                                                                                <li
                                                                                    className="dropdown-item cursor text-dark"
                                                                                    onClick={() => handleItemClick("Contacted",array_item)}
                                                                                >
                                                                                    Contacted
                                                                                </li>
                                                                                <li
                                                                                    className="dropdown-item cursor text-dark"
                                                                                    onClick={() => handleItemClick("Not_Fit",array_item)}
                                                                                >
                                                                                    Not Fit
                                                                                </li>
                                                                                <li
                                                                                    className="dropdown-item cursor text-dark"
                                                                                    onClick={() => handleItemClick("To_Contact",array_item)}
                                                                                >
                                                                                    To Contact
                                                                                </li>
                                                                            </ul>
                                                                        )}
                                                                    {/* </div> */}
                                                                </div>
                                                            </td>
                                                            <td className='text-center'>
                                                                <Icon icon="material-symbols:chat-outline" width={22} height={22} className='cursor text-warning text-center' />
                                                            </td>
                                                        </tr>

                                                    ))
                                                ))
                                                :
                                                
                                                <tr>
                                                    <td colSpan={3}>
                                                        <div style={{ textAlign: 'center' }}>No data found</div>
                                                    </td>
                                                </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default CampaignOverview