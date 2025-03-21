"use client";
import { login } from "@/@api";
import useForm from "@/hooks/useForm";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from "@/components/topcard";
import ProfileCard from "@/components/profilecard";

function CampaignOffcanvas() {
  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Apply for Campaign
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row">
            <div className="col-md-8 pe-4">
              <div className="campaign-post-wrapper">
                <div className="campaign-post">
                  <div className="d-flex">
                    {/* <div className='dashboard-img-circle me-2'>
                                                            <Image src="/assets/images/user1.jpg" className="img-fluid rounded-circle" alt="logo" width={60} height={60} />
                                                        </div> */}
                    <div className="d-flex justify-content-between">
                      <div>
                        <img
                          src="/assets/images/apollo.png"
                          className="border object-fit-cover rounded flex-shrink-0 mb-3"
                          alt="logo"
                          width={90}
                          height={90}
                        />
                        <h5 className="mb-3">
                          Senior Digital Designer for SAAS Company
                        </h5>
                        {/* <p className='mb-0'>Halal Company ltd</p> */}
                        {/* <div className='d-flex align-items-center mb-2'>
                                                    <Icon icon="ph:building-fill" className='me-1 text-warning' />
                                                    <p className='mb-0 fs-12 text-secondary'>Cisco</p>
                                                </div> */}
                        <p className="text-secondary fs-12 mb-2">
                          Jan 24, 2024 - July 25 2024
                        </p>
                        <p className="text-dark mb-2 fs-12">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently versions of Lorem Ipsum
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="text-warning my-3" />
                <div className="row">
                  <div className="col-12">
                    <h5 className="mb-3">Budget</h5>
                  </div>
                  <div className="col-md-6">
                    <p className="fw-medium mb-0 fs-16">$5.00</p>
                    <p className="m-0 text-secondary">Fixed Price</p>
                  </div>
                  {/* <div className='col-md-6'>
                                        <p className='fw-medium mb-0 fs-16'>Expert</p>
                                        <p className='m-0 text-secondary'>
                                            I am willing to pay higher rates for the most experienced creators
                                        </p>
                                    </div> */}
                </div>
                <hr className="text-warning my-4" />
                <h5 className="mb-3">Skills and Expertise</h5>
                <div className="d-flex gap-2 flex-wrap mb-3">
                  <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                    Backend developer
                  </span>
                  <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                    Front end developer
                  </span>
                  <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                    IT officer
                  </span>
                  <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                    Adobe Premire pro
                  </span>
                  <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                    Adobe Photoshop
                  </span>
                </div>
                <hr className="text-warning my-4" />
                {/* <div className='row'>
                                    <div className='col-12'>
                                        <h5 className='mb-3'>Activity on this Campaign</h5>
                                    </div>
                                    <div className='col-12'>
                                        <p className='mb-2'><span className=''>Applicants:</span> <span className='fw-medium text-warning'>5 to 10</span></p>
                                        <p className='mb-2'><span className=''>Invites Sent:</span> <span className='fw-medium text-warning'>4</span></p>
                                        <p className='mb-2'><span className=''>Hires:</span> <span className='fw-medium text-warning'>7</span></p>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='d-flex align-items-center'>
                                            <Icon icon="majesticons:settings-cog-check" className='text-primary me-1' width={22} height={22} />
                                            <p className='mb-0 text-warning me-3'>payment verified</p>
                                            <p className='mb-0'>$10k+ <span className='text-warning ms-1'>spent</span></p>
                                        </div>
                                    </div>
                                </div> */}
              </div>
            </div>
            <div className="col-md-4 border-start ps-4">
              {/* <p className='mb-1 text-warning fs-12'>Apply to Campaign</p> */}
              <button className="btn btn-info w-100 my-3">Apply Now</button>

              <h6 className="mb-3">About the Client</h6>
              {/* <div className='d-flex mb-2'>
                                <div className='number-circle'>
                                    <p className='mb-0 text-secondary fw-medium'>1</p>
                                </div>
                                <div className='ms-3'>
                                    <p className='fw-medium mb-2'>Quick Apply</p>
                                    <p className='fs-12'>Quickly apply to campaigns by sending a message including yoour collaboration ideas and pricing</p>
                                </div>
                            </div>
                            <div className='d-flex mb-2'>
                                <div className='number-circle'>
                                    <p className='mb-0 text-secondary fw-medium'>2</p>
                                </div>
                                <div className='ms-3'>
                                    <p className='fw-medium mb-2'>Review</p>
                                    <p className='fs-12'>your meesage and profile are reviewed to see if you are a good fit for the campaign</p>
                                </div>
                            </div>
                            <div className='d-flex mb-2'>
                                <div className='number-circle'>
                                    <p className='mb-0 text-secondary fw-medium'>3</p>
                                </div>
                                <div className='ms-3'>
                                    <p className='fw-medium mb-2'>Get Started</p>
                                    <p className='fs-12'>Once you're in, its time to send over your proposal to get paid and get started</p>
                                </div>
                            </div> */}
              <div className="mb-3">
                <p className="fw-medium mb-0 text-secondary">United States</p>
                <p>Doral 5:20 am</p>
              </div>
              <div className="mb-3">
                <p className="fw-medium mb-0 text-secondary">
                  20 Campaigns Posted
                </p>
                <p>30% hire rate, 1 open campaign</p>
              </div>
              <div className="mb-3">
                <p className="fw-medium mb-0 text-secondary">
                  $4.5k total spent
                </p>
                <p>5 hires, 1 active</p>
              </div>
              <div className="mb-3">
                <p className="fw-medium mb-0 text-secondary">
                  $5 /hr average hourly rate
                </p>
                <p>315 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampaignOffcanvas;
