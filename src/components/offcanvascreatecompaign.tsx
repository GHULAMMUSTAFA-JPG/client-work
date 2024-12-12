
// "use client"
// import { login } from '@/@api';
// import useForm from '@/hooks/useForm';
// import React, { useState } from 'react'
// import Image from "next/image";
// import { useRouter } from 'next/navigation';
// import { Icon } from "@iconify/react/dist/iconify.js";
// import TopCard from '@/components/topcard';
// import ProfileCard from '@/components/profilecard';



// function OffcanvasCreateCompaign() {

//     return (
//         <>
//             <div className="offcanvas offcanvas-end offcanvas-create-campaign" tabIndex={1} id="offcanvasRight2" aria-labelledby="offcanvasRight2Label">
//                 <div className="offcanvas-header">
//                     <h5 className="offcanvas-title" id="offcanvasRight2Label">Create a Campaign</h5>
//                     <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                 </div>
//                 <div className="offcanvas-body">
//                     <div className='row'>
//                         <div className='col-md-12'>
//                             <div className='create-campaign-wrapper'>
//                                 <h6 className='mb-3'>Publish your campaign to find a competitive creators</h6>
//                                 <div className="mb-3">
//                                     <label htmlFor="exampleFormControlInput1" className="form-label">Campaign Title</label>
//                                     <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="I will need a digital designer for my SAAS company" />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="exampleFormControlSelect1" className="form-label">What level of experience are you looking for? </label>
//                                     <div className="form-check">
//                                         <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
//                                         <label className="form-check-label" htmlFor="flexRadioDefault1">
//                                             Entry Level
//                                         </label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
//                                         <label className="form-check-label" htmlFor="flexRadioDefault2">
//                                             Intermediate Level
//                                         </label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
//                                         <label className="form-check-label" htmlFor="flexRadioDefault3">
//                                             Expert
//                                         </label>
//                                     </div>
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
//                                     <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder='Enter your description'></textarea>
//                                 </div>
//                                 <hr className='text-warning my-4' />
//                                 <h5 className='mb-3'>Skills and Expertise</h5>
//                                 <div className="mb-3">
//                                     <label htmlFor="exampleFormControlInput1" className="form-label">Add Skills</label>
//                                     <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Enter your skills" />
//                                 </div>
//                                 <div className='d-flex gap-2 flex-wrap mb-3'>
//                                     <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
//                                     <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
//                                     <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
//                                     <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
//                                     <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
//                                 </div>
//                                 <hr className='text-warning my-4' />
//                                 <div className='row'>
//                                     <div className='col-12'>
//                                         <h5 className='mb-3'>Budget</h5>
//                                         <div className="form-check form-check-inline">
//                                             <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
//                                             <label className="form-check-label" htmlFor="inlineRadio1">Fixed Price</label>
//                                         </div>
//                                         <div className="form-check form-check-inline">
//                                             <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
//                                             <label className="form-check-label" htmlFor="inlineRadio2">Hourly Rate</label>
//                                         </div>
//                                     </div>
//                                     <div className='col-md-3'>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleFormControlInput1" className="form-label">From</label>
//                                             <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="$/ hr" />
//                                         </div>
//                                     </div>
//                                     <div className='col-md-3'>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleFormControlInput1" className="form-label">To</label>
//                                             <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="$/ hr" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='border-top d-flex gap-3 justify-content-center offcanvas-footer p-3'>
//                     <button className='btn btn-outline-primary w-25'>Discard</button>
//                     <button className='btn btn-primary w-25'>Publish</button>
//                 </div>
//             </div>
//         </>
//     );
// }


// ... existing imports ...


import { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function OffcanvasCreateCompaign() {
    const [activeTab, setActiveTab] = useState('ongoing');
    const [startDate, setStartDate] = useState<any>(undefined);
    const [endDate, setEndDate] = useState<any>(undefined);

    // Function to handle calendar icon click
    const handleCalendarClick = () => {
        const startInput = document.getElementById('start-date-input');
        if (startInput) {
            startInput.focus();
        }
    };
    return (
        <div
            className="offcanvas offcanvas-end offcanvas-create-campaign"
            tabIndex={1}
            id="offcanvasRight2"
            aria-labelledby="offcanvasRight2Label"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRight2Label">
                    Create Campaign
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">
                <div className="create-campaign-wrapper">

                    <div className="row g-5">
                        <div className="col-md-6">
                            {/* Basic Campaign Info Section */}
                            <div className="mb-4">
                                <h6 className="mb-3">Basic Campaign Info</h6>
                                <div className="mb-3 border mb-3 p-3 rounded">
                                    <label className="form-label mb-0">Is this a publicly visible campaign? *</label>
                                    <div className="d-flex align-items-center gap-2 justify-content-between">
                                        <div className="form-text">Creators can see the info below and apply to partner</div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="isPublic" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Left Column */}
                            <div className="mb-3">
                                <label className="form-label">Campaign Name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="New Generative AI Product Launch: Agentspot"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Budget (USD) *</label>
                                <small className="text-muted d-block mb-2">This budget number is private and not visible to creators</small>
                                <div className="input-group">
                                    <select className="form-select" style={{ maxWidth: '80px' }}>
                                        <option>USD</option>
                                    </select>
                                    <input type="number" className="form-control" placeholder="0" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Brief Description *</label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    placeholder="Help us launch Agentspot, an AI agent for SMBs to enterprises"
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Campaign Details *</label>
                                <small className="text-muted d-block mb-2">Explain the goals, deliverables, and/or requirements for your campaign</small>
                                <textarea
                                    className="form-control"
                                    rows={6}
                                    placeholder="We're launching a new product feature that helps brands manage business creator partnerships at scale! The cold DMs and endless back-and-forths waste countless hours, so we allow brands to book collaborations directly with you and streamline 90% of the process."
                                ></textarea>
                            </div>
                        </div>

                        <div className="col-md-6">
                            {/* Right Column */}


                            <div className="mb-4">
                                <label className="form-label">Date Range of Campaign *</label>
                                <div className="d-flex flex-column gap-2">
                                    <ul className="nav nav-pills gap-3" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link d-flex align-items-center gap-1 ${activeTab === 'ongoing' ? 'active text-white' : ''}`}
                                                onClick={() => setActiveTab('ongoing')}
                                                type="button"
                                                style={{ backgroundColor: activeTab === 'ongoing' ? '#15ab63' : 'transparent' }}
                                            >
                                                <Icon icon="tabler:infinity" />
                                                Ongoing
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link d-flex align-items-center gap-1 ${activeTab === 'dateRange' ? 'active text-white' : ''}`}
                                                onClick={() => setActiveTab('dateRange')}
                                                type="button"
                                                style={{ backgroundColor: activeTab === 'dateRange' ? '#15ab63' : 'transparent' }}
                                            >
                                                <Icon icon="solar:calendar-linear" />
                                                Date Range
                                            </button>
                                        </li>
                                    </ul>

                                    {activeTab === 'dateRange' && (
                                        <div className="input-group">
                                            <DatePicker
                                                id="start-date-input"
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                placeholderText="Start date"
                                                className="form-control"
                                                dateFormat="MMM dd, yyyy"
                                            />
                                            <span className="input-group-text">→</span>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                placeholderText="End date"
                                                className="form-control"
                                                dateFormat="MMM dd, yyyy"
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={handleCalendarClick}
                                            >
                                                <Icon icon="solar:calendar-linear" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">What type of creators and target audience? *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="AI creators with founders and enterprise employee audiences"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">What preferred content channels and forms of content? *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Podcasts, LinkedIn Posts, Event Speakers"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Upload Campaign Image</label>
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <small className="text-muted">1:1 Ratio</small>
                                    <div className="vr"></div>
                                    <small className="text-muted">Max 10 MB</small>
                                </div>
                                <div className="border-dashed rounded-2 text-center bg-base size-box">
                                    <input type="file" className="d-none" id="campaignImage" accept="image/*" />
                                    <label htmlFor="campaignImage" className="cursor-pointer">
                                        <Icon icon="ph:plus-bold" className="fs-4" />
                                        {/* <div className="text-muted fs-14">Click or drag image to upload</div> */}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-top d-flex gap-3 justify-content-end p-3">
                <button className="btn btn-outline-info" style={{ width: '120px' }}>Discard</button>
                <button className="btn btn-info" style={{ width: '120px' }}>Publish</button>
            </div>
        </div>
    );
}

export default OffcanvasCreateCompaign;