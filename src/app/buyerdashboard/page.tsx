"use client"

import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";



function buyerdashboard ()  {
    return (
        <section className='dashboard'>
            <div className='container'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row align-items-center">
                                    <div className="col-sm-6 col-md-6 col-xl-3">
                                        <p className="mb-2 fw-medium fs-12">Campaign Creators</p>
                                        <div className="d-flex">
                                            {/* {users.slice(0, 4).map((user, index) => (
                                            <img
                                                key={index}
                                                src={user.Profile_Image}
                                                alt={`User ${index + 1}`}
                                                width={50}
                                                height={50}
                                                className="creator-img img-fluid margin-overlap"
                                            />
                                        ))} */}
                                        </div>

                                    </div>
                                    <div className="col-sm-6 col-md-6 col-xl-3">
                                        <p className="mb-2 fw-medium fs-12">Creators Score</p>
                                        <div className="d-flex align-items-center">
                                            <Icon icon="tabler:users" width={32} height={32} />
                                            <div className="ms-2">
                                                <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">$50.1k</span>Earned Media Value</p>
                                                <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">$3.1k</span>Payout</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-xl-3">
                                        <p className="mb-2 fw-medium fs-12">Videos & Media</p>
                                        <div className="d-flex align-items-center">
                                            <Icon icon="akar-icons:video" width={32} height={32} />
                                            <div className="ms-2">
                                                <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">5k</span>Views</p>
                                                <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">205</span>Engagements</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-xl-3">
                                        <p className="mb-2 fw-medium fs-12">Social Media Posts</p>
                                        <div className="d-flex align-items-center">
                                            <Icon icon="iconoir:post" width={32} height={32} />
                                            <div className="ms-2">
                                                <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">$504.6k</span>Impressions</p>
                                                <p className="mb-0 text-muted fs-12 d-flex align-items-center"><span className="fs-14 fw-medium text-dark me-1">$20.45k</span>Engagements</p>
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
                        <ul className="nav nav-underline mb-2" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Compaigns</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Solo Creator</button>
                            </li>
                        </ul>
                        <hr />
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="tab-content " id="myTabContent">
                                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                        <div className='card border-0'>
                                            <div className='card-header border-0 bg-transparent mt-2'>
                                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Create New Company</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">View All Previews</button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='card-body creator-scroll'>
                                                <div className="tab-content" id="pills-tabContent">
                                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <div className="mb-3">
                                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="First Name" />
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <div className="mb-3">
                                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Last Name" />
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <div className="mb-3">
                                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder='Description'></textarea>
                                                                </div>
                                                            </div>
                                                            <div className='col-12 text-center'>
                                                                <button className="btn btn-dark text-white" type="button">Submit Data</button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                                                        <div className='d-flex'>
                                                            <Image src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
                                                            <div className='d-flex justify-content-between align-items-baseline'>
                                                                <div className='mt-2'>
                                                                    <h6 className='mb-0'>Senior Digital Designer</h6>
                                                                    <p className='mb-0'>Halal Company ltd</p>
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1' />
                                                                        <p className='mb-0 fs-12'>Islamababd</p>
                                                                    </div>
                                                                    <p className='line-clamp-3 text-dark fs-12 mb-0'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    {/* <button type="button" className="btn btn-primary btn-sm text-white">Apply</button> */}
                                                                    <span className="badge text-white bg-dark fw-normal cursor">Apply</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='d-flex'>
                                                            <Image src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
                                                            <div className='d-flex justify-content-between align-items-baseline'>
                                                                <div className='mt-2'>
                                                                    <h6 className='mb-0'>Senior Digital Designer</h6>
                                                                    <p className='mb-0'>Halal Company ltd</p>
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1' />
                                                                        <p className='mb-0 fs-12'>Islamababd</p>
                                                                    </div>
                                                                    <p className='line-clamp-3 text-dark fs-12 mb-0'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    {/* <button type="button" className="btn btn-primary btn-sm text-white">Apply</button> */}
                                                                    <span className="badge text-white bg-dark fw-normal cursor">Apply</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='d-flex'>
                                                            <Image src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
                                                            <div className='d-flex justify-content-between align-items-baseline'>
                                                                <div className='mt-2'>
                                                                    <h6 className='mb-0'>Senior Digital Designer</h6>
                                                                    <p className='mb-0'>Halal Company ltd</p>
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1' />
                                                                        <p className='mb-0 fs-12'>Islamababd</p>
                                                                    </div>
                                                                    <p className='line-clamp-3 text-dark fs-12 mb-0'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    {/* <button type="button" className="btn btn-primary btn-sm text-white">Apply</button> */}
                                                                    <span className="badge text-white bg-dark fw-normal cursor">Apply</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='d-flex'>
                                                            <Image src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
                                                            <div className='d-flex justify-content-between align-items-baseline'>
                                                                <div className='mt-2'>
                                                                    <h6 className='mb-0'>Senior Digital Designer</h6>
                                                                    <p className='mb-0'>Halal Company ltd</p>
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1' />
                                                                        <p className='mb-0 fs-12'>Islamababd</p>
                                                                    </div>
                                                                    <p className='line-clamp-3 text-dark fs-12 mb-0'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    {/* <button type="button" className="btn btn-primary btn-sm text-white">Apply</button> */}
                                                                    <span className="badge text-white bg-dark fw-normal cursor">Apply</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='d-flex'>
                                                            <Image src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
                                                            <div className='d-flex justify-content-between align-items-baseline'>
                                                                <div className='mt-2'>
                                                                    <h6 className='mb-0'>Senior Digital Designer</h6>
                                                                    <p className='mb-0'>Halal Company ltd</p>
                                                                    <div className='d-flex align-items-center mb-2'>
                                                                        <Icon icon="tdesign:location" className='me-1' />
                                                                        <p className='mb-0 fs-12'>Islamababd</p>
                                                                    </div>
                                                                    <p className='line-clamp-3 text-dark fs-12 mb-0'>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently versions of Lorem Ipsum
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    {/* <button type="button" className="btn btn-primary btn-sm text-white">Apply</button> */}
                                                                    <span className="badge text-white bg-dark fw-normal cursor">Apply</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                        ---
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default buyerdashboard
