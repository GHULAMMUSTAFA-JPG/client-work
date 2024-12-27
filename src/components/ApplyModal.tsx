
"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';



function ApplyModal() {

    return (
        <>
            <div className="modal fade" id="applyModal" tabIndex={-1} aria-labelledby="applyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Campaign Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                        <div className="modal-body p-4">
                            {/* <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item mb-0">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                                            Number of Followers
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Entry Level<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                            Intermediate<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            Expert<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-0">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            Campaigns Price
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Less than $100<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                            $100 to $500<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            $500 to $1k<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            $1k to $5k<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            $5+<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-0">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Number of Applicants
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Less than 10<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                            10 to 20<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            20 to 30<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            30 to 40<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            50+<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className='d-flex gap-3'>
                                <div>
                                    <p className='fw-medium mb-2 fs-18'>Apollo | Join our Creator Program</p>
                                    <p className='text-warning'>We are growing our wordclass B2B creator program at Apollo. We are looking to partner with great GTM focused creators.</p>
                                </div>
                                <Image
                                    src="/assets/images/apollo.png"
                                    className="border object-fit-cover rounded flex-shrink-0"
                                    alt="logo"
                                    width={110}
                                    height={110}
                                />
                                <button type="button" className="btn-close ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className='d-flex gap-2 align-items-center mb-2'>
                                <Icon icon="icon-park-outline:search" width={14} height={14} className='text-gray' />
                                <p className='mb-0'>Customer Success, Sales, Marketing</p>
                            </div>
                            <div className='d-flex gap-2 align-items-center mb-3'>
                                <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray' />
                                <p className='mb-0'>LinkedIn Posts, Newsletters, Podcasts, Event Speakers</p>
                            </div>
                            <p className='mb-2 fw-medium fs-16'>Campaign Details</p>
                            <p className='text-warning mb-0'>This is a general application to show that you are interested in partnering with our brand. We are interested in partnering with creators we believe can elevate our brand and raise awareness for upcoming product launches, events, and general marketing activities.</p>
                            <hr className='text-warning' />
                            <div className="mb-3">
                                <label className="mb-2 fw-medium fs-16">Send a message to Apply</label>
                                {/* <small className="text-muted d-block mb-2">We will review your application and get back to you as soon as possible.</small> */}
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    placeholder="Send a message about your interest in collaborating with our brand."
                                ></textarea>
                            </div>
                            <button className='btn btn-info w-100'>Send and Apply</button>

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

export default ApplyModal