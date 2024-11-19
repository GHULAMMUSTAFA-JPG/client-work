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



function Campaigns() {

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <TopCard />
                    <div className='row my-3'>
                        <div className='col-12'>
                            <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All Compaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Accepted Campaigns</button>
                                </li>
                            </ul>
                            {/* <hr /> */}
                            <div className='row'>
                                <div className='col-12 mb-2'>
                                    <div className="tab-content " id="myTabContent">
                                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                            <div className='card campaign-card'>
                                                <div className='campaign-post-wrapper' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <div className='campaign-post'>
                                                        <div className='d-flex'>
                                                            {/* <div className='dashboard-img-circle me-2'>
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div> */}
                                                            <div className='d-flex justify-content-between'>
                                                                <div>
                                                                    <h5>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Islamababd</p>
                                                                    </div>
                                                                    <p className='text-secondary fs-12 mb-2'>Jan 24, 2024 - July 25 2024</p>
                                                                    <p className='line-clamp-3 text-dark mb-3'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap mb-3'>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent    ">Backend developer</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                    </div>
                                                                    <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-2 icon-apply">
                                                                        <Icon icon="solar:arrow-right-broken" width={24} height={24} className='text-primary' />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning m-0' />
                                                </div>
                                                <div className='campaign-post-wrapper' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <div className='campaign-post'>
                                                        <div className='d-flex'>
                                                            {/* <div className='dashboard-img-circle me-2'>
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div> */}
                                                            <div className='d-flex justify-content-between'>
                                                                <div>
                                                                    <h5>Senior Digital Designer for SAAS Company</h5>
                                                                    {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1 text-warning' />
                                                                        <p className='mb-0 fs-12 text-secondary'>Islamababd</p>
                                                                    </div>
                                                                    <p className='text-secondary fs-12 mb-2'>Jan 24, 2024 - July 25 2024</p>
                                                                    <p className='line-clamp-3 text-dark mb-3'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                    <div className='d-flex gap-2 flex-wrap mb-3'>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Backend developer</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Front end developer</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">IT officer</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adobe Premire pro</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Software</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Adone After Effets</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Content Writing</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">Bootstrap</span>
                                                                        <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">SCSS</span>
                                                                    </div>
                                                                    <p className='mb-0 fs-12'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                    {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="btn border border-light fs-12 btn-sm rounded-circle p-2 icon-apply">
                                                                        <Icon icon="solar:arrow-right-broken" width={24} height={24} className='text-primary' />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning m-0' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                            <div className="table-responsive">
                                                <table className="table align-middle text-center mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="text-start ps-4">Creators</th>
                                                            <th scope="col">Connections</th>
                                                            <th scope="col">Followers</th>
                                                            <th scope="col">Impressions</th>
                                                            <th scope="col">Engagements</th>
                                                            {/* <th scope="col">Experience</th> */}
                                                            <th scope="col">Skills</th>
                                                            {/* <th scope="col">Reach</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* {Array.isArray(users) && users?.map((user: any) => (
                                                <tr key={user._id}>
                                                    <td className="text-start ps-4">
                                                        <div className="d-flex align-items-center">
                                                            <img src={user.Profile_Image} alt={user.Name} width={30} height={30} className="user-img img-fluid" />
                                                            <span className="ms-2 fw-medium">{user.Name}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center justify-content-center mb-2">
                                                            <span className="ms-2">{user.Name}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <Icon icon="mdi:linkedin" width={18} height={18} />

                                                            <span className="ms-2"> {user.Username}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="mb-2">{user.No_of_Followers.toLocaleString()}</p> */}
                                                        {/* <p className="mb-0">{user.No_of_Followers.toLocaleString()}</p> */}
                                                        {/* </td>
                                                    <td>
                                                        <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                        {/* </td>
                                                    <td> */}
                                                        {/* <p className="mb-2">{user?.Post_Reach}</p> */}
                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                        {/* </td>
                                                    <td> */}
                                                        {/* <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p>
                                                    </td>
                                                    <td> */}
                                                        {/* <p className="mb-2">{user.No_of_Likes.toLocaleString()}</p> */}
                                                        {/* <p className="mb-0">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                        {/* </td>
                                                    <td> */}
                                                        {/* <p className="mb-2">-</p> Replace with dynamic value if available */}
                                                        {/* <p className="mb-0">$1.4k</p> Replace with dynamic value if available */}
                                                        {/* </td>
                                                </tr>
                                            ))} */}
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                                    <span className="ms-2 fw-medium ">Billi Ellish</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {/* <div className="d-flex align-items-center justify-content-center">
                                                                    <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                                    <span className="ms-2 text-truncate">Billi Ellish</span>
                                                                </div> */}
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            {/* <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td> */}
                                                            <td className='table-badge'>
                                                                <div className='d-flex flex-wrap justify-content-center'>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                </div>
                                                            </td>
                                                            {/* <td>
                                                                <p className="mb-0">$1.4k</p>
                                                            </td> */}
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                                    <span className="ms-2 fw-medium ">Billi Ellish</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {/* <div className="d-flex align-items-center justify-content-center">
                                                                    <Icon icon="logos:youtube-icon" width={20} height={20} />
                                                                    <span className="ms-2 text-truncate">Billi Ellish</span>
                                                                </div> */}
                                                                <p className="mb-0 text-warning">213,3223</p>

                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            {/* <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td> */}
                                                            {/* <td>
                                                                <p className="mb-0">20k</p>
                                                            </td> */}
                                                            <td className='table-badge'>
                                                                <div className='d-flex flex-wrap justify-content-center'>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                                    <span className="ms-2  fw-medium">Billi Ellish</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {/* <div className="d-flex align-items-center justify-content-center">
                                                                    <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                                    <span className="ms-2 text-truncate">Billi Ellish</span>
                                                                </div> */}
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            {/* <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td> */}
                                                            <td className='table-badge'>
                                                                {/* <p className="mb-0">$1.4k</p> */}
                                                                <div className='d-flex flex-wrap justify-content-center'>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                                    <span className="ms-2  fw-medium">Billi Ellish</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {/* <div className="d-flex align-items-center justify-content-center mb-2">
                                                                    <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                                    <span className="ms-2 text-truncate">Billi Ellish</span>
                                                                </div>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Icon icon="logos:youtube-icon" width={20} height={20} />
                                                                    <span className="ms-2 text-truncate"> Billi Ellish</span>
                                                                </div> */}
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                {/* <p className="mb-2">213,3223</p> */}
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                {/* <p className="mb-2">103k</p> */}
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">103k</p>
                                                                {/* <p className="mb-0 text-warning">20k</p> */}
                                                            </td>
                                                            {/* <td> */}
                                                            {/* <p className="mb-2">103k</p> */}
                                                            {/* <p className="mb-0 text-warning">20k</p> */}
                                                            {/* </td> */}
                                                            <td className='table-badge'>
                                                                {/* <p className="mb-2">$2.2k</p>
                                                                <p className="mb-0">$1.4k</p> */}
                                                                <div className='d-flex flex-wrap justify-content-center'>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                                    <span className="ms-2  fw-medium">Billi Ellish</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {/* <div className="d-flex align-items-center justify-content-center mb-2">
                                                                    <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                                    <span className="ms-2 text-truncate">Billi Ellish</span>
                                                                </div>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Icon icon="logos:youtube-icon" width={20} height={20} />
                                                                    <span className="ms-2 text-truncate"> Billi Ellish</span>
                                                                </div> */}
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                {/* <p className="mb-2">103k</p> */}
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">103k</p>
                                                                {/* <p className="mb-0 text-warning">20k</p> */}
                                                            </td>
                                                            {/* <td> */}
                                                            {/* <p className="mb-2">103k</p> */}
                                                            {/* <p className="mb-0 text-warning">20k</p> */}
                                                            {/* </td> */}
                                                            <td className='table-badge'>
                                                                {/* <p className="mb-2">$2.2k</p>
                                                                <p className="mb-0">$1.4k</p> */}
                                                                <div className='d-flex flex-wrap justify-content-center'>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                                    <span className="ms-2  fw-medium">Billi Ellish</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {/* <div className="d-flex align-items-center justify-content-center">
                                                                    <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                                    <span className="ms-2 text-truncate">Billi Ellish</span>
                                                                </div> */}
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            {/* <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td> */}
                                                            <td className='table-badge'>
                                                                {/* <p className="mb-0">$1.4k</p> */}
                                                                <div className='d-flex flex-wrap justify-content-center'>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                                    <span className="ms-2  fw-medium">Billi Ellish</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {/* <div className="d-flex align-items-center justify-content-center">
                                                                    <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                                    <span className="ms-2 text-truncate">Billi Ellish</span>
                                                                </div> */}
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">213,3223</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td>
                                                            {/* <td>
                                                                <p className="mb-0 text-warning">20k</p>
                                                            </td> */}
                                                            <td className='table-badge'>
                                                                {/* <p className="mb-0">$1.4k</p> */}
                                                                <div className='d-flex flex-wrap justify-content-center'>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-success text-secondary me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='col-md-3 mb-2'>
                                    <ProfileCard />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <CampaignOffcanvas />
        </>
    );
}

export default Campaigns