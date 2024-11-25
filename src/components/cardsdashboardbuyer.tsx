
"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";



function CardsDashboardBuyer() {

    return (
        <>
            <div className='col-md-4 col-xl-3'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='d-flex'>
                            <div className='user-img-circle me-3'>
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
                                <p className='mb-1'>Newyork, America</p>
                                <div className='d-flex align-items-center mb-2'>
                                    <Icon icon="mdi:dollar" width={20} height={20} />
                                    <p className='mb-0 text-secondary'><span className='text-dark fw-medium'>$20</span> /hr</p>
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <Icon icon="mdi:file-document-tick-outline" className='me-1 text-info' width={18} height={18} />
                                    <p className='text-info mb-0'>Completed 80 campaigns</p>
                                </div>
                                <div className='d-flex align-items-center mb-3'>
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
                </div>
            </div>
        </>
    );
}

export default CardsDashboardBuyer