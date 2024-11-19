
"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';



function CampaignOffcanvas() {

    return (
        <>
            <div className="offcanvas offcanvas-end" tabIndex={1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Apply for Campaign</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='row'>
                        <div className='col-md-9'>
                            <div className='campaign-post-wrapper' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                <div className='campaign-post'>
                                    <div className='d-flex'>
                                        {/* <div className='dashboard-img-circle me-2'>
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div> */}
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <h5>Senior Digital Designer for SAAS Company</h5>
                                                {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                <div className='d-flex align-items-center mb-2'>
                                                    <Icon icon="tdesign:location" className='me-1 text-warning' />
                                                    <p className='mb-0 fs-12 text-secondary'>Islamababd</p>
                                                </div>
                                                <p className='text-secondary fs-12 mb-2'>Jan 24, 2024 - July 25 2024</p>
                                                <p className='text-dark mb-3'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                </p>
                                                <p className='text-dark mb-3'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='text-warning my-4' />
                                <h5>Skills and Expertise</h5>
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
                                <hr className='text-warning my-4' />
                                <h5>Activity on this Campaign</h5>
                                <p className='mb-2'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                <p className='mb-2'><span className=''>Campaign Accepted:</span> <span className='fw-medium text-warning'>4</span></p>
                                <p className='mb-2'><span className=''>Campaign Sent:</span> <span className='fw-medium text-warning'>7</span></p>

                                <div className='d-flex align-items-center'>
                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' width={22} height={22} />
                                    <p className='mb-0 text-warning me-3'>payment verified</p>
                                    <p className='mb-0'>$10k+ <span className='text-warning ms-1'>spent</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 border-start'>
                            <button className='btn btn-primary w-100'>Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CampaignOffcanvas