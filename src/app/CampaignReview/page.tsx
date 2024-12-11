"use client"

import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from 'next/image'
function CampaignOverview({ setCampaigns }: any) {
    return (
        <section className='dashboard'>
            <div className='container-fluid'>
                <div className='d-flex align-items-center justify-content-between my-3'>
                    <a href="#" className='text-dark text-decoration-none d-flex align-items-center'>
                        <Icon icon="akar-icons:arrow-left" width={18} height={18} />
                        <span className='ms-2' onClick={() => setCampaigns(true)}>All Campaigns</span>
                    </a>
                    <div className='d-flex align-items-center'>
                        <span>Budget: <strong>$100</strong></span>
                        <div className="vr mx-3 vr-public"></div>
                        <span className='me-3'>Public</span>
                        <div className='form-check form-switch mb-0'>
                            <input className='form-check-input' type='checkbox' id='publicSwitch' checked />
                        </div>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                    <h5 className='mb-0'>Help us launch our new marketplace for IRL advertising</h5>
                    <button className='btn btn-outline-dark fs-12 btn-sm ms-3'>
                        Edit Campaign <Icon icon="ri:settings-4-line" width={16} height={16} />
                    </button>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                <p className='mb-3 text-muted text-start'>Impressions</p>
                                <h5>10</h5>
                                {/* <a href="#" className='text-dark'>Analytics <Icon icon="akar-icons:arrow-right" width={16} height={16} /></a> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                <p className='mb-3 text-muted text-start'>New Applications</p>
                                <h5>0</h5>
                                {/* <a href="#" className='text-dark'>Review <Icon icon="akar-icons:arrow-right" width={16} height={16} /></a> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                <p className='mb-3 text-muted text-start'>Activated Creators</p>
                                <h5>2</h5>
                                {/* <p className='mb-0'>0 in discussion</p> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                <p className='mb-3 text-muted text-start'>Total Spend</p>
                                <h5>$10</h5>
                                {/* <span className='badge bg-light text-dark'>Beta</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid mt-4'>
                {/* Filter Pills */}
                <div className='d-flex align-items-center justify-content-between mb-3'>
                    <div className='d-flex gap-2'>
                        <button className='btn btn-info btn-sm'>
                            All (Recent) <span className="badge bg-white text-dark ms-1">2</span>
                        </button>
                        <button className='btn btn-outline-light text-dark btn-sm'>
                            Activated <span className="badge bg-light text-dark ms-1">1</span>
                        </button>
                        <button className='btn btn-outline-light text-dark btn-sm'>
                            In Discussion <span className="badge bg-light text-dark ms-1">0</span>
                        </button>
                        <button className='btn btn-outline-light text-dark btn-sm'>
                            Contacted <span className="badge bg-light text-dark ms-1">0</span>
                        </button>
                        <button className='btn btn-outline-light text-dark btn-sm'>
                            To Contact <span className="badge bg-light text-dark ms-1">0</span>
                        </button>
                        <button className='btn btn-outline-light text-dark btn-sm'>
                            Not Fit <span className="badge bg-light text-dark ms-1">1</span>
                        </button>
                    </div>
                    <button className='btn btn-primary btn-sm'>
                        Add Creators <Icon icon="material-symbols:add" width={20} height={20} />
                    </button>
                </div>

                {/* Table */}
                <div className='card'>
                    <div className='card-body p-0'>
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Creator</th>
                                    <th>Status <Icon icon="mdi:arrow-up-down" /></th>
                                    <th>Amount / Budget</th>
                                    {/* <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='w-75'>
                                        <div className='d-flex align-items-center'>
                                            <Image
                                                src="/assets/images/user.jpg"
                                                className="rounded-circle"
                                                width={40}
                                                height={40}
                                                alt="User avatar"
                                                priority
                                            />
                                            <div className='ms-3'>
                                                <div>Adam Biddlecombe</div>
                                                <div className='text-muted d-flex align-items-center fs-12'>
                                                    <Icon icon="mdi:linkedin" className='me-1 text-info' width={16} height={16} />
                                                    122.1k
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='text-primary'>Activated</span>
                                    </td>
                                    <td>$0</td>
                                    {/* <td>
                                            <Icon icon="material-symbols:chat-outline" className='me-2 cursor-pointer' width={20} />
                                            <Icon icon="mdi:dots-horizontal" className='cursor-pointer' width={20} />
                                        </td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CampaignOverview