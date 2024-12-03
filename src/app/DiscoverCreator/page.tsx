"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';
import CampaignOffcanvas from '@/components/campaignoffcanvas';
import CampaignFilterModal from '@/components/campaignfiltermodal';



function DiscoverCreator() {

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
                                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                            <div className='d-flex align-items-center justify-content-between mb-3'>
                                                <div className="position-relative w-50">
                                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Search for Campaigns" />
                                                    <Icon icon="ph:magnifying-glass" width={20} height={20} className='text-secondary position-absolute top-50 start-0 translate-middle-y ms-3' />
                                                    <Icon icon="ph:x" width={20} height={20} className='text-secondary position-absolute top-50 end-0 translate-middle-y me-3 cursor' />
                                                    {/* <Icon icon="akar-icons:settings-vertical" width={20} height={20} className='text-primary position-absolute top-50 end-0 translate-middle-y me-3 cursor' data-bs-toggle="modal" data-bs-target="#exampleModal" /> */}
                                                </div>
                                                <button className='btn btn-primary rounded-pill d-flex align-items-center' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    <Icon icon="akar-icons:settings-vertical" width={20} height={20} />
                                                    <span className='ms-2'>Advanced Filters</span>
                                                </button>
                                            </div>
                                            <div className='card campaign-card'>
                                                <div className='campaign-post-wrapper' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <div className='campaign-post'>
                                                        <div className='d-flex'>
                                                            {/* <div className='dashboard-img-circle me-2'>
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div> */}
                                                            <div className='d-flex justify-content-between'>
                                                                <div>
                                                                    <h5 className='mb-2'>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="ph:building-fill" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Cisco</p>
                                                                        <Icon icon="ph:circle-fill" className='text-warning mx-3' width={4} height={4} />
                                                                        <p className='text-secondary fs-12 mb-0'>Jan 24, 2024 - July 25 2024</p>
                                                                        <Icon icon="ph:circle-fill" className='text-warning mx-3' width={4} height={4} />
                                                                        <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    </div>
                                                                    <p className='line-clamp-1 text-dark fs-12 mb-2'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap'>
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
                                                                <div className='d-flex gap-2 align-items-start'>
                                                                    <button className='btn btn-outline-primary btn-sm rounded-pill fs-12 nowrap px-3'>Apply Now</button>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-1 icon-apply nowrap">
                                                                        <Icon icon="solar:arrow-right-broken" width={24} height={24} className='text-primary' />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning m-0' />
                                                </div>
                                                <div className='campaign-post-wrapper' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <div className='campaign-post'>
                                                        <div className='d-flex'>
                                                            {/* <div className='dashboard-img-circle me-2'>
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div> */}
                                                            <div className='d-flex justify-content-between'>
                                                                <div>
                                                                    <h5 className='mb-2'>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="ph:building-fill" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Cisco</p>
                                                                        <Icon icon="ph:circle-fill" className='text-warning mx-3' width={4} height={4} />
                                                                        <p className='text-secondary fs-12 mb-0'>Jan 24, 2024 - July 25 2024</p>
                                                                        <Icon icon="ph:circle-fill" className='text-warning mx-3' width={4} height={4} />
                                                                        <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    </div>
                                                                    <p className='line-clamp-1 text-dark fs-12 mb-2'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap'>
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
                                                                <div className='d-flex gap-2 align-items-start'>
                                                                    <button className='btn btn-outline-primary btn-sm rounded-pill fs-12 nowrap px-3'>Apply Now</button>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-1 icon-apply nowrap">
                                                                        <Icon icon="solar:arrow-right-broken" width={24} height={24} className='text-primary' />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning m-0' />
                                                </div>
                                                <div className='campaign-post-wrapper' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <div className='campaign-post'>
                                                        <div className='d-flex'>
                                                            {/* <div className='dashboard-img-circle me-2'>
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div> */}
                                                            <div className='d-flex justify-content-between'>
                                                                <div>
                                                                    <h5 className='mb-2'>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="ph:building-fill" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Cisco</p>
                                                                        <Icon icon="ph:circle-fill" className='text-warning mx-3' width={4} height={4} />
                                                                        <p className='text-secondary fs-12 mb-0'>Jan 24, 2024 - July 25 2024</p>
                                                                        <Icon icon="ph:circle-fill" className='text-warning mx-3' width={4} height={4} />
                                                                        <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    </div>
                                                                    <p className='line-clamp-1 text-dark fs-12 mb-2'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap'>
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
                                                                <div className='d-flex gap-2 align-items-start'>
                                                                    <button className='btn btn-outline-primary btn-sm rounded-pill fs-12 nowrap px-3'>Apply Now</button>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-1 icon-apply nowrap">
                                                                        <Icon icon="solar:arrow-right-broken" width={24} height={24} className='text-primary' />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning m-0' />
                                                </div>
                                                <div className='campaign-post-wrapper' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <div className='campaign-post'>
                                                        <div className='d-flex'>
                                                            {/* <div className='dashboard-img-circle me-2'>
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div> */}
                                                            <div className='d-flex justify-content-between'>
                                                                <div>
                                                                    <h5 className='mb-2'>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="ph:building-fill" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Cisco</p>
                                                                        <Icon icon="ph:circle-fill" className='text-warning mx-3' width={4} height={4} />
                                                                        <p className='text-secondary fs-12 mb-0'>Jan 24, 2024 - July 25 2024</p>
                                                                        <Icon icon="ph:circle-fill" className='text-warning mx-3' width={4} height={4} />
                                                                        <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    </div>
                                                                    <p className='line-clamp-1 text-dark fs-12 mb-2'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap'>
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
                                                                <div className='d-flex gap-2 align-items-start'>
                                                                    <button className='btn btn-outline-primary btn-sm rounded-pill fs-12 nowrap px-3'>Apply Now</button>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-1 icon-apply nowrap">
                                                                        <Icon icon="solar:arrow-right-broken" width={24} height={24} className='text-primary' />
                                                                    </button>
                                                                </div>
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
            </section >
            <CampaignOffcanvas />
            <CampaignFilterModal />
        </>
    );
}

export default DiscoverCreator