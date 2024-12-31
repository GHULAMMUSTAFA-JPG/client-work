'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

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
                {/* <div className='d-flex align-items-center justify-content-between mb-3'>
                    <div className='d-flex gap-2'>
                        <button className='btn btn-info btn-sm'>
                            All (Recent) <span className='badge bg-white text-dark ms-1'>3</span>
                        </button>
                        <button className='btn btn-outline-light text-dark btn-sm'>
                            Activated <span className='badge bg-light text-dark ms-1'>5</span>
                        </button>
                        <button className='btn btn-outline-light text-dark btn-sm'>
                            Pending <span className='badge bg-light text-dark ms-1'>10</span>
                        </button>
                    </div>
                    <button className='btn btn-info btn-sm'>
                        Add Creators <Icon icon="material-symbols:add" width={20} height={20} />
                    </button>
                </div> */}

                <div className='card mb-4'>
                    <div className='card-body'>
                        <h5 className='mb-4'>Submit Campaign</h5>
                        <form onSubmit={handleSubmitWork}>
                            <div className='mb-3'>
                                <label className='form-label'>Campaign Link</label>
                                <input 
                                    type="url" 
                                    className='form-control' 
                                    placeholder='Enter the URL of your published content'
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Description</label>
                                <textarea 
                                    className='form-control' 
                                    rows={4}
                                    placeholder="Describe the work you've completed and any relevant details"
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <label className='form-label'>Upload Files</label>
                                {uploadedFiles.length === 0 ? (
                                    <div 
                                        className='cursor card-hover upload-area p-4 rounded-3 bg-white border border-dotted border-2 text-center cursor-pointer' 
                                        style={{maxWidth: '300px'}}
                                        onClick={() => document.getElementById('fileInput')?.click()}
                                    >
                                        <Icon icon="mdi:cloud-upload-outline" className='mb-2 text-muted' width={40} height={40} />
                                        <p className='mb-1 fs-12'>Drag and drop files here or click to browse</p>
                                        <input 
                                            id="fileInput"
                                            type="file" 
                                            className='d-none'
                                            multiple
                                            onChange={(e) => handleFileUpload(e)}
                                        />
                                        <p className='text-muted small mt-2 mb-0 fs-10'>Supported formats: JPEG, PNG, PDF (Max 10MB)</p>
                                    </div>
                                ) : (
                                    <div 
                                        className='align-items-center bg-white border border-2 border-dotted card-hover cursor cursor-pointer d-flex justify-content-center mb-3 p-4 rounded-3 text-center upload-area'
                                        style={{maxWidth: '100px'}}
                                        onClick={() => document.getElementById('fileInput')?.click()}
                                    >
                                        <button className='btn btn-outline-warning btn-sm border-dotted rounded-circle d-flex align-items-center justify-content-center' style={{width: '40px', height: '40px', padding: 0}}>
                                            <Icon icon="material-symbols:add" width={20} height={20}/>
                                        </button>
                                        <input 
                                            id="fileInput"
                                            type="file" 
                                            className='d-none'
                                            multiple
                                            onChange={(e) => handleFileUpload(e)}
                                        />
                                    </div>
                                )}

                                <div className='uploaded-files'>
                                    <div className='row g-3'>
                                        {uploadedFiles?.map((file, index) => (
                                            <div key={index} className='col-md-4 col-lg-3'>
                                                <div className='card h-100'>
                                                    <div className='position-relative'>
                                                        {file.type.includes('image') ? (
                                                            <img 
                                                                src={URL.createObjectURL(file)} 
                                                                className='card-img-top'
                                                                alt={file.name}
                                                                style={{height: '150px', objectFit: 'cover'}}
                                                            />
                                                        ) : (
                                                            <div className='card-img-top d-flex align-items-center justify-content-center bg-light' style={{height: '120px'}}>
                                                                <Icon icon="mdi:file-document-outline" width={40} height={40} />
                                                            </div>
                                                        )}
                                                        <button 
                                                            className='btn btn-sm btn-dark position-absolute top-0 end-0 m-2'
                                                            onClick={() => removeFile(index)}
                                                        >
                                                            <Icon icon="mdi:close" width={16} height={16} />
                                                        </button>
                                                    </div>
                                                    <div className='card-body p-2 border-top'>
                                                        <p className='small text-truncate mb-0'>{file.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <hr className='text-warning'/>
                            <div className='d-flex justify-content-end'>
                                <button className='btn btn-outline-info btn-sm me-2'>Cancel</button>
                                <button type='submit' className='btn btn-info btn-sm'>
                                    Submit Campaign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* <div className='card'>
                    <div className='card-body p-0'>
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Creator</th>
                                    <th>Status <Icon icon="mdi:arrow-up-down" /></th>
                                    <th>Amount / Budget</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='w-75'>
                                        <div className='d-flex align-items-center'>
                                            <div className='rounded-circle bg-secondary' style={{width: 40, height: 40}}></div>
                                            <div className='ms-3'>
                                                <div>John Doe</div>
                                                <div className='text-muted d-flex align-items-center fs-12'>
                                                    <Icon icon="mdi:linkedin" className='me-1 text-info' width={16} height={16} />
                                                    10K Followers
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="position-relative">
                                        <div className="dropdown">
                                            <span className='px-2 py-1 rounded rounded-pill bg-success text-white'>
                                                Activated
                                            </span>
                                        </div>
                                    </td>
                                    <td>$600</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default SubmitCampaigns;