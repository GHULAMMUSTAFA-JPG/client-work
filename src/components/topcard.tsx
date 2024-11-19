
"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";



function TopCard() {

    return (
        <>
            {/* <div className="row my-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body p-4">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-md-6 col-xl-3">
                                    <p className="mb-2 fw-medium fs-12">Campaign Creators</p>
                                    <div className="d-flex">
                                        {users.slice(0, 4).map((user, index) => (
                                            <Image
                                                key={index}
                                                src={user.Profile_Image}
                                                alt={`User ${index + 1}`}
                                                width={50}
                                                height={50}
                                                className="creator-img img-fluid margin-overlap"
                                            />
                                        ))}
                                    </div>

                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-3">
                                    <p className="mb-2 fw-medium fs-12">Creators Score</p>
                                    <div className="d-flex align-items-center">
                                        <Icon icon="tabler:users" width={32} height={32} />
                                        <div className="ms-2">
                                            <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">$50.1k</span>Earned Media Value</p>
                                            <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">$3.1k</span>Payout</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-3">
                                    <p className="mb-2 fw-medium fs-12">Videos & Media</p>
                                    <div className="d-flex align-items-center">
                                        <Icon icon="akar-icons:video" width={32} height={32} />
                                        <div className="ms-2">
                                            <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">5k</span>Views</p>
                                            <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">205</span>Engagements</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-3">
                                    <p className="mb-2 fw-medium fs-12">Social Media Posts</p>
                                    <div className="d-flex align-items-center">
                                        <Icon icon="iconoir:post" width={32} height={32} />
                                        <div className="ms-2">
                                            <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">$504.6k</span>Impressions</p>
                                            <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">$20.45k</span>Engagements</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className='row my-3'>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body ">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-md-6 col-xl-2">
                                    {/* <p className="mb-2 fw-medium fs-12">Campaign Creators</p> */}
                                    <div className="hero-circle mx-xl-auto mx-md-0">
                                        {/* <img src="../assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" /> */}
                                        <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={90} height={90} />

                                    </div>

                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-3">
                                    <p className="mb-2 fw-medium fs-12 ">Network Reach</p>
                                    <div className="d-flex align-items-center">
                                        <Icon icon="tabler:users" width={32} height={32} className='' />
                                        <div className="ms-2">
                                            {/* <p className="mb-0 fs-12"><span className="fs-14 fw-medium text-dark me-1">50.1</span></p> */}
                                            <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">50</span>Connections</p>
                                            <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">30</span>Followers</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-3">
                                    <p className="mb-2 fw-medium fs-12 ">Post Frequency Tracker</p>
                                    <div className="d-flex align-items-center">
                                        <Icon icon="akar-icons:video" width={32} height={32} className='' />
                                        <div className="ms-2">
                                            <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">90</span>Total Post</p>
                                            <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">10</span>Post Frequency</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-3">
                                    <p className="mb-2 fw-medium fs-12 ">Social Media Posts</p>
                                    <div className="d-flex align-items-center">
                                        <Icon icon="iconoir:post" width={32} height={32} className='' />
                                        <div className="ms-2">
                                            <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">504.6</span>Impressions</p>
                                            <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">20.45</span>Engagements</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopCard