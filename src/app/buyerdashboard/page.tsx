"use client"

import React, { useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import TopCardBuyer from '@/components/TopCardBuyer';
import CampaignOffcanvasBuyer from '@/components/campaignoffcanvasbuyer';
import CampaignReviewModal from '@/components/campaignreviewmodal';
import OffcanvasCreateCompaign from '@/components/offcanvascreatecompaign';
import CampaignOverview from '../CampaignReview/page';

function buyerdashboard() {
    const [campaigns, setCampaigns] = useState(true)
    return (
        <>
            {
                campaigns ? 
                    <div>
                        <section className='dashboard'>
                            <div className='container-fluid'>
                                {/* <TopCardBuyer /> */}
                                <div className='row my-3'>
                                    <div className='col-12'>
                                        {/* <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Publish Compaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Completed Campaigns</button>
                                </li>
                                <li className='nav-item ms-auto'>
                                    <button className='btn btn-primary btn-sm' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">Create new campaign</button>
                                </li>
                            </ul> */}
                                        <div className='d-flex align-items-center justify-content-between mb-3'>
                                            <p className='fs-18 fw-medium mb-0'>Campaigns</p>
                                            <button className='btn btn-primary btn-sm' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">Create new campaign</button>
                                        </div>

                                        {/* <hr /> */}
                                        <div className='row'>
                                            <div className='col-12 mb-2'>
                                                <div className="tab-content " id="myTabContent">
                                                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                                        <div className='card listing-card'>
                                                            <div className='card-body'>
                                                                <table className="table align-middle table-hover mb-0">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="text-start ps-4">Campaign</th>
                                                                            <th scope="col" className='text-center'>Insights</th>
                                                                            <th scope="col" className='text-center'>Budget</th>
                                                                            <th scope="col" className='text-center'>Status</th>
                                                                            <th scope="col" className='text-center'>Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        <tr onClick={() => setCampaigns(false)} style={{ cursor: 'pointer' }}>
                                                                            <td>
                                                                                <a href='#' className='fw-medium text-dark fs-16'>Help us launch our new marketplace for IRL advertising</a>
                                                                                <div className='d-flex align-items-center mt-1'>
                                                                                    <p className='fs-12 text-warning mb-0'>Dec 11, 2024</p>
                                                                                    <div className="vr mx-2"></div>
                                                                                    <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className='d-flex align-items-center justify-content-center'>
                                                                                    <div>
                                                                                        <p className='mb-0'>12</p>
                                                                                        <p className='fs-12 text-warning mb-0'>Active</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>6</p>
                                                                                        <p className='fs-12 text-warning mb-0'>In Discussion</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>2</p>
                                                                                        <p className='fs-12 text-warning mb-0'>Contacted</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>2</p>
                                                                                        <p className='fs-12 text-warning mb-0'>To Contact</p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <p className='mb-0'>$500</p>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <button className='bg-primary-subtle border-0 btn btn-outline-primary btn-sm px-3 rounded-pill'>Public</button>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <Icon icon="solar:pen-2-outline" width={24} height={24} className='cursor' />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <a href='#' className='fw-medium text-dark fs-16'>Help us get more visibility to our newest feature Website Visitors</a>
                                                                                <div className='d-flex align-items-center mt-1'>
                                                                                    <p className='fs-12 text-warning mb-0'>Dec 9, 2024</p>
                                                                                    <div className="vr mx-2"></div>
                                                                                    <p className='fs-12 text-warning mb-0'>2 Days ago</p>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className='d-flex align-items-center justify-content-center'>
                                                                                    <div>
                                                                                        <p className='mb-0'>0</p>
                                                                                        <p className='fs-12 text-warning mb-0'>Active</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>0</p>
                                                                                        <p className='fs-12 text-warning mb-0'>In Discussion</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>0</p>
                                                                                        <p className='fs-12 text-warning mb-0'>Contacted</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>0</p>
                                                                                        <p className='fs-12 text-warning mb-0'>To Contact</p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <p className='mb-0'>$750</p>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <button className='bg-danger-subtle text-danger border-0 btn btn-outline-primary btn-sm px-3 rounded-pill'>Private</button>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <Icon icon="solar:pen-2-outline" width={24} height={24} className='cursor' />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <a href='#' className='fw-medium text-dark fs-16'>Help us increase our product awareness from SMB to Enterprise customers</a>
                                                                                <div className='d-flex align-items-center mt-1'>
                                                                                    <p className='fs-12 text-warning mb-0'>Dec 10, 2024</p>
                                                                                    <div className="vr mx-2"></div>
                                                                                    <p className='fs-12 text-warning mb-0'>1 day ago</p>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className='d-flex align-items-center justify-content-center'>
                                                                                    <div>
                                                                                        <p className='mb-0'>15</p>
                                                                                        <p className='fs-12 text-warning mb-0'>Active</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>8</p>
                                                                                        <p className='fs-12 text-warning mb-0'>In Discussion</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>4</p>
                                                                                        <p className='fs-12 text-warning mb-0'>Contacted</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>3</p>
                                                                                        <p className='fs-12 text-warning mb-0'>To Contact</p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <p className='mb-0'>$1000</p>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <button className='bg-primary-subtle border-0 btn btn-outline-primary btn-sm px-3 rounded-pill'>Public</button>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <Icon icon="solar:pen-2-outline" width={24} height={24} className='cursor' />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <a href='#' className='fw-medium text-dark fs-16'>We are accelerating our B2B creator program at HiveGPT</a>
                                                                                <div className='d-flex align-items-center mt-1'>
                                                                                    <p className='fs-12 text-warning mb-0'>Dec 8, 2024</p>
                                                                                    <div className="vr mx-2"></div>
                                                                                    <p className='fs-12 text-warning mb-0'>3 days ago</p>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className='d-flex align-items-center justify-content-center'>
                                                                                    <div>
                                                                                        <p className='mb-0'>0</p>
                                                                                        <p className='fs-12 text-warning mb-0 nowrap'>Active</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>0</p>
                                                                                        <p className='fs-12 text-warning mb-0 nowrap'>In Discussion</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>0</p>
                                                                                        <p className='fs-12 text-warning mb-0 nowrap'>Contacted</p>
                                                                                    </div>
                                                                                    <div className='ms-5'>
                                                                                        <p className='mb-0'>0</p>
                                                                                        <p className='fs-12 text-warning mb-0 nowrap'>To Contact</p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <p className='mb-0'>$850</p>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <button className='bg-danger-subtle text-danger border-0 btn btn-outline-primary btn-sm px-3 rounded-pill'>Private</button>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <Icon icon="solar:pen-2-outline" width={24} height={24} className='cursor' />
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                            <div className='card listing-card'>
                                                <div className='card-body'>
                                                    <div className='card listing-card'>
                                                        <div className='card-body'>
                                                            <table className="table align-middle table-hover mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p className='mb-0'>Initiated Nov 18, 2024</p>
                                                                            <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                        </td>
                                                                        <td>
                                                                            <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                                                        </td>
                                                                        <td>
                                                                            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light px-3">Completed</span>
                                                                        </td>
                                                                        <td>
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p className='mb-0'>Initiated Nov 18, 2024</p>
                                                                            <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                        </td>
                                                                        <td>
                                                                            <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                                                        </td>
                                                                        <td>
                                                                            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light px-3">Completed</span>
                                                                        </td>
                                                                        <td>
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p className='mb-0'>Initiated Nov 18, 2024</p>
                                                                            <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                        </td>
                                                                        <td>
                                                                            <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                                                        </td>
                                                                        <td>
                                                                            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light px-3">Completed</span>
                                                                        </td>
                                                                        <td>
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                                    {/* <div className="tab-pane fade" id="settings-tab-pane" role="tabpanel" aria-labelledby="settings-tab" tabIndex={0}>
                                            <div className='card listing-card'>
                                                <div className='card-body'>
                                                    <div className='card listing-card'>
                                                        <div className='card-body'>
                                                            <table className="table align-middle table-hover mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p className='mb-0'>Initiated Nov 18, 2024</p>
                                                                            <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                        </td>
                                                                        <td>
                                                                            <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                                                        </td>
                                                                        <td>
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                            <Icon icon="mynaui:edit" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2" />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='card listing-card'>
                                                <div className='card-body'>
                                                    <div className='card listing-card'>
                                                        <div className='card-body'>
                                                            <table className="table align-middle table-hover mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p className='mb-0'>Initiated Nov 18, 2024</p>
                                                                            <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                        </td>
                                                                        <td>
                                                                            <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                                                        </td>
                                                                        <td>
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                            <Icon icon="mynaui:edit" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2" />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='card listing-card'>
                                                <div className='card-body'>
                                                    <div className='card listing-card'>
                                                        <div className='card-body'>
                                                            <table className="table align-middle table-hover mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p className='mb-0'>Initiated Nov 18, 2024</p>
                                                                            <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                        </td>
                                                                        <td>
                                                                            <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                                                        </td>
                                                                        <td>
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                            <Icon icon="mynaui:edit" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2" />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <CampaignOffcanvasBuyer />
                        <CampaignReviewModal />
                        <OffcanvasCreateCompaign />
                    </div>  
        :

            <div>
                <CampaignOverview setCampaigns={setCampaigns}/>
            </div>
        }

        </>
    )
}
export default buyerdashboard
