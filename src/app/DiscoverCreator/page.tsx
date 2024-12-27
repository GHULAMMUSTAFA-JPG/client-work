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
import ApplyModal from '@/components/ApplyModal';



function DiscoverCreator() {

    return (
        <>
            <section className='dashboard'>
                <div className='container-fluid'>
                    <div className='row my-3'>
                        <div className='col-12'>
                            <div className='d-flex align-items-center justify-content-between mb-3'>
                                <div className="position-relative w-25">
                                    <input type="email" className="form-control custom-input" id="exampleFormControlInput1" placeholder="Search for Campaigns" />
                                    <Icon icon="ph:magnifying-glass" width={16} height={16} className='text-secondary position-absolute top-50 start-0 translate-middle-y ms-3' />
                                    {/* <Icon icon="ph:x" width={20} height={20} className='text-secondary position-absolute top-50 end-0 translate-middle-y me-3 cursor' /> */}
                                    {/* <Icon icon="akar-icons:settings-vertical" width={20} height={20} className='text-primary position-absolute top-50 end-0 translate-middle-y me-3 cursor' data-bs-toggle="modal" data-bs-target="#exampleModal" /> */}
                                </div>
                                <select className="form-select custom-select" aria-label="Small select example">
                                    <option selected>Most Popular</option>
                                    <option value="1">Newest</option>
                                    <option value="2">Oldest</option>
                                </select>
                                {/* <button className='btn btn-primary rounded-pill d-flex align-items-center' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <Icon icon="akar-icons:settings-vertical" width={20} height={20} />
                                    <span className='ms-2'>Advanced Filters</span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div className='row g-2 mb-3'>
                        <div className='col-md-4'>
                            <div className='card card-hover'>
                                <div className='card-body'>
                                    <div className='d-flex gap-2 mb-4'>
                                        <Image
                                            src="/assets/images/hubspot.svg"
                                            className="border object-fit-cover rounded-circle flex-shrink-0"
                                            alt="logo"
                                            width={40}
                                            height={40}
                                        />
                                        <div className='flex-grow-1'>
                                            <p className='fw-medium mb-0 fs-16'>HubSpot: Join our Creator Program</p>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 text-warning'>Hubspot</p>
                                                <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-3' />
                                                <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-2' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-2'>
                                        <Icon icon="icon-park-outline:search" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>Customer Success, Sales, Marketing</p>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-3'>
                                        <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>LinkedIn, X/Twitter</p>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-outline-info btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal">Detail</button>
                                        <button className='btn btn-info ms-2 btn-sm' data-bs-toggle="modal" data-bs-target="#applyModal">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card card-hover'>
                                <div className='card-body'>
                                    <div className='d-flex gap-2 mb-4'>
                                        <Image
                                            src="/assets/images/apollo.png"
                                            className="border object-fit-cover rounded-circle flex-shrink-0"
                                            alt="logo"
                                            width={40}
                                            height={40}
                                        />
                                        <div className='flex-grow-1'>
                                            <p className='fw-medium mb-0 fs-16'>Apollo: Join our Creator Program</p>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 text-warning'>Apollo.io</p>
                                                <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-3' />
                                                <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-2' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-2'>
                                        <Icon icon="icon-park-outline:search" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>Customer Success, Sales, Marketing</p>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-3'>
                                        <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>LinkedIn, X/Twitter</p>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-outline-info btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal">Detail</button>
                                        <button className='btn btn-info ms-2 btn-sm' data-bs-toggle="modal" data-bs-target="#applyModal">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card card-hover'>
                                <div className='card-body'>
                                    <div className='d-flex gap-2 mb-4'>
                                        <Image
                                            src="/assets/images/statsig.png"
                                            className="border object-fit-cover rounded-circle flex-shrink-0"
                                            alt="logo"
                                            width={40}
                                            height={40}
                                        />
                                        <div className='flex-grow-1'>
                                            <p className='fw-medium mb-0 fs-16'>Statsig | Experimentation Awareness</p>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 text-warning'>Statsig</p>
                                                <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-3' />
                                                <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-2' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-2'>
                                        <Icon icon="icon-park-outline:search" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>Customer Success, Sales, Marketing</p>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-3'>
                                        <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>LinkedIn, X/Twitter</p>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-outline-info btn-sm'>Detail</button>
                                        <button className='btn btn-info ms-2 btn-sm'>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card card-hover'>
                                <div className='card-body'>
                                    <div className='d-flex gap-2 mb-4'>
                                        <Image
                                            src="/assets/images/lemlist.png"
                                            className="border object-fit-cover rounded-circle flex-shrink-0"
                                            alt="logo"
                                            width={40}
                                            height={40}
                                        />
                                        <div className='flex-grow-1'>
                                            <p className='fw-medium mb-0 fs-16'>lemlist: Creator Program</p>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 text-warning'>lemlist</p>
                                                <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-3' />
                                                <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-2' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-2'>
                                        <Icon icon="icon-park-outline:search" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>Customer Success, Sales, Marketing</p>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-3'>
                                        <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>LinkedIn, X/Twitter</p>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-outline-info btn-sm'>Detail</button>
                                        <button className='btn btn-info ms-2 btn-sm'>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card card-hover'>
                                <div className='card-body'>
                                    <div className='d-flex gap-2 mb-4'>
                                        <Image
                                            src="/assets/images/avoma.png"
                                            className="border object-fit-cover rounded-circle flex-shrink-0"
                                            alt="logo"
                                            width={40}
                                            height={40}
                                        />
                                        <div className='flex-grow-1'>
                                            <p className='fw-medium mb-0 fs-16'>
                                                Avoma - Growth Acceleration Platform</p>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 text-warning'>Avoma</p>
                                                <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-3' />
                                                <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-2' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-2'>
                                        <Icon icon="icon-park-outline:search" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>Customer Success, Sales, Marketing</p>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-3'>
                                        <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>LinkedIn, X/Twitter</p>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-outline-info btn-sm'>Detail</button>
                                        <button className='btn btn-info ms-2 btn-sm'>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card card-hover'>
                                <div className='card-body'>
                                    <div className='d-flex gap-2 mb-4'>
                                        <Image
                                            src="/assets/images/avacast.png"
                                            className="border object-fit-cover rounded-circle flex-shrink-0"
                                            alt="logo"
                                            width={40}
                                            height={40}
                                        />
                                        <div className='flex-grow-1'>
                                            <p className='fw-medium mb-0 fs-16'>Acast: General Application</p>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 text-warning'>Acast</p>
                                                <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-3' />
                                                <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-2' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-2'>
                                        <Icon icon="icon-park-outline:search" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>Customer Success, Sales, Marketing</p>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-3'>
                                        <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>LinkedIn, X/Twitter</p>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-outline-info btn-sm'>Detail</button>
                                        <button className='btn btn-info ms-2 btn-sm'>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card card-hover'>
                                <div className='card-body'>
                                    <div className='d-flex gap-2 mb-4'>
                                        <Image
                                            src="/assets/images/intercom.png"
                                            className="border object-fit-cover rounded-circle flex-shrink-0"
                                            alt="logo"
                                            width={40}
                                            height={40}
                                        />
                                        <div className='flex-grow-1'>
                                            <p className='fw-medium mb-0 fs-16'>Intercom | Creator Program</p>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 text-warning'>Intercom for Startups</p>
                                                <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-3' />
                                                <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-2' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-2'>
                                        <Icon icon="icon-park-outline:search" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>Customer Success, Sales, Marketing</p>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-3'>
                                        <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>LinkedIn, X/Twitter</p>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-outline-info btn-sm'>Detail</button>
                                        <button className='btn btn-info ms-2 btn-sm'>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card card-hover'>
                                <div className='card-body'>
                                    <div className='d-flex gap-2 mb-4'>
                                        <Image
                                            src="/assets/images/chili_piper.png"
                                            className="border object-fit-cover rounded-circle flex-shrink-0"
                                            alt="logo"
                                            width={40}
                                            height={40}
                                        />
                                        <div className='flex-grow-1'>
                                            <p className='fw-medium mb-0 fs-16'>Chili Piper: SpicyOps Creator Programm</p>
                                            <div className='d-flex align-items-center'>
                                                <p className='mb-0 text-warning'>Chiil Piper</p>
                                                <Icon icon="mdi:linkedin" width={18} height={18} className='text-info ms-3' />
                                                <Icon icon="mdi:web" width={18} height={18} className='text-warning ms-2' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-2'>
                                        <Icon icon="icon-park-outline:search" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>Customer Success, Sales, Marketing</p>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center mb-3'>
                                        <Icon icon="tabler:arrows-cross" width={14} height={14} className='text-gray' />
                                        <p className='mb-0'>LinkedIn, X/Twitter</p>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-outline-info btn-sm'>Detail</button>
                                        <button className='btn btn-info ms-2 btn-sm'>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <CampaignOffcanvas />
            <CampaignFilterModal />
            <ApplyModal />
        </>
    );
}

export default DiscoverCreator