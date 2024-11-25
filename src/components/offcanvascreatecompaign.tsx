
"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';



function OffcanvasCreateCompaign() {

    return (
        <>
            <div className="offcanvas offcanvas-end offcanvas-create-campaign" tabIndex={1} id="offcanvasRight2" aria-labelledby="offcanvasRight2Label">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRight2Label">Create a Campaign</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='create-campaign-wrapper'>
                                <h6 className='mb-3'>Publish your campaign to find a competitive creators</h6>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Campaign Title</label>
                                    <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="I will need a digital designer for my SAAS company" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlSelect1" className="form-label">What level of experience are you looking for? </label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Entry Level
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Intermediate Level
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                                            Expert
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder='Enter your description'></textarea>
                                </div>
                                <hr className='text-warning my-4' />
                                <h5 className='mb-3'>Skills and Expertise</h5>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Add Skills</label>
                                    <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Enter your skills" />
                                </div>
                                <div className='d-flex gap-2 flex-wrap mb-3'>
                                    <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                    <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                    <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                    <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                    <span className="badge bg-outline-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                </div>
                                <hr className='text-warning my-4' />
                                <div className='row'>
                                    <div className='col-12'>
                                        <h5 className='mb-3'>Budget</h5>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Starting Budget</label>
                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Enter starting budget" />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Ending Budget</label>
                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Enter ending budget" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-top d-flex gap-3 justify-content-center offcanvas-footer p-3'>
                    <button className='btn btn-outline-primary w-25'>Discard</button>
                    <button className='btn btn-primary w-25'>Publish</button>
                </div>
            </div>
        </>
    );
}

export default OffcanvasCreateCompaign