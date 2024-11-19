
"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import Topcard from '@/components/topcard';



function ProfileCard() {

    return (
        <>
            <div className="card">
                <div className='card-header bg-transparent border-warning'>
                    <div className='dashboard-img-circle mx-auto mb-2'>
                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                    </div>
                    <p className='mb-1 text-center fs-16 '>Peterson</p>
                    <p className='text-warning fs-12 text-center mb-1'>Frontend Developer</p>
                    <div className='d-flex align-items-center justify-content-center text-warning mb-1'>
                        <Icon icon="tdesign:location" className='me-1 text-warning' />
                        <p className='mb-0 fs-12'>Islamababd</p>
                    </div>
                    <p className='text-primary mb-0 text-center fs-12'>50 Connects</p>
                    <p className='text-primary mb-0 text-center fs-12'>10 Followers</p>
                </div>
                <div className="card-body sidecard-scroll">

                    <div className='d-flex'>
                        <div>
                            <p className='mb-1 me-1 '>Skills:</p>
                        </div>
                        <div>
                            <span className="badge bg-info me-1 rounded-pill fw-light">Front end</span>
                            <span className="badge bg-info me-1 rounded-pill fw-light">IT</span>
                            <span className="badge bg-info me-1 rounded-pill fw-light">UI</span>
                            <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                            <span className="badge bg-info me-1 rounded-pill fw-light">UX</span>
                            <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                            <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                            <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                        </div>
                    </div>
                    <hr className='text-warning' />
                    <p className='mb-1 me-1 '>Experience:</p>
                    <div className='mb-1'>
                        <p className='mb-0 fs-12 '>Company </p>
                        <p className='text-warning fs-12 mb-0'>Funavry Technologies</p>
                    </div>
                    <div className='mb-1'>
                        <p className='mb-0 fs-12 '>Position</p>
                        <p className='text-warning fs-12 mb-0'>Software Trainee Engineer</p>
                    </div>
                    <div className='mb-1'>
                        <p className='mb-0 fs-12 '>Employment Type</p>
                        <p className='text-warning fs-12 mb-0'>Full-Time</p>
                    </div>
                    {/* <div className='mb-1'>
                        <p className='mb-0 fs-12 '>Start Date</p>
                        <p className='text-warning fs-12 mb-0'>Aug 2024</p>
                    </div>
                    <div className='mb-1'>
                        <p className='mb-0 fs-12 '>End Date</p>
                        <p className='text-warning fs-12 mb-0'>Aug 2024</p>
                    </div>
                    <div className='mb-1'>
                        <p className='mb-0 fs-12 '>End Date</p>
                        <p className='text-warning fs-12 mb-0'>Aug 2024</p>
                    </div>
                    <div className='mb-1'>
                        <p className='mb-0 fs-12 '>End Date</p>
                        <p className='text-warning fs-12 mb-0'>Aug 2024</p>
                    </div> */}
                    <hr className='text-warning' />
                </div>
            </div>
        </>
    );
}

export default ProfileCard