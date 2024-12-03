"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';
import CampaignOffcanvas from '@/components/campaignoffcanvas';
import CampaignFilterModal from '@/components/campaignfiltermodal';



function Campaigns() {

    return (
        <>
            <section className='dashboard'>
                <div className='container-fluid'>
                    {/* <TopCard /> */}
                    <div className='row my-3'>
                        <div className='col-12'>
                            {/* <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All Compaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Accepted Campaigns</button>
                                </li>
                            </ul> */}
                            {/* <hr /> */}
                            <div className='row'>
                                <div className='col-12 mb-2'>
                                    <div className="tab-content " id="myTabContent">
                                        <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                            Submitted Campaigns (10)
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseOne" className="accordion-collapse show" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">
                                                            <table className="table align-middle table-hover">
                                                                <tbody>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                            Invitation to Campaigns (5)
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">
                                                            <table className="table align-middle table-hover">
                                                                <tbody>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                            Hired Campaigns (15)
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">
                                                            <table className="table align-middle table-hover">
                                                                <tbody>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                    <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='cursor'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <CampaignOffcanvas />
            <CampaignFilterModal />
        </>
    );
}

export default Campaigns