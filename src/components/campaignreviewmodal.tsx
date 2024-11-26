
"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';



function CampaignReviewModal() {

    return (
        <>
            <div className="modal fade" id="exampleModal1" tabIndex={-1} aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header px-4">
                            <h1 className="modal-title fs-5" id="exampleModalLabel1">Review Creators</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-12'>
                                    <ul className="nav nav-underline mx-2 border-bottom" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="user1-tab" data-bs-toggle="tab" data-bs-target="#user1-tab-pane" type="button" role="tab" aria-controls="user1-tab-pane" aria-selected="false">Search</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="home1-tab" data-bs-toggle="tab" data-bs-target="#home1-tab-pane" type="button" role="tab" aria-controls="home1-tab-pane" aria-selected="true">Proposals (5)</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile1-tab" data-bs-toggle="tab" data-bs-target="#profile1-tab-pane" type="button" role="tab" aria-controls="profile1-tab-pane" aria-selected="false">Invited (2)</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="settings1-tab" data-bs-toggle="tab" data-bs-target="#settings1-tab-pane" type="button" role="tab" aria-controls="settings1-tab-pane" aria-selected="false">Hires (3)</button>
                                        </li>
                                    </ul>
                                    {/* <hr /> */}
                                    <div className='row'>
                                        <div className='col-12 mb-2'>
                                            <div className="tab-content " id="myTabContent">
                                                <div className="tab-pane fade show active" id="user1-tab-pane" role="tabpanel" aria-labelledby="user1-tab" tabIndex={0}>
                                                    <div className='d-flex align-items-center justify-content-between my-3'>
                                                        <div className="position-relative w-50">
                                                            <input type="email" className="form-control ps-5 rounded-pill" id="exampleFormControlInput1" placeholder="Search for Campaigns" />
                                                            <Icon icon="ph:magnifying-glass" width={20} height={20} className='text-secondary position-absolute top-50 start-0 translate-middle-y ms-3' />
                                                            <Icon icon="ph:x" width={20} height={20} className='text-secondary position-absolute top-50 end-0 translate-middle-y me-3 cursor' />
                                                            {/* <Icon icon="akar-icons:settings-vertical" width={20} height={20} className='text-primary position-absolute top-50 end-0 translate-middle-y me-3 cursor' data-bs-toggle="modal" data-bs-target="#exampleModal" /> */}
                                                        </div>
                                                        <button className='btn btn-primary rounded-pill d-flex align-items-center' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            <Icon icon="akar-icons:settings-vertical" width={20} height={20} />
                                                            <span className='ms-2'>Advanced Filters</span>
                                                        </button>
                                                    </div>
                                                    <hr className='text-warning' />
                                                    <div className='card campaign-card'>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade show" id="home1-tab-pane" role="tabpanel" aria-labelledby="home1-tab" tabIndex={0}>
                                                    <div className='card campaign-card'>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="profile1-tab-pane" role="tabpanel" aria-labelledby="profile1-tab" tabIndex={0}>
                                                    <div className='card campaign-card'>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="settings1-tab-pane" role="tabpanel" aria-labelledby="settings1-tab" tabIndex={0}>
                                                    <div className='card campaign-card'>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                        <div className='campaign-post-wrapper'>
                                                            <div className='campaign-post'>
                                                                <div className='d-flex'>
                                                                    <div className='dashboard-img-circle me-3'>
                                                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                                    </div>
                                                                    <div className='flex-grow-1'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <h5 className='mb-0'>Frontend Developer, Webflow, Wordpress, Shopify, Email Templates</h5>
                                                                            <div className='d-flex gap-2 align-items-start'>
                                                                                <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Hire
                                                                                </button>
                                                                                <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                                                                    Invite
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-2'>
                                                                            <p className='mb-0'>Newyork, America</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <Icon icon="mdi:dollar" width={20} height={20} />
                                                                            <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                                                        </div>
                                                                        <div className='d-flex align-items-center mb-3'>
                                                                            <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                                                            <p className='text-info mb-0'>Completed 80 campaigns</p>
                                                                            <Icon icon="ph:circle-fill" className='text-warning mx-2' width={4} height={4} />
                                                                            <p className='mb-0 text-secondary'>has <span className='text-dark fw-medium'>13 relevant skills</span> to your job</p>
                                                                        </div>
                                                                        <div className='d-flex gap-2 flex-wrap mb-2'>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                        </div>
                                                                        {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className='text-warning m-0' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Apply filters</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CampaignReviewModal