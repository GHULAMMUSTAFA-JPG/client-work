"use client"

import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Topcard from '@/components/topcard';
import CampaignOffcanvasBuyer from '@/components/campaignoffcanvasbuyer';
import CampaignReviewModal from '@/components/campaignreviewmodal';


function buyerdashboard() {
    return (
        <>
            <section className='dashboard'>
                <div className='container-fluid'>
                    <Topcard />
                    <div className='row my-3'>
                        <div className='col-12'>
                            <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Publish Compaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Completed Campaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">Draft Campaigns</button>
                                </li>
                            </ul>
                            {/* <hr /> */}
                            <div className='row'>
                                <div className='col-12 mb-2'>
                                    <div className="tab-content " id="myTabContent">
                                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                            <div className='card listing-card'>
                                                <div className='card-body'>
                                                    <table className="table align-middle table-hover mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <p className='mb-0'>Initiated Nov 18, 2024</p>
                                                                    <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                </td>
                                                                <td>
                                                                    <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                                                </td>
                                                                <td>
                                                                    <p className='mb-0'>General Profile</p>
                                                                </td>
                                                                <td>
                                                                    <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                    <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                            <div className='card listing-card'>
                                                <div className='card-body'>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="settings-tab-pane" role="tabpanel" aria-labelledby="settings-tab" tabIndex={0}>
                                            <div className='card listing-card'>
                                                <div className='card-body'>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CampaignOffcanvasBuyer />
            <CampaignReviewModal />
        </>
    )
}
export default buyerdashboard
