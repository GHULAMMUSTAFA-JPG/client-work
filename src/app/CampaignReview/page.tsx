"use client"

import React, { useEffect } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from 'next/image'
import { useState } from 'react'
import ActivatedCreators from './ActivatedCreators'
function CampaignOverview({ setCampaigns, selectedCampaignDetails }: any) {
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Activated':
                return 'text-primary';
            case 'Not Fit':
                return 'text-danger';
            default:
                return 'text-dark';
        }
    };

    const [selectedTab, setSelectedTab] = useState<"All"| "Applicants"| "Activated" | "In_Discussion" | "Contacted" | "To_Connect" | "Not_Fit">("All")
    return (
        <>
            {showActivatedCreators ? (
                <ActivatedCreators setShowActivatedCreators={setShowActivatedCreators} selectedCampaign={selectedCampaignDetails} />
            ) : (
                <section className='dashboard campaign-review'>
                    <div className='container-fluid'>
                        <div className='d-flex align-items-center justify-content-between my-3'>
                            <a href="#" className='text-dark text-decoration-none d-flex align-items-center'>
                                <Icon icon="akar-icons:arrow-left" width={18} height={18} />
                                <span className='ms-2' onClick={() => setCampaigns(true)}>All Campaigns</span>
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
                                    <button className='btn btn-outline-dark fs-12 btn-sm ms-3'>
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
                                            <h4 className='mb-0 me-2 fs-20'>200</h4>
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
                                            <h4 className='mb-0 me-2 fs-20'>{selectedCampaignDetails?.campaign?.Creator_Insights?.Applicants}</h4>
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
                                            <h4 className='mb-0 me-2 fs-20'>$100</h4>
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
                                <button className={selectedTab == "All"  ? 'btn btn-info btn-sm' : 'btn btn-outline-light text-dark btn-sm' } onClick={()=>{
                                    setSelectedTab('All')
                                }}>
                                    All (Recent) <span className={`badge ${selectedTab == "All" ? 'bg-white' : 'bg-light'} text-dark ms-1`}>3</span>
                                </button>
                                {
                               selectedCampaignDetails?.campaign &&  Object?.keys(selectedCampaignDetails?.campaign?.Campaign_Progress)?.map((inner_object: any, index:number) => (
                                inner_object !== "Applicants" &&
                                        <button onClick={()=>{
                                            setSelectedTab(inner_object)
                                        }} key={index} className={selectedTab == inner_object  ? 'btn btn-info btn-sm' : 'btn btn-outline-light text-dark btn-sm' }>
                                        {inner_object} <span className={`badge ${selectedTab == inner_object ? 'bg-white' : 'bg-light'} text-dark ms-1`}>{selectedCampaignDetails?.campaign?.Campaign_Progress?.[inner_object]?.length}</span>
                                    </button>
                                    ))
                                }
                    
                            </div>
                            <button className='btn btn-info btn-sm'>
                                Add Creators <Icon icon="material-symbols:add" width={20} height={20} />
                            </button>
                        </div>

                        {/* Table */}
                        <div className='card'>
                            <div className='card-body p-0'>
                                <table className="table align-middle">
                                    <thead>
                                        <tr>
                                            <th>Creator</th>
                                            <th>Status <Icon icon="mdi:arrow-up-down" /></th>
                                            <th>Amount / Budget</th>
                                            {/* <th>Actions</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        selectedCampaignDetails?.campaign &&  Object?.keys(selectedCampaignDetails?.campaign?.Campaign_Progress)?.map((inner_object: any) => (
                                                selectedCampaignDetails?.campaign?.Campaign_Progress[inner_object]?.map((array_item: any, index: number) => (
                                                    <tr key={index} style={selectedTab=="All" ? {display:'table-row'} : selectedTab == inner_object ? {display:'table-row'} : {display:'none'}}>
                                                        <td className='w-75'>
                                                            <div className='d-flex align-items-center'>
                                                                <Image
                                                                    src={array_item?.Profile_Image}
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
                                                                    className={`px-2 py-1 rounded rounded-pill bg-base text-activated dropdown-toggle ${getStatusColor(inner_object)}`}
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                    role="button"
                                                                >
                                                                    {inner_object}
                                                                </span>
                                                                <ul className="dropdown-menu">
                                                                    <li>
                                                                        <a
                                                                            className={`dropdown-item ${inner_object === 'Activated' ? 'text-activated' : ''}`}
                                                                            // href="#"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // handleStatusChange('Adam Biddlecombe', 'Activated');
                                                                            }}
                                                                        >
                                                                            {inner_object}
                                                                        </a>
                                                                    </li>
                                                                  
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td>$600</td>
                                                    </tr>

                                                ))
                                            ))
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