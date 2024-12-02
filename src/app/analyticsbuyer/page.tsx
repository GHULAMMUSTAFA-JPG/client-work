"use client"

import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import CampaignOffcanvasBuyer from '@/components/campaignoffcanvasbuyer';
import Image from "next/image";


const page = () => {
  return (
    <>
      <section className='active-compaigns'>
        <div className='container-fluid'>
          <div className='row my-3'>
            <div className='col-12'>
              <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Compaigns</button>
                </li>
                {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Completed Campaigns</button>
                                </li> */}
                {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">Draft Campaigns</button>
                                </li> */}
                {/* <li className='nav-item ms-auto'>
                                    <button className='btn btn-primary btn-sm' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">Create new campaign</button>
                                </li> */}
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
                                  <p className='mb-0'> Nov 18, 2024</p>
                                  {/* <p className='fs-12 text-warning mb-0'>2 hours ago</p> */}
                                </td>
                                <td>
                                  <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                </td>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <div>
                                      <p className='mb-0'>0</p>
                                      <p className='fs-12 text-primary mb-0'>Post Approved</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>1</p>
                                      <p className='fs-12 text-danger mb-0'>Post Rejected</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>2</p>
                                      <p className='fs-12 text-orange mb-0'>Waiting for Approvals</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>3</p>
                                      <p className='fs-12 text-info mb-0'>Hired</p>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                  <Icon icon="ion:arrow-up-right-box-outline" width={24} height={24} className='text-warning cursor ms-3' />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p className='mb-0'> Nov 18, 2024</p>
                                  {/* <p className='fs-12 text-warning mb-0'>2 hours ago</p> */}
                                </td>
                                <td>
                                  <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                </td>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <div>
                                      <p className='mb-0'>0</p>
                                      <p className='fs-12 text-primary mb-0'>Post Approved</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>0</p>
                                      <p className='fs-12 text-danger mb-0'>Post Rejected</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>0</p>
                                      <p className='fs-12 text-orange mb-0'>Waiting for Approvals</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>1</p>
                                      <p className='fs-12 text-info mb-0'>Hired</p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                  <Icon icon="ion:arrow-up-right-box-outline" width={24} height={24} className='text-warning cursor ms-3' />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p className='mb-0'> Nov 18, 2024</p>
                                  {/* <p className='fs-12 text-warning mb-0'>2 hours ago</p> */}
                                </td>
                                <td>
                                  <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                </td>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <div>
                                      <p className='mb-0'>2</p>
                                      <p className='fs-12 text-primary mb-0'>Post Approved</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>4</p>
                                      <p className='fs-12 text-danger mb-0'>Post Rejected</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>2</p>
                                      <p className='fs-12 text-orange mb-0'>Waiting for Approvals</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>2</p>
                                      <p className='fs-12 text-info mb-0'>Hired</p>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                  <Icon icon="ion:arrow-up-right-box-outline" width={24} height={24} className='text-warning cursor ms-3' />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p className='mb-0'> Nov 18, 2024</p>
                                  {/* <p className='fs-12 text-warning mb-0'>2 hours ago</p> */}
                                </td>
                                <td>
                                  <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                </td>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <div>
                                      <p className='mb-0'>5</p>
                                      <p className='fs-12 text-primary mb-0'>Post Approved</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>10</p>
                                      <p className='fs-12 text-danger mb-0'>Post Rejected</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>15</p>
                                      <p className='fs-12 text-orange mb-0'>Waiting for Approvals</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>9</p>
                                      <p className='fs-12 text-info mb-0'>Hired</p>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                  <Icon icon="ion:arrow-up-right-box-outline" width={24} height={24} className='text-warning cursor ms-3' />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p className='mb-0'> Nov 18, 2024</p>
                                  {/* <p className='fs-12 text-warning mb-0'>2 hours ago</p> */}
                                </td>
                                <td>
                                  <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                </td>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <div>
                                      <p className='mb-0'>6</p>
                                      <p className='fs-12 text-primary mb-0'>Post Approved</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>2</p>
                                      <p className='fs-12 text-danger mb-0'>Post Rejected</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>3</p>
                                      <p className='fs-12 text-orange mb-0'>Waiting for Approvals</p>
                                    </div>
                                    <div className='ms-4'>
                                      <p className='mb-0'>5</p>
                                      <p className='fs-12 text-info mb-0'>Hired</p>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                  <Icon icon="ion:arrow-up-right-box-outline" width={24} height={24} className='text-warning cursor ms-3' />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                            <div className='card listing-card'>
                                                <div className='card-body'>
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
                                                                            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light px-3">Completed</span>
                                                                        </td>
                                                                        <td>
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p className='mb-0'>Initiated Nov 18, 2024</p>
                                                                            <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                        </td>
                                                                        <td>
                                                                            <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                                                        </td>
                                                                        <td>
                                                                            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light px-3">Completed</span>
                                                                        </td>
                                                                        <td>
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p className='mb-0'>Initiated Nov 18, 2024</p>
                                                                            <p className='fs-12 text-warning mb-0'>2 hours ago</p>
                                                                        </td>
                                                                        <td>
                                                                            <a href='#' className='fw-medium'>Senior Digital Designer for Saas Company</a>
                                                                        </td>
                                                                        <td>
                                                                            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light px-3">Completed</span>
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
                                            </div>
                                        </div> */}
                    {/* <div className="tab-pane fade" id="settings-tab-pane" role="tabpanel" aria-labelledby="settings-tab" tabIndex={0}>
                                            <div className='card listing-card'>
                                                <div className='card-body'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                            <Icon icon="mynaui:edit" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2" />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='card listing-card'>
                                                <div className='card-body'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                            <Icon icon="mynaui:edit" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2" />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='card listing-card'>
                                                <div className='card-body'>
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
                                                                            <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1" />
                                                                            <Icon icon="octicon:person-24" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal1" />
                                                                            <Icon icon="mynaui:edit" width={24} height={24} className='text-warning cursor ms-3' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2" />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row my-3'>
            <div className='col-12'>
              <div className="card ">
                <div className="card-body">
                  <div className='d-flex justify-content-between mb-2'>
                    <div>
                      <h5 className='mb-3'>Senior Digital Designer for Saas Company</h5>
                      {/* <p className='fs-12 mb-1 ms-3'>STATUS: <span className='text-primary ms-2'> Active</span></p>
                      <p className='fs-12 mb-1 ms-3'>Date: <span className='text-warning ms-2'> Dec,2 2024</span></p> */}

                    </div>
                    <div>
                      {/* <Icon icon="material-symbols:close" width="24" height="24" /> */}
                      <span className="badge bg-primary text-white">Active</span>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-3'>
                      <div className="card bg-base">
                        <div className="card-body">
                          <div className='d-flex align-items-center mb-2'>
                            <div className='active-compaign-circle me-2'>
                              <Image
                                src="/assets/images/user1.jpg"
                                className="img-fluid rounded-circle"
                                alt="logo"
                                width={90}
                                height={90}
                              />
                            </div>
                            <div>
                              <h5 className='mb-0'>Williams Smith</h5>
                              <p className='mb-0'>Newyork</p>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Required Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>10</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Waiting for Approvals</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>5</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Approved Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>3</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Rejected Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>3</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className='col-md-3'>
                      <div className="card bg-base">
                        <div className="card-body">
                          <div className='d-flex align-items-center mb-2'>
                            <div className='active-compaign-circle me-2'>
                              <Image
                                src="/assets/images/user1.jpg"
                                className="img-fluid rounded-circle"
                                alt="logo"
                                width={90}
                                height={90}
                              />
                            </div>
                            <div>
                              <h5 className='mb-0'>Williams Smith</h5>
                              <p className='mb-0'>Newyork</p>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Required Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>10</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Waiting for Approvals</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>5</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Approved Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>3</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Rejected Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>3</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className='col-md-3'>
                      <div className="card bg-base">
                        <div className="card-body">
                          <div className='d-flex align-items-center mb-2'>
                            <div className='active-compaign-circle me-2'>
                              <Image
                                src="/assets/images/user1.jpg"
                                className="img-fluid rounded-circle"
                                alt="logo"
                                width={90}
                                height={90}
                              />
                            </div>
                            <div>
                              <h5 className='mb-0'>Williams Smith</h5>
                              <p className='mb-0'>Newyork</p>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Required Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>10</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Waiting for Approvals</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>5</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Approved Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>3</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Rejected Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>3</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className='col-md-3'>
                      <div className="card bg-base">
                        <div className="card-body">
                          <div className='d-flex align-items-center mb-2'>
                            <div className='active-compaign-circle me-2'>
                              <Image
                                src="/assets/images/user1.jpg"
                                className="img-fluid rounded-circle"
                                alt="logo"
                                width={90}
                                height={90}
                              />
                            </div>
                            <div>
                              <h5 className='mb-0'>Williams Smith</h5>
                              <p className='mb-0'>Newyork</p>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Required Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>10</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Waiting for Approvals</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>5</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Approved Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>3</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2 flex-wrap'>
                            <div className='d-flex align-items-center'>
                              <Icon icon="basil:arrow-right-solid" className='text-warning' width="24" height="24" />
                              <p className='mb-0 fs-12 text-warning'>Rejected Posts</p>
                            </div>
                            <div className='active-mini-circle'>
                              <span className='text-white fs-12'>3</span>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                      
                    </div>
                    {/* <hr className='mt-2'/> */}
                    <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Internal Company Creators</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">External Global Creators</button>
                            </li>
                            {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">Draft Campaigns</button>
                                </li> */}
                            <li className='nav-item' role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false"> Saved List </button>
                            </li>
                        </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      <CampaignOffcanvasBuyer />

    </>
  )
}

export default page