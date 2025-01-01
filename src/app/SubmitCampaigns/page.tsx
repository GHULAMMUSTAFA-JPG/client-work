'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import SubmitCampaignModal from '@/components/SubmitCampaignModal';

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
                    <a onClick={() => router.push('/campaigns')} className='text-dark text-decoration-none d-flex align-items-center' style={{cursor: 'pointer'}}>
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
                            {/* <button className='btn btn-outline-dark fs-12 btn-sm ms-3'>
                                Edit Campaign <Icon icon="ri:settings-4-line" width={16} height={16} />
                            </button> */}
                        </div>
                    </div>
                </div>
                {/* <div className='row'>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='d-flex align-items-center mb-2'>
                                    <div className='rounded-circle bg-circle bg-circle1 p-2 me-2'>
                                        <Icon icon="mdi:trending-up" width={20} height={20} className="text-white" />
                                    </div>
                                </div>
                                <p className='mb-2 text-muted'>Impressions</p>
                                <div className='d-flex align-items-baseline'>
                                    <h4 className='mb-0 me-2 fs-20'>200</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='d-flex align-items-center mb-2'>
                                    <div className='rounded-circle bg-circle bg-circle2 p-2 me-2'>
                                        <Icon icon="mdi:account-outline" width={20} height={20} className="text-white" />
                                    </div>
                                </div>
                                <p className='mb-2 text-muted'>New Applications</p>
                                <div className='d-flex align-items-baseline'>
                                    <h4 className='mb-0 me-2 fs-20'>15</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card' style={{ cursor: 'pointer' }}>
                            <div className='card-body'>
                                <div className='d-flex align-items-center mb-2'>
                                    <div className='rounded-circle bg-circle bg-circle3 p-2 me-2'>
                                        <Icon icon="mdi:account-check" width={20} height={20} className="text-white" />
                                    </div>
                                </div>
                                <p className='mb-2 text-muted'>Activated Creators</p>
                                <div className='d-flex align-items-center'>
                                    <h4 className='mb-0 me-2 fs-20'>5</h4>
                                    <p className='mb-0 fs-12 ms-auto fw-medium'>Review</p>
                                    <Icon icon="solar:arrow-right-outline" width="18" height="18" className="ms-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='d-flex align-items-center mb-2'>
                                    <div className='rounded-circle bg-circle bg-circle4 p-2 me-2'>
                                        <Icon icon="mdi:currency-usd" width={20} height={20} className="text-white" />
                                    </div>
                                </div>
                                <p className='mb-2 text-muted'>Total Spend</p>
                                <div className='d-flex align-items-baseline'>
                                    <h4 className='mb-0 me-2 fs-20'>$100</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className='container-fluid mt-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='mb-0'>Submit Campaign</h5>
                    <button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#submitCampaignModal">Submit Campaign</button>
                </div>
            </div>
        </section>
        <SubmitCampaignModal />
        </>
    );
};

export default SubmitCampaigns;