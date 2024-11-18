"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";



function CreatorDashboard() {

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <div className='row my-3'>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body ">
                                    <div className="row align-items-center">
                                        <div className="col-sm-6 col-md-6 col-xl-2">
                                            {/* <p className="mb-2 fw-medium fs-12">Campaign Creators</p> */}
                                            <div className="hero-circle mx-xl-auto mx-md-0">
                                                {/* <img src="../assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" /> */}
                                                <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={90} height={90} />

                                            </div>

                                        </div>
                                        <div className="col-sm-6 col-md-6 col-xl-3">
                                            <p className="mb-2 fw-medium fs-12 ">Network Reach</p>
                                            <div className="d-flex align-items-center">
                                                <Icon icon="tabler:users" width={32} height={32} className='' />
                                                <div className="ms-2">
                                                    {/* <p className="mb-0 fs-12"><span className="fs-14 fw-medium text-dark me-1">50.1</span></p> */}
                                                    <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">50</span>Connections</p>
                                                    <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">30</span>Followers</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-xl-3">
                                            <p className="mb-2 fw-medium fs-12 ">Post Frequency Tracker</p>
                                            <div className="d-flex align-items-center">
                                                <Icon icon="akar-icons:video" width={32} height={32} className='' />
                                                <div className="ms-2">
                                                    <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">90</span>Total Post</p>
                                                    <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">10</span>Post Frequency</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-xl-3">
                                            <p className="mb-2 fw-medium fs-12 ">Social Media Posts</p>
                                            <div className="d-flex align-items-center">
                                                <Icon icon="iconoir:post" width={32} height={32} className='' />
                                                <div className="ms-2">
                                                    <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">504.6</span>Impressions</p>
                                                    <p className="mb-0 text-warning fs-12 d-flex align-items-center"><span className="fs-14 fw-medium  me-1">20.45</span>Engagements</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row my-3'>
                        <div className='col-12'>
                            <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Compaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">My Company</button>
                                </li>
                            </ul>
                            {/* <hr /> */}
                            <div className='row'>
                                <div className='col-md-9 mb-2'>
                                    <div className="tab-content " id="myTabContent">
                                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                            <div className='card'>
                                                <div className='card-body creator-scroll'>
                                                    <div className='d-flex'>
                                                        {/* <img src="../assets/images/logo.png" className="img-fluid creator-img me-2" alt="logo" /> */}
                                                        <div className='dashboard-img-circle me-2'>
                                                            {/* <img src="../assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" /> */}
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-baseline'>
                                                            <div className=''>
                                                                <h6 className='mb-0 '>Senior Digital Designer</h6>
                                                                {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                <div className='d-flex align-items-center mb-2'>
                                                                    <Icon icon="tdesign:location" className='me-1 ' />
                                                                    <p className='mb-0 fs-12 '>Islamababd</p>
                                                                </div>
                                                                <p className='line-clamp-3 text-warning fs-12 mb-2'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                </p>
                                                                <div className='mb-2'>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Front end</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">IT officer</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                </div>
                                                                <p className='mb-0 fs-9'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                            </div>
                                                            <div>
                                                                <button type="button" className="btn btn-dark fs-12 btn-sm  border">Apply</button>
                                                                {/* <span className="badge  bg-dark fw-normal cursor">Apply</span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning' />
                                                    <div className='d-flex'>
                                                        {/* <img src="../assets/images/logo.png" className="img-fluid creator-img me-2" alt="logo" /> */}
                                                        <div className='dashboard-img-circle me-2'>
                                                            {/* <img src="../assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" /> */}
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-baseline'>
                                                            <div className='mt-2'>
                                                                <h6 className='mb-0 '>Senior Digital Designer</h6>
                                                                {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                <div className='d-flex align-items-center mb-2'>
                                                                    <Icon icon="tdesign:location" className='me-1 ' />
                                                                    <p className='mb-0 fs-12 '>Islamababd</p>
                                                                </div>
                                                                <p className='line-clamp-3 text-warning fs-12 mb-2'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                </p>
                                                                <div className='mb-2'>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Front end</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">IT officer</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                </div>
                                                                <p className='mb-0 fs-9'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                            </div>
                                                            <div>
                                                                <button type="button" className="btn btn-dark fs-12 btn-sm  border">Apply</button>
                                                                {/* <span className="badge  bg-dark fw-normal cursor">Apply</span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning' />
                                                    <div className='d-flex'>
                                                        {/* <img src="../assets/images/logo.png" className="img-fluid creator-img me-2" alt="logo" /> */}
                                                        <div className='dashboard-img-circle me-2'>
                                                            {/* <img src="../assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" /> */}
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-baseline'>
                                                            <div className='mt-2'>
                                                                <h6 className='mb-0 '>Senior Digital Designer</h6>
                                                                {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                <div className='d-flex align-items-center mb-2'>
                                                                    <Icon icon="tdesign:location" className='me-1 ' />
                                                                    <p className='mb-0 fs-12 '>Islamababd</p>
                                                                </div>
                                                                <p className='line-clamp-3 text-warning fs-12 mb-2'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                </p>
                                                                <div className='mb-2'>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Front end</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">IT officer</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                </div>
                                                                <p className='mb-0 fs-9'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                            </div>
                                                            <div>
                                                                <button type="button" className="btn btn-dark fs-12 btn-sm  border">Apply</button>
                                                                {/* <span className="badge  bg-dark fw-normal cursor">Apply</span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning' />
                                                    <div className='d-flex'>
                                                        {/* <img src="../assets/images/logo.png" className="img-fluid creator-img me-2" alt="logo" /> */}
                                                        <div className='dashboard-img-circle me-2'>
                                                            {/* <img src="../assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" /> */}
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-baseline'>
                                                            <div className='mt-2'>
                                                                <h6 className='mb-0 '>Senior Digital Designer</h6>
                                                                {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                <div className='d-flex align-items-center mb-2'>
                                                                    <Icon icon="tdesign:location" className='me-1 ' />
                                                                    <p className='mb-0 fs-12 '>Islamababd</p>
                                                                </div>
                                                                <p className='line-clamp-3 text-warning fs-12 mb-2'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                </p>
                                                                <div className='mb-2'>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Front end</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">IT officer</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                </div>
                                                                <p className='mb-0 fs-9'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                            </div>
                                                            <div>
                                                                <button type="button" className="btn btn-dark fs-12 btn-sm  border">Apply</button>
                                                                {/* <span className="badge  bg-dark fw-normal cursor">Apply</span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning' />
                                                    <div className='d-flex'>
                                                        {/* <img src="../assets/images/logo.png" className="img-fluid creator-img me-2" alt="logo" /> */}
                                                        <div className='dashboard-img-circle me-2'>
                                                            {/* <img src="../assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" /> */}
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-baseline'>
                                                            <div className='mt-2'>
                                                                <h6 className='mb-0 '>Senior Digital Designer</h6>
                                                                {/* <p className='mb-0'>Halal Company ltd</p> */}
                                                                <div className='d-flex align-items-center mb-2'>
                                                                    <Icon icon="tdesign:location" className='me-1 ' />
                                                                    <p className='mb-0 fs-12 '>Islamababd</p>
                                                                </div>
                                                                <p className='line-clamp-3 text-warning fs-12 mb-2'>
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                </p>
                                                                <div className='mb-2'>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Front end</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">IT officer</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                                </div>
                                                                <p className='mb-0 fs-9'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                                                {/* <div className='d-flex align-items-center'>
                                                                    <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' />
                                                                    <p className='fs-9 mb-0 text-warning me-2'>payment verified</p>
                                                                    <p className='fs-9 mb-0'>$10k+ <span className='text-warning'>spent</span></p>
                                                                </div> */}
                                                            </div>
                                                            <div>
                                                                <button type="button" className="btn btn-dark fs-12 btn-sm  border">Apply</button>
                                                                {/* <span className="badge  bg-dark fw-normal cursor">Apply</span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='text-warning' />
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
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
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
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
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
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
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
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
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
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
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
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
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
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                    <span className="badge bg-info me-1 rounded-pill fw-light mb-1">Backend</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 mb-2'>
                                    <div className="card">
                                        <div className='card-header bg-transparent border-warning'>
                                            <div className='dashboard-img-circle mx-auto mb-2'>
                                                {/* <img src="../assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" /> */}
                                                <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                            </div>
                                            <p className='mb-1 text-center fs-16 '>Peterson</p>
                                            <p className='text-warning fs-12 text-center mb-1'>Frontend Developer</p>
                                            <div className='d-flex align-items-center justify-content-center text-warning mb-1'>
                                                <Icon icon="tdesign:location" className='me-1 text-warning' />
                                                <p className='mb-0 fs-12'>Islamababd</p>
                                            </div>
                                            <p className='text-primary mb-0 text-center fs-12'>50 Connects</p>
                                            <p className='text-primary mb-0 text-center fs-12'>10 Followers</p>
                                        </div>
                                        <div className="card-body sidecard-scroll">

                                            <div className='d-flex'>
                                                <div>
                                                    <p className='mb-1 me-1 '>Skills:</p>
                                                </div>
                                                <div>
                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Front end</span>
                                                    <span className="badge bg-info me-1 rounded-pill fw-light">IT</span>
                                                    <span className="badge bg-info me-1 rounded-pill fw-light">UI</span>
                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                    <span className="badge bg-info me-1 rounded-pill fw-light">UX</span>
                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                    <span className="badge bg-info me-1 rounded-pill fw-light">Software</span>
                                                </div>
                                            </div>
                                            <hr className='text-warning' />
                                            <p className='mb-1 me-1 '>Experience:</p>
                                            <div className='mb-1'>
                                                <p className='mb-0 fs-12 '>Company </p>
                                                <p className='text-warning fs-12 mb-0'>Funavry Technologies</p>
                                            </div>
                                            <div className='mb-1'>
                                                <p className='mb-0 fs-12 '>Position</p>
                                                <p className='text-warning fs-12 mb-0'>Software Trainee Engineer</p>
                                            </div>
                                            <div className='mb-1'>
                                                <p className='mb-0 fs-12 '>Employment Type</p>
                                                <p className='text-warning fs-12 mb-0'>Full-Time</p>
                                            </div>
                                            {/* <div className='mb-1'>
                                                <p className='mb-0 fs-12 '>Start Date</p>
                                                <p className='text-warning fs-12 mb-0'>Aug 2024</p>
                                            </div>
                                            <div className='mb-1'>
                                                <p className='mb-0 fs-12 '>End Date</p>
                                                <p className='text-warning fs-12 mb-0'>Aug 2024</p>
                                            </div>
                                            <div className='mb-1'>
                                                <p className='mb-0 fs-12 '>End Date</p>
                                                <p className='text-warning fs-12 mb-0'>Aug 2024</p>
                                            </div>
                                            <div className='mb-1'>
                                                <p className='mb-0 fs-12 '>End Date</p>
                                                <p className='text-warning fs-12 mb-0'>Aug 2024</p>
                                            </div> */}
                                            <hr className='text-warning' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}

export default CreatorDashboard