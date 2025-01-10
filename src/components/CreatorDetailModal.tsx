
"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import { changePostStatus } from '@/@api';
import { useAuth } from '@/contexts/AuthContext';

function CreatorDetailModal(props: any) {
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
            <div className="modal fade" id="creatorDetailModal" tabIndex={-1} aria-labelledby="creatorDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header px-4">
                            <h1 className="modal-title fs-5" id="creatorDetailModalLabel">{selectedPost?.Post_Title || ""}</h1>
                            <button type="button" id="close_modal_creator_detail" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {/* Left side - Image Carousel */}
                                <div className="col-md-7">
                                    {selectedPost?.Media_Content?.length > 1 ? (
                                        <div id="creatorImageCarousel" className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-indicators">
                                                {selectedPost?.Media_Content?.map((_: string, index: number) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        data-bs-target="#creatorImageCarousel"
                                                        data-bs-slide-to={index}
                                                        className={`bg-info rounded-circle p-1 ${index === 0 ? 'active' : ''}`}
                                                        style={{ width: '4px', height: '4px' }}
                                                        aria-current={index === 0 ? "true" : undefined}
                                                        aria-label={`Slide ${index + 1}`}
                                                    ></button>
                                                ))}
                                            </div>
                                            <div className="carousel-inner">
                                                {selectedPost?.Media_Content?.map((media: string, index: number) => (
                                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                        {media.toLowerCase().endsWith('.pdf') ? (
                                                            <div className="bg-card-light d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                                                                <Icon
                                                                    icon="mdi:file-document-outline"
                                                                    width={30}
                                                                    height={30}
                                                                    className="text-dark"
                                                                />
                                                            </div>
                                                        ) : media.toLowerCase().endsWith('.mp4') || media.toLowerCase().endsWith('.mov') ? (
                                                            <video style={{ height: '400px', width: '100%', objectFit: 'cover' }}>
                                                                <source src={media} type={media.toLowerCase().endsWith('.mov') ? "video/quicktime" : "video/mp4"} />
                                                            </video>
                                                        ) : (
                                                            <img
                                                                src={media}
                                                                className="d-block w-100"
                                                                alt="Post media content"
                                                                style={{ height: '400px', objectFit: 'cover' }}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
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
                                    ) : (
                                        <>
                                            {selectedPost?.Media_Content?.[0] ? (
                                                <>
                                                    {selectedPost.Media_Content[0].toLowerCase().endsWith('.pdf') ? (
                                                        <div className="bg-card-light d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                                                            <Icon
                                                                icon="mdi:file-document-outline"
                                                                width={30}
                                                                height={30}
                                                                className="text-dark"
                                                            />
                                                        </div>
                                                    ) : selectedPost.Media_Content[0].toLowerCase().endsWith('.mp4') || selectedPost.Media_Content[0].toLowerCase().endsWith('.mov') ? (
                                                        <video style={{ height: '400px', width: '100%', objectFit: 'cover' }}>
                                                            <source src={selectedPost.Media_Content[0]} type={selectedPost.Media_Content[0].toLowerCase().endsWith('.mov') ? "video/quicktime" : "video/mp4"} />
                                                        </video>
                                                    ) : (
                                                        <img
                                                            src={selectedPost.Media_Content[0]}
                                                            className="d-block w-100"
                                                            alt="Post media content"
                                                            style={{ height: '400px', objectFit: 'cover' }}
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <img
                                                    src='https://cdn.synnc.us/creator/09d2eea2-9fa9-45b1-89ae-cfb0d8363b6b.png'
                                                    className="d-block w-100"
                                                    alt="Default image"
                                                    style={{ height: '400px', objectFit: 'cover' }}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Right side - Creator Details Card */}
                                <div className="col-md-5">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <div className="rounded-circle">
                                                    <Image
                                                        src={selectedCreator?.Profile_Image || 'https://cdn.synnc.us/creator/7a06f497-8214-4cd8-b9a1-12cc3ffd1001.jpg'}
                                                        className="rounded-circle"
                                                        alt="Creator avatar"
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <div>
                                                    <h5 className="card-title mb-0 fs-14">{selectedCreator?.Name}</h5>
                                                    <div className="text-muted d-flex align-items-center fs-12">
                                                        <Icon icon="mdi:linkedin" className="me-1 text-info" width={16} height={16} />
                                                        {selectedCreator?.No_of_Followers} followers
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="mb-3">
                                                <p className="text-muted mb-1">Post Title</p>
                                                <h6>Mindstream News Letter Post</h6>
                                            </div> */}

                                            <div className="mb-3">
                                                <p className="text-muted mb-1 fs-12">Status</p>
                                                <span className={selectedPost?.Status == "Rejected" ? "badge bg-danger-subtle fw-medium p-2 text-danger" : selectedPost?.Status == "Pending Approval" ? "badge text-yellow p-2 fw-medium bg-orange-subtle" : "badge p-2 fw-medium text-primary bg-primary-subtle"}>{selectedPost?.Status}</span>
                                            </div>

                                            <div className="mb-3">
                                                <p className="text-muted mb-1 fs-12">Submission Date</p>
                                                <p className="mb-0 fw-medium">{selectedPost?.Submitted_At}</p>
                                            </div>

                                            <div className="mb-3">
                                                <p className="text-muted mb-1">Description</p>
                                                <p className="mb-0">{selectedPost?.Description && selectedPost?.Description?.length > 200 ? selectedPost?.Description?.slice(0,200)+ "..." : selectedPost?.Description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedPost?.Status == "Pending Approval" &&
                            <div className='modal-footer gap-2'>
                                {/* <div className="d-flex gap-2"> */}
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => {
                                        actionFunction('Rejected')
                                    }}>
                                        Reject
                                    </button>
                                    <button className="btn btn-primary btn-sm" onClick={() => {
                                        actionFunction('Approved')
                                    }}>
                                        Approve
                                    </button>
                                {/* </div> */}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreatorDetailModal   