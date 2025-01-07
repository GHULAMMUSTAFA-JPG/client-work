
"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import { changePostStatus } from '@/@api';
import { useAuth } from '@/contexts/AuthContext';

function SubmitDetailModal(props: any) {
    const { rendControl, setRendControl, selectedPost, campaignData, selectedCreator } = props
    const { setIsLoading } = useAuth()

    const actionFunction = async (type: string) => {
        const dto = {
            "campaign_id": campaignData?._id,
            "post_id": selectedPost?.Post_ID,
            "status": type
        }

        changePostStatus(dto, setIsLoading, setRendControl, rendControl)
    }



    return (
        <>
            <div className="modal fade" id="submitDetailModal" tabIndex={-1} aria-labelledby="submitDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header px-4">
                            <h1 className="modal-title fs-5" id="submitDetailModalLabel">{selectedPost?.Post_Title}</h1>
                            <button type="button" id="close_modal_submit_detail" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {/* Left side - Image Carousel */}
                                <div className="col-md-7">
                                    <div id="creatorImageCarousel" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#creatorImageCarousel" data-bs-slide-to="0" className="active bg-info rounded-circle p-1" style={{ width: '4px', height: '4px' }} aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#creatorImageCarousel" data-bs-slide-to="1" className="bg-info rounded-circle p-1" style={{ width: '4px', height: '4px' }} aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#creatorImageCarousel" data-bs-slide-to="2" className="bg-info rounded-circle p-1" style={{ width: '4px', height: '4px' }} aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">{
                                            selectedPost?.Media_Content?.map((post: any, index: number) => {
                                                return (
                                                    <div key={index} className={`carousel-item active`}>
                                                        <img src={post} className="d-block w-100" alt="News Letter" style={{ height: '400px', objectFit: 'cover' }} />
                                                    </div>
                                                )
                                            })}


                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#creatorImageCarousel" data-bs-slide="prev">
                                            <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                                                <Icon icon="material-symbols:arrow-back-ios-new-rounded" className="text-white" width={16} height={16} />
                                            </div>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#creatorImageCarousel" data-bs-slide="next">
                                            <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
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
                                                        src={campaignData?.campaign?.Creator_Profile_Picture || ''}
                                                        className="rounded-circle"
                                                        alt="Creator avatar"
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <div>
                                                    <h5 className="card-title mb-0 fs-14">{campaignData?.campaign?.Creator_Name}</h5>
                                                    <div className="text-muted d-flex align-items-center fs-12">
                                                        <Icon icon="mdi:linkedin" className="me-1 text-info" width={16} height={16} />
                                                        {campaignData?.campaign?.No_of_Followers}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <p className="text-muted mb-1 fs-12">Status</p>
                                                <span className={selectedPost?.Status == "Rejected" ? "badge bg-danger-subtle end-0 fw-medium p-2 text-danger top-0" : selectedPost?.Status == "Pending Approval" ? " badge text-yellow p-2 fw-medium bg-orange-subtle" : " badge p-2 fw-medium text-primary bg-primary-subtle"}>{selectedPost?.Status}</span>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-muted mb-1 fs-12">Submission Date</p>
                                                <p className="mb-0 fw-medium">{selectedPost?.Submitted_At}</p>
                                            </div>

                                            <div className="mb-3">
                                                <p className="text-muted mb-1">Description</p>
                                                <p className="mb-0">{selectedPost?.Description}</p>
                                            </div>
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

export default SubmitDetailModal   