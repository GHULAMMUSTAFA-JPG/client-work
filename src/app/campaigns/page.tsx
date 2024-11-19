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



function Campaigns() {

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <TopCard />
                    <div className='row my-3'>
                        <div className='col-12'>
                            <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All Compaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Accepted Campaigns</button>
                                </li>
                            </ul>
                            {/* <hr /> */}
                            <div className='row'>
                                <div className='col-12 mb-2'>
                                    <div className="tab-content " id="myTabContent">
                                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                            <div className='card campaign-card'>
                                                <div className='campaign-post-wrapper' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <div className='campaign-post'>
                                                        <div className='d-flex'>
                                                            {/* <div className='dashboard-img-circle me-2'>
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div> */}
                                                            <div className='d-flex justify-content-between'>
                                                                <div>
                                                                    <h5 className='mb-3'>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Islamababd</p>
                                                                    </div>
                                                                    <p className='text-secondary fs-12 mb-2'>Jan 24, 2024 - July 25 2024</p>
                                                                    <p className='line-clamp-3 text-dark mb-3'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap mb-3'>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent    ">Backend developer</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                    </div>
                                                                    <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-2 icon-apply">
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
                                                                    <h5 className='mb-3'>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Islamababd</p>
                                                                    </div>
                                                                    <p className='text-secondary fs-12 mb-2'>Jan 24, 2024 - July 25 2024</p>
                                                                    <p className='line-clamp-3 text-dark mb-3'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap mb-3'>
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
                                                                    <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-2 icon-apply">
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
                                                                    <h5 className='mb-3'>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Islamababd</p>
                                                                    </div>
                                                                    <p className='text-secondary fs-12 mb-2'>Jan 24, 2024 - July 25 2024</p>
                                                                    <p className='line-clamp-3 text-dark mb-3'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap mb-3'>
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
                                                                    <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-2 icon-apply">
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
                                                                    <h5 className='mb-3'>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Islamababd</p>
                                                                    </div>
                                                                    <p className='text-secondary fs-12 mb-2'>Jan 24, 2024 - July 25 2024</p>
                                                                    <p className='line-clamp-3 text-dark mb-3'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap mb-3'>
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
                                                                    <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-2 icon-apply">
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
                                                                    <h5 className='mb-3'>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Islamababd</p>
                                                                    </div>
                                                                    <p className='text-secondary fs-12 mb-2'>Jan 24, 2024 - July 25 2024</p>
                                                                    <p className='line-clamp-3 text-dark mb-3'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap mb-3'>
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
                                                                    <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-2 icon-apply">
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
                                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                            Invitation to Campaigns
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first item's accordion body.</div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                            Accepted Campaigns
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                            Submitted Campaigns
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='col-md-3 mb-2'>
                                    <ProfileCard />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <CampaignOffcanvas />
        </>
    );
}

export default Campaigns