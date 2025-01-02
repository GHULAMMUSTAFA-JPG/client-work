'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import SubmitCampaignModal from '@/components/SubmitCampaignModal';
import Image from 'next/image';
import SubmitDetailModal from '@/components/SubmitDetailModal';
const SubmitCampaigns = () => {
    const router = useRouter();
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleSubmitWork = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Work submitted');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setUploadedFiles(prev => [...prev, ...filesArray]);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            <section className='dashboard campaign-review'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center justify-content-between my-3'>
                        <a onClick={() => router.push('/campaigns')} className='text-dark text-decoration-none d-flex align-items-center' style={{ cursor: 'pointer' }}>
                            <Icon icon="akar-icons:arrow-left" width={18} height={18} />
                            <span className='ms-2'>All Campaigns</span>
                        </a>
                    </div>
                    <div className='card mb-3'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <div className='d-flex align-items-center gap-3 mb-1'>
                                        <h5 className='mb-0'>Help us launch our new marketplace</h5>
                                        <button className='bg-primary-subtle border-0 btn btn-outline-primary btn-sm py-1 px-2 rounded-pill'>Public</button>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <p className='fs-12 text-warning mb-0'>Nov 18, 2024</p>
                                        <div className="vr mx-2 vr-public"></div>
                                        <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                        <div className="vr mx-2 vr-public"></div>
                                        <span>Budget: <span className='fw-medium'>$1000</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='container-fluid mt-3'>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <div className='d-flex gap-2'>
                            <button className='btn btn-info btn-sm'>
                                All (Recent) <span className="badge bg-white text-dark ms-1">3</span>
                            </button>
                            <button className='btn btn-outline-light text-dark btn-sm'>
                                Waiting Approvals <span className="badge bg-light text-dark ms-1">1</span>
                            </button>
                            <button className='btn btn-outline-light text-dark btn-sm'>
                                Approved Posts <span className="badge bg-light text-dark ms-1">1</span>
                            </button>
                            <button className='btn btn-outline-light text-dark btn-sm'>
                                Rejected Posts <span className="badge bg-light text-dark ms-1">1</span>
                            </button>
                        </div>
                        <button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#submitCampaignModal"><Icon icon="material-symbols:add" width={16} height={16} /> Add Submission</button>
                    </div>
                    <div className="row g-3">
                        <div className='col-md-3'>
                            <div className="card">
                                <div className="position-relative">
                                    <span className="position-absolute top-0 end-0 m-2 badge text-yellow p-2 fw-medium bg-orange-subtle">
                                        Pending Approval
                                    </span>
                                    <Image
                                        src="/assets/images/chatgpt_guide.jpeg"
                                        className="card-img-top"
                                        alt="Campaign image"
                                        width={500}
                                        height={130}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="rounded-circle">
                                            <Image
                                                src="/assets/images/model_1.png"
                                                className="rounded-circle"
                                                alt="User avatar"
                                                width={36}
                                                height={36}
                                            />
                                        </div>
                                        <div>
                                            <div className="fw-medium">John Doe</div>
                                            <div className="text-muted small">2 hours ago</div>
                                        </div>
                                    </div>
                                    <h5 className="card-title fs-16">First Campaign Submission</h5>
                                    <a className="text-info text-decoration-none float-end cursor" data-bs-toggle="modal" data-bs-target="#submitDetailModal">View Details →</a>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-3'>
                            <div className="card">
                                <div className="position-relative">
                                    <span className="position-absolute top-0 end-0 m-2 badge text-yellow p-2 fw-medium bg-orange-subtle">
                                        Pending Approval
                                    </span>
                                    <Image
                                        src="/assets/images/chatgpt_guide.jpeg"
                                        className="card-img-top"
                                        alt="Campaign image"
                                        width={500}
                                        height={130}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="rounded-circle">
                                            <Image
                                                src="/assets/images/model_1.png"
                                                className="rounded-circle"
                                                alt="User avatar"
                                                width={36}
                                                height={36}
                                            />
                                        </div>
                                        <div>
                                            <div className="fw-medium">John Doe</div>
                                            <div className="text-muted small">2 hours ago</div>
                                        </div>
                                    </div>
                                    <h5 className="card-title fs-16">First Campaign Submission</h5>
                                    <a className="text-info text-decoration-none float-end cursor" data-bs-toggle="modal" data-bs-target="#submitDetailModal">View Details →</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="card">
                                <div className="position-relative">
                                    <span className="position-absolute top-0 end-0 m-2 badge text-yellow p-2 fw-medium bg-orange-subtle">
                                        Pending Approval
                                    </span>
                                    <Image
                                        src="/assets/images/chatgpt_guide.jpeg"
                                        className="card-img-top"
                                        alt="Campaign image"
                                        width={500}
                                        height={130}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="rounded-circle">
                                            <Image
                                                src="/assets/images/model_1.png"
                                                className="rounded-circle"
                                                alt="User avatar"
                                                width={36}
                                                height={36}
                                            />
                                        </div>
                                        <div>
                                            <div className="fw-medium">John Doe</div>
                                            <div className="text-muted small">2 hours ago</div>
                                        </div>
                                    </div>
                                    <h5 className="card-title fs-16">First Campaign Submission</h5>
                                    <a className="text-info text-decoration-none float-end cursor" data-bs-toggle="modal" data-bs-target="#submitDetailModal">View Details →</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SubmitCampaignModal />
            <SubmitDetailModal />
        </>
    );
};

export default SubmitCampaigns;