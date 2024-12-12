"use client"

import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from 'next/image'
import { useState } from 'react'
import ActivatedCreators from './ActivatedCreators'
function CampaignOverview({ setCampaigns }: any) {
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
    return (
        <>
            {showActivatedCreators ? (
                <ActivatedCreators setShowActivatedCreators={setShowActivatedCreators} />
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
                                            <h5 className='mb-0'>Help us launch our new marketplace for IRL advertising</h5>
                                            <button className='bg-primary-subtle border-0 btn btn-outline-primary btn-sm py-1 px-2 rounded-pill'>Public</button>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <p className='fs-12 text-warning mb-0'>Dec 11, 2024</p>
                                            <div className="vr mx-2 vr-public"></div>
                                            <p className='fs-12 text-warning mb-0'>2 Days ago</p>
                                            <div className="vr mx-2 vr-public"></div>
                                            <span>Budget: <strong>$100</strong></span>
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
                                            <h4 className='mb-0 me-2 fs-20'>0</h4>
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
                                            <h4 className='mb-0 me-2 fs-20'>1</h4>
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
                                <button className='btn btn-info btn-sm'>
                                    All (Recent) <span className="badge bg-white text-dark ms-1">3</span>
                                </button>
                                <button className='btn btn-outline-light text-dark btn-sm'>
                                    Activated <span className="badge bg-light text-dark ms-1">1</span>
                                </button>
                                <button className='btn btn-outline-light text-dark btn-sm'>
                                    In Discussion <span className="badge bg-light text-dark ms-1">1</span>
                                </button>
                                <button className='btn btn-outline-light text-dark btn-sm'>
                                    Contacted <span className="badge bg-light text-dark ms-1">1</span>
                                </button>
                                <button className='btn btn-outline-light text-dark btn-sm'>
                                    To Contact <span className="badge bg-light text-dark ms-1">0</span>
                                </button>
                                <button className='btn btn-outline-light text-dark btn-sm'>
                                    Not Fit <span className="badge bg-light text-dark ms-1">0</span>
                                </button>
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
                                        <tr>
                                            <td className='w-75'>
                                                <div className='d-flex align-items-center'>
                                                    <Image
                                                        src="/assets/images/model_1.png"
                                                        className="rounded-circle"
                                                        width={40}
                                                        height={40}
                                                        alt="User avatar"
                                                        priority
                                                    />
                                                    <div className='ms-3'>
                                                        <div>Adam Biddlecombe</div>
                                                        <div className='text-muted d-flex align-items-center fs-12'>
                                                            <Icon icon="mdi:linkedin" className='me-1 text-info' width={16} height={16} />
                                                            122.1k
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="position-relative">
                                                <div className="dropdown">
                                                    <span
                                                        className={`px-2 py-1 rounded rounded-pill bg-base text-activated dropdown-toggle ${getStatusColor(creatorStatus['Adam Biddlecombe'])}`}
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        role="button"
                                                    >
                                                        {creatorStatus['Adam Biddlecombe']}
                                                    </span>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'Activated' ? 'text-activated' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'Activated');
                                                                }}
                                                            >
                                                                Activated
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'In Discussion' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'In Discussion');
                                                                }}
                                                            >
                                                                In Discussion
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'Contacted' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'Contacted');
                                                                }}
                                                            >
                                                                Contacted
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'To Contact' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'To Contact');
                                                                }}
                                                            >
                                                                To Contact
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'Not Fit' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'Not Fit');
                                                                }}
                                                            >
                                                                Not Fit
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>$600</td>
                                        </tr>
                                        <tr>
                                            <td className='w-75'>
                                                <div className='d-flex align-items-center'>
                                                    <Image
                                                        src="/assets/images/model_2.png"
                                                        className="rounded-circle"
                                                        width={40}
                                                        height={40}
                                                        alt="User avatar"
                                                        priority
                                                    />
                                                    <div className='ms-3'>
                                                        <div>Danielle Theobald</div>
                                                        <div className='text-muted d-flex align-items-center fs-12'>
                                                            <Icon icon="mdi:linkedin" className='me-1 text-info' width={16} height={16} />
                                                            102.1k
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="position-relative">
                                                <div className="dropdown">
                                                    <span
                                                        className={`px-2 py-1 rounded rounded-pill bg-base text-discussion dropdown-toggle ${getStatusColor(creatorStatus['Adam Biddlecombe'])}`}
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        role="button"
                                                    >
                                                        In Discussion
                                                    </span>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'In Discussion' ? 'text-discussion' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'In Discussion');
                                                                }}
                                                            >
                                                                In Discussion
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'Activated' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'Activated');
                                                                }}
                                                            >
                                                                Activated
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'Contacted' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'Contacted');
                                                                }}
                                                            >
                                                                Contacted
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'To Contact' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'To Contact');
                                                                }}
                                                            >
                                                                To Contact
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'Not Fit' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'Not Fit');
                                                                }}
                                                            >
                                                                Not Fit
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>$100</td>
                                        </tr>
                                        <tr>
                                            <td className='w-75'>
                                                <div className='d-flex align-items-center'>
                                                    <Image
                                                        src="/assets/images/model_3.jpg"
                                                        className="rounded-circle"
                                                        width={40}
                                                        height={40}
                                                        alt="User avatar"
                                                        priority
                                                    />
                                                    <div className='ms-3'>
                                                        <div>Jean Kang</div>
                                                        <div className='text-muted d-flex align-items-center fs-12'>
                                                            <Icon icon="mdi:linkedin" className='me-1 text-info' width={16} height={16} />
                                                            80.35k
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="position-relative">
                                                <div className="dropdown">
                                                    <span
                                                        className={`px-2 py-1 rounded rounded-pill bg-base text-contacted dropdown-toggle ${getStatusColor(creatorStatus['Adam Biddlecombe'])}`}
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        role="button"
                                                    >
                                                        Contacted
                                                    </span>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'In Discussion' ? 'text-contacted' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'In Discussion');
                                                                }}
                                                            >
                                                                In Discussion
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'Activated' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'Activated');
                                                                }}
                                                            >
                                                                Activated
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'Contacted' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'Contacted');
                                                                }}
                                                            >
                                                                Contacted
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'To Contact' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'To Contact');
                                                                }}
                                                            >
                                                                To Contact
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className={`dropdown-item ${creatorStatus['Adam Biddlecombe'] === 'Not Fit' ? 'text-primary' : ''}`}
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleStatusChange('Adam Biddlecombe', 'Not Fit');
                                                                }}
                                                            >
                                                                Not Fit
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>$500</td>
                                        </tr>
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