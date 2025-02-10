"use client";
import { login } from "@/@api";
import useForm from "@/hooks/useForm";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import CampaignReviewModal from "./campaignreviewmodal";

function CardsDashboardBuyer() {
  return (
    <>
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Your Campaigns</h5>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm rounded-pill px-3"
          >
            View all Campaigns
          </button>
        </div>
      </div>
      <div className="col-md-4 col-xl-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex mb-2">
              <div className="user-img-circle me-3">
                <img
                  src="/assets/images/user1.jpg"
                  className="img-fluid rounded-circle"
                  alt="logo"
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Mark Ellis</h5>
                  {/* <div className='d-flex gap-2 align-items-start'>
                                        <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                            Hire
                                        </button>
                                        <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                            Invite
                                        </button>
                                    </div> */}
                </div>
                <p className="mb-1">Newyork, America</p>
              </div>
            </div>
            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light border border-transparent mb-2">
              In progress
            </span>
            <p className="mb-1">
              Full Stack Developer, ReactJS, NodeJS, MongoDB
            </p>
            <div className="d-flex align-items-center mb-3">
              <Icon
                icon="mdi:file-document-tick-outline"
                className="me-1 text-info"
                width={18}
                height={18}
              />
              <p className="text-info mb-0">Completed 80 campaigns</p>
            </div>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100 rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              View compaign
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex mb-2">
              <div className="user-img-circle me-3">
                <img
                  src="/assets/images/user1.jpg"
                  className="img-fluid rounded-circle"
                  alt="logo"
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Mark Ellis</h5>
                  {/* <div className='d-flex gap-2 align-items-start'>
                                        <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                            Hire
                                        </button>
                                        <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                            Invite
                                        </button>
                                    </div> */}
                </div>
                <p className="mb-1">Newyork, America</p>
              </div>
            </div>
            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light border border-transparent mb-2">
              In progress
            </span>
            <p className="mb-1">
              Full Stack Developer, ReactJS, NodeJS, MongoDB
            </p>
            <div className="d-flex align-items-center mb-3">
              <Icon
                icon="mdi:file-document-tick-outline"
                className="me-1 text-info"
                width={18}
                height={18}
              />
              <p className="text-info mb-0">Completed 80 campaigns</p>
            </div>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100 rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              View compaign
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex mb-2">
              <div className="user-img-circle me-3">
                <img
                  src="/assets/images/user1.jpg"
                  className="img-fluid rounded-circle"
                  alt="logo"
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Mark Ellis</h5>
                  {/* <div className='d-flex gap-2 align-items-start'>
                                        <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                            Hire
                                        </button>
                                        <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                            Invite
                                        </button>
                                    </div> */}
                </div>
                <p className="mb-1">Newyork, America</p>
              </div>
            </div>
            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light border border-transparent mb-2">
              In progress
            </span>
            <p className="mb-1">
              Full Stack Developer, ReactJS, NodeJS, MongoDB
            </p>
            <div className="d-flex align-items-center mb-3">
              <Icon
                icon="mdi:file-document-tick-outline"
                className="me-1 text-info"
                width={18}
                height={18}
              />
              <p className="text-info mb-0">Completed 80 campaigns</p>
            </div>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100 rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              View compaign
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex mb-2">
              <div className="user-img-circle me-3">
                <img
                  src="/assets/images/user1.jpg"
                  className="img-fluid rounded-circle"
                  alt="logo"
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Mark Ellis</h5>
                  {/* <div className='d-flex gap-2 align-items-start'>
                                        <button type="button" className="btn btn-outline-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                            Hire
                                        </button>
                                        <button type="button" className="btn btn-primary btn-sm px-4 fs-12 btn-sm nowrap">
                                            Invite
                                        </button>
                                    </div> */}
                </div>
                <p className="mb-1">Newyork, America</p>
              </div>
            </div>
            <span className="badge bg-primary-subtle text-primary rounded-pill fw-light border border-transparent mb-2">
              In progress
            </span>
            <p className="mb-1">
              Full Stack Developer, ReactJS, NodeJS, MongoDB
            </p>
            <div className="d-flex align-items-center mb-3">
              <Icon
                icon="mdi:file-document-tick-outline"
                className="me-1 text-info"
                width={18}
                height={18}
              />
              <p className="text-info mb-0">Completed 80 campaigns</p>
            </div>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100 rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              View compaign
            </button>
          </div>
        </div>
      </div>
      <CampaignReviewModal />
    </>
  );
}

export default CardsDashboardBuyer;
