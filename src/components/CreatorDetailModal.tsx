
"use client"
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";


function CreatorDetailModal() {

    return (
        <>
            <div className="modal fade" id="creatorDetailModal" tabIndex={-1} aria-labelledby="creatorDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header px-4">
                            <h1 className="modal-title fs-5" id="creatorDetailModalLabel">Mindstream News Letter Posts</h1>
                            <button type="button" id="close_modal_creator_detail" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {/* Left side - Image Carousel */}
                                <div className="col-md-7">
                                    <div id="creatorImageCarousel" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#creatorImageCarousel" data-bs-slide-to="0" className="active bg-info rounded-circle p-1" style={{width: '4px', height: '4px'}} aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#creatorImageCarousel" data-bs-slide-to="1" className="bg-info rounded-circle p-1" style={{width: '4px', height: '4px'}} aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#creatorImageCarousel" data-bs-slide-to="2" className="bg-info rounded-circle p-1" style={{width: '4px', height: '4px'}} aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src="/assets/images/daily_news_letter.jpeg" className="d-block w-100" alt="News Letter" style={{height: '400px', objectFit: 'cover'}} />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="/assets/images/chatgpt_guide.jpeg" className="d-block w-100" alt="Guide" style={{height: '400px', objectFit: 'cover'}} />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="/assets/images/chatgpt_cheat_sheet.jpeg" className="d-block w-100" alt="Cheat Sheet" style={{height: '400px', objectFit: 'cover'}} />
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#creatorImageCarousel" data-bs-slide="prev">
                                            <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{width: '28px', height: '28px'}}>
                                                <Icon icon="material-symbols:arrow-back-ios-new-rounded" className="text-white" width={16} height={16} />
                                            </div>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#creatorImageCarousel" data-bs-slide="next">
                                            <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{width: '28px', height: '28px'}}>
                                                <Icon icon="material-symbols:arrow-forward-ios-rounded" className="text-white" width={16} height={16} />
                                            </div>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Right side - Creator Details Card */}
                                <div className="col-md-5">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <div className="rounded-circle">
                                                    <Image
                                                        src="/assets/images/model_1.png"
                                                        className="rounded-circle"
                                                        alt="Creator avatar"
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <div>
                                                    <h5 className="card-title mb-0 fs-14">Adam Biddlecombe</h5>
                                                    <div className="text-muted d-flex align-items-center fs-12">
                                                        <Icon icon="mdi:linkedin" className="me-1 text-info" width={16} height={16} />
                                                        122.1k followers
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="mb-3">
                                                <p className="text-muted mb-1">Post Title</p>
                                                <h6>Mindstream News Letter Post</h6>
                                            </div> */}

                                            <div className="mb-3">
                                                <p className="text-muted mb-1 fs-12">Status</p>
                                                <span className="badge bg-danger-subtle fw-medium p-2 text-danger">Rejected</span>
                                            </div>

                                            <div className="mb-3">
                                                <p className="text-muted mb-1 fs-12">Submission Date</p>
                                                <p className="mb-0 fw-medium">Dec 12, 2024</p>
                                            </div>

                                            <div className="mb-3">
                                                <p className="text-muted mb-1">Description</p>
                                                <p className="mb-0">Detailed post about the latest trends and updates in the industry, focusing on sustainable practices and innovation.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='modal-footer'>
                            <button type="button" className="btn btn-outline-info" data-bs-dismiss="modal">Discard</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreatorDetailModal   