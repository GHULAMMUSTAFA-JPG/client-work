"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";



const CreatorDashboard = () => {

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <div className='row my-3'>
                        <div className="col-12">
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
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Company Dasboard</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">My Company</button>
                                </li>
                            </ul>
                            <hr/>
                            <div className="card">
                                <div className="card-body creator-scroll">

                                    <div className="tab-content " id="myTabContent">
                                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                            <div className='d-flex'>
                                                <img src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
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
                                                <img src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
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
                                                <img src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
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
                                                <img src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
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
                                                <img src="../assets/images/logo1.svg" className="creator-img" alt="logo" />
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
                                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                        <div className="table-responsive">
                                    <table className="table align-middle text-center mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-start ps-4">Campaign Creators</th>
                                                <th scope="col">Social Platform</th>
                                                <th scope="col">Followers</th>
                                                <th scope="col">Impressions</th>
                                                <th scope="col">Reach</th>
                                                <th scope="col">Engagements</th>
                                                <th scope="col">Likes</th>
                                                <th scope="col">Social Media Value</th>
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
                                                        <span className="ms-2 text-truncate fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2 text-truncate">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 text-truncate fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="logos:youtube-icon" width={20} height={20} />
                                                        <span className="ms-2 text-truncate">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 text-truncate fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2 text-truncate">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 text-truncate fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2 text-truncate">Billi Ellish</span>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="logos:youtube-icon" width={20} height={20} />
                                                        <span className="ms-2 text-truncate"> Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-2">213,3223</p>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">$2.2k</p>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 text-truncate fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2 text-truncate">Billi Ellish</span>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="logos:youtube-icon" width={20} height={20} />
                                                        <span className="ms-2 text-truncate"> Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-2">213,3223</p>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">$2.2k</p>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 text-truncate fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2 text-truncate">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 text-truncate fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2 text-truncate">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
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
            </section>
        </>
    );
}

export default CreatorDashboard