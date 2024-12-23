
"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';
import CampaignFilterModal from '@/components/campaignfiltermodal';


function EditProfileModal() {

    return (
        <>
            <div className="modal fade" id="editProfileModal" tabIndex={-1} aria-labelledby="editProfileModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header px-4">
                            <h1 className="modal-title fs-5" id="editProfileModalLabel">Edit Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    {/* Left Column */}
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your full name"
                                            defaultValue="Lindsay Rosenthal"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Headline</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your Headline"
                                            defaultValue="@lindsayrosenthal"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            placeholder="Enter your description"
                                            defaultValue="Learn about the future of marketing and emerging trends in the industry. Leading the way in digital marketing, we're at the forefront of innovation. Learn more about our services and how we can help you achieve your goals."
                                        ></textarea>
                                    </div>

                                </div>

                                <div className="col-md-6">
                                    {/* Right Column */}
                                    <div className="mb-3">
                                        <label className="form-label">Profile Picture</label>
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <small className="text-muted">1:1 Ratio</small>
                                            <div className="vr"></div>
                                            <small className="text-muted">Max 10 MB</small>
                                        </div>
                                        <div className="border-dashed rounded-2 text-center bg-base size-box position-relative">
                                            <input type="file" className="d-none" id="profileImage" accept="image/*" />
                                            <label htmlFor="profileImage" className="cursor-pointer">
                                                <Image
                                                    src="/assets/images/user.jpg"
                                                    alt="Current profile"
                                                    width={100}
                                                    height={100}
                                                />
                                                <Icon icon="ph:pencil-simple" className="position-absolute top-0 end-0 m-2 cursor" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Skills & Expertise</label>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Add a new skill"
                                            />
                                            <button className="btn btn-info" type="button">Add</button>
                                        </div>
                                        <div className="d-flex gap-2 flex-wrap mb-2">
                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                                                Backend developer
                                                <i className="bi bi-x ms-1 cursor"></i>
                                            </span>
                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                                                Front end developer
                                                <i className="bi bi-x ms-1 cursor"></i>
                                            </span>
                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                                                IT officer
                                                <i className="bi bi-x ms-1 cursor"></i>
                                            </span>
                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                                                Adobe Premiere Pro
                                                <i className="bi bi-x ms-1 cursor"></i>
                                            </span>
                                            <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                                                Adobe Photoshop
                                                <i className="bi bi-x ms-1 cursor"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-outline-info" data-bs-dismiss="modal">Discard</button>
                            <button type="button" className="btn btn-info px-3">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfileModal