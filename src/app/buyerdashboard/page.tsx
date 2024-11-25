"use client"

import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import TopCardBuyer from '@/components/TopCardBuyer';
import CampaignOffcanvasBuyer from '@/components/campaignoffcanvasbuyer';
import CampaignReviewModal from '@/components/campaignreviewmodal';
import OffcanvasCreateCompaign from '@/components/offcanvascreatecompaign';

function buyerdashboard() {
    return (
        <>
            <section className='dashboard'>
                <div className='container-fluid'>
                    <TopCardBuyer />
                    <div className='row my-3'>
                        <div className='col-12'>
                            <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Publish Compaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Completed Campaigns</button>
                                </li>
                                {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">Draft Campaigns</button>
                                </li> */}
                                <li className='nav-item ms-auto'>
                                    <button className='btn btn-primary btn-sm' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">Create new campaign</button>
                                </li>
                            </ul>
                            {/* <hr /> */}
                            <div className='row'>
                                <div className='col-12 mb-2'>
                                    <div className="tab-content " id="myTabContent">
                                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
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
                                                                    <div className='d-flex align-items-center'>
                                                                        <div>
                                                                            <p className='mb-0'>12</p>
                                                                            <p className='fs-12 text-warning mb-0'>Proposals</p>
                                                                        </div>
                                                                        <div className='ms-5'>
                                                                            <p className='mb-0'>6</p>
                                                                            <p className='fs-12 text-warning mb-0'>Interviewd</p>
                                                                        </div>
                                                                        <div className='ms-5'>
                                                                            <p className='mb-0'>2</p>
                                                                            <p className='fs-12 text-warning mb-0'>Hired</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center'>
                                                                    {/* <span className="badge bg-primary-subtle rounded-pill fw-light px-3 text-primary">Draft</span> */}
                                                                    <button className='btn btn-sm btn-outline-primary px-3 rounded-pill' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1">Completed</button>
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
                                                                    <div className='d-flex align-items-center'>
                                                                        <div>
                                                                            <p className='mb-0'>0</p>
                                                                            <p className='fs-12 text-warning mb-0'>Proposals</p>
                                                                        </div>
                                                                        <div className='ms-5'>
                                                                            <p className='mb-0'>0</p>
                                                                            <p className='fs-12 text-warning mb-0'>Interviewd</p>
                                                                        </div>
                                                                        <div className='ms-5'>
                                                                            <p className='mb-0'>0</p>
                                                                            <p className='fs-12 text-warning mb-0'>Hired</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center'>
                                                                    {/* <span className="badge bg-primary-subtle rounded-pill fw-light px-3 text-primary">Draft</span> */}
                                                                    <button className='btn btn-sm btn-outline-primary px-3 rounded-pill' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">Draft</button>
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
                                                                    <div className='d-flex align-items-center'>
                                                                        <div>
                                                                            <p className='mb-0'>0</p>
                                                                            <p className='fs-12 text-warning mb-0'>Proposals</p>
                                                                        </div>
                                                                        <div className='ms-5'>
                                                                            <p className='mb-0'>0</p>
                                                                            <p className='fs-12 text-warning mb-0'>Interviewd</p>
                                                                        </div>
                                                                        <div className='ms-5'>
                                                                            <p className='mb-0'>0</p>
                                                                            <p className='fs-12 text-warning mb-0'>Hired</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center'>
                                                                    {/* <span className="badge bg-primary-subtle rounded-pill fw-light px-3 text-primary">Draft</span> */}
                                                                    <button className='btn btn-sm btn-outline-primary px-3 rounded-pill' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">Draft</button>
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
                                                                    <div className='d-flex align-items-center'>
                                                                        <div>
                                                                            <p className='mb-0'>12</p>
                                                                            <p className='fs-12 text-warning mb-0'>Proposals</p>
                                                                        </div>
                                                                        <div className='ms-5'>
                                                                            <p className='mb-0'>6</p>
                                                                            <p className='fs-12 text-warning mb-0'>Interviewd</p>
                                                                        </div>
                                                                        <div className='ms-5'>
                                                                            <p className='mb-0'>2</p>
                                                                            <p className='fs-12 text-warning mb-0'>Hired</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center'>
                                                                    {/* <span className="badge bg-primary-subtle rounded-pill fw-light px-3 text-primary">Draft</span> */}
                                                                    <button className='btn btn-sm btn-outline-primary px-3 rounded-pill' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1">Completed</button>
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
                                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
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
                                        </div>
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
        </>
    )
}
export default buyerdashboard
