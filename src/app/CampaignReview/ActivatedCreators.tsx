// src/app/CampaignReview/ActivatedCreators.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import CreatorDetailModal from "@/components/CreatorDetailModal";
import { getCampaignsActivatedCreators } from "@/@api";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
function ActivatedCreators({
  setShowActivatedCreators,
  selectedCampaign,
}: any) {
  const { setIsLoading } = useAuth();
  const [campaignData, setCampaignData] = useState<any>({});
  const [selectedCreator, setSelectedCreator] = useState<any>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [rendControl, setRendControl] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Approved" | "Pending Approval" | "Rejected"
  >("All");
  useEffect(() => {
    selectedCampaign?.campaign?._id &&
      getCampaignsActivatedCreators(
        selectedCampaign?.campaign?._id,
        setCampaignData,
        setIsLoading
      );
  }, [selectedCampaign, rendControl]);

  useEffect(() => {
    campaignData?._id &&
      !selectedCreator?._id &&
      setSelectedCreator(campaignData?.Activated_Creators?.[0]);
  }, [campaignData, rendControl]);

  return (
    <>
      <section className="dashboard activated-creators">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between my-3">
                <a
                  onClick={() => setShowActivatedCreators(false)}
                  className="text-dark text-decoration-none d-flex align-items-center cursor"
                >
                  <Icon icon="akar-icons:arrow-left" width={18} height={18} />
                  <span className="ms-2">Back to Campaign</span>
                </a>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-3 mb-1">
                        <h5 className="mb-0">
                          {selectedCampaign?.campaign?.Headline}
                        </h5>
                        <button className="bg-primary-subtle border-0 btn btn-outline-primary btn-sm py-1 px-2 rounded-pill">
                          Public
                        </button>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="fs-12 text-warning mb-0">
                          {selectedCampaign?.campaign?.Created_At}
                        </p>
                        <div className="vr mx-2 vr-public"></div>
                        <p className="fs-12 text-warning mb-0">
                          {selectedCampaign?.campaign?.Time_Ago}
                        </p>
                        <div className="vr mx-2 vr-public"></div>
                        <span>
                          Budget:{" "}
                          <strong>${selectedCampaign?.campaign?.Budget}</strong>
                        </span>
                        {/* <span className='me-3'>Public</span>     */}
                        {/* <div className='form-check form-switch mb-0'>
                            <input className='form-check-input' type='checkbox' id='publicSwitch' checked />
                        </div> */}
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-dark fs-12 btn-sm ms-3"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight2"
                      aria-controls="offcanvasRight2"
                    >
                      Edit Campaign{" "}
                      <Icon icon="ri:settings-4-line" width={16} height={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="oveflow-wrapper">
                <div className="d-flex mb-3">
                  {campaignData?.Activated_Creators &&
                    campaignData?.Activated_Creators?.map(
                      (creator: any, index: number) => {
                        return (
                          <div
                            onClick={() => {
                              setSelectedCreator(creator);
                            }}
                            key={index}
                            className={`card h-100 card-hover cursor ${
                              selectedCreator?._id == creator?._id
                                ? "bg-info-subtle"
                                : ""
                            }`}
                            style={{
                              width: "450px",
                              minWidth: "450px",
                              marginRight: "1rem",
                            }}
                          >
                            <div className="card-body py-3 px-4">
                              {/* Header with avatar and name */}
                              <div className="d-flex align-items-center mb-3">
                                <div className="me-3">
                                  <img
                                    src={
                                      creator?.Profile_Image || defaultImagePath
                                    }
                                    className="rounded-circle"
                                    alt="User avatar"
                                    width={36}
                                    height={36}
                                  />
                                </div>
                                <div>
                                  <div className="fw-medium">
                                    {creator?.Name}
                                  </div>
                                  <div className="text-muted d-flex align-items-center fs-12">
                                    <Icon
                                      icon="mdi:linkedin"
                                      className="me-1 text-info"
                                      width={16}
                                      height={16}
                                    />
                                    {creator?.No_of_Followers}
                                  </div>
                                </div>
                              </div>

                              {/* Stats grid */}
                              <div className="d-flex align-items-center justify-content-between gap-3">
                                <div className="d-flex align-items-center gap-2">
                                  <Icon
                                    icon="ph:clock"
                                    width={20}
                                    height={20}
                                    className="flex-shrink-0 text-orange"
                                  />
                                  <div>
                                    <p className="text-muted fs-12 mb-0 nowrap">
                                      Waiting Approvals
                                    </p>
                                    <h6 className="mb-0">
                                      {
                                        creator?.Posts_Stats?.[
                                          "Pending Approval"
                                        ]
                                      }
                                    </h6>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                  <Icon
                                    icon="ph:check-circle"
                                    width={20}
                                    height={20}
                                    className="flex-shrink-0 text-primary"
                                  />
                                  <div>
                                    <p className="text-muted fs-12 mb-0 nowrap">
                                      Approved Posts
                                    </p>
                                    <h6 className="mb-0">
                                      {creator?.Posts_Stats?.Approved}
                                    </h6>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                  <Icon
                                    icon="ph:x-circle"
                                    width={20}
                                    height={20}
                                    className="flex-shrink-0 text-danger"
                                  />
                                  <div>
                                    <p className="text-muted fs-12 mb-0 nowrap">
                                      Rejected Posts
                                    </p>
                                    <h6 className="mb-0">
                                      {creator?.Posts_Stats?.Rejected}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
              <div className="d-flex gap-2 mb-3">
                <button
                  className={
                    selectedFilter == "All"
                      ? `btn btn-info btn-sm`
                      : "btn btn-outline-light text-dark btn-sm"
                  }
                  onClick={() => {
                    setSelectedFilter("All");
                  }}
                >
                  All (Recent){" "}
                  <span className="badge bg-white text-dark ms-1">
                    {selectedCreator?.Posts?.length || 0}
                  </span>
                </button>
                {/* <button className='btn btn-outline-light text-dark btn-sm'>
                                    Required Posts <span className="badge bg-light text-dark ms-1">1</span>
                                </button> */}
                <button
                  className={
                    selectedFilter == "Pending Approval"
                      ? `btn btn-info btn-sm`
                      : "btn btn-outline-light text-dark btn-sm"
                  }
                  onClick={() => {
                    setSelectedFilter("Pending Approval");
                  }}
                >
                  Waiting Approvals{" "}
                  <span className="badge bg-light text-dark ms-1">
                    {selectedCreator?.Posts_Stats?.["Pending Approval"] || 0}
                  </span>
                </button>
                <button
                  className={
                    selectedFilter == "Approved"
                      ? `btn btn-info btn-sm`
                      : "btn btn-outline-light text-dark btn-sm"
                  }
                  onClick={() => {
                    setSelectedFilter("Approved");
                  }}
                >
                  Approved Posts{" "}
                  <span className="badge bg-light text-dark ms-1">
                    {selectedCreator?.Posts_Stats?.Approved || 0}
                  </span>
                </button>
                <button
                  className={
                    selectedFilter == "Rejected"
                      ? `btn btn-info btn-sm`
                      : "btn btn-outline-light text-dark btn-sm"
                  }
                  onClick={() => {
                    setSelectedFilter("Rejected");
                  }}
                >
                  Rejected Posts{" "}
                  <span className="badge bg-light text-dark ms-1">
                    {selectedCreator?.Posts_Stats?.Rejected || 0}
                  </span>
                </button>
              </div>
              <div className="row g-3">
                {selectedCreator?.Posts &&
                selectedCreator?.Posts?.length !== 0 ? (
                  selectedCreator?.Posts?.map((post: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="col-md-3"
                        style={
                          selectedFilter == "All"
                            ? { display: "block" }
                            : selectedFilter == post?.Status
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <div className="card h-100">
                          <div className="position-relative">
                            <span
                              className={
                                post?.Status == "Rejected"
                                  ? "badge bg-danger-subtle end-0 fw-medium m-2 p-2 position-absolute text-danger top-0"
                                  : post?.Status == "Pending Approval"
                                  ? "position-absolute top-0 end-0 m-2 badge text-yellow p-2 fw-medium bg-orange-subtle"
                                  : "position-absolute top-0 end-0 m-2 badge p-2 fw-medium text-primary bg-primary-subtle"
                              }
                            >
                              {post?.Status}
                            </span>
                            {post?.Media_Content[0] ? (
                              post?.Media_Content[0]
                                .toLowerCase()
                                .endsWith(".pdf") ? (
                                <div
                                  className="bg-card-light d-flex align-items-center justify-content-center"
                                  style={{ height: "130px" }}
                                >
                                  <Icon
                                    icon="mdi:file-document-outline"
                                    width={30}
                                    height={30}
                                    className="text-dark"
                                  />
                                </div>
                              ) : post?.Media_Content[0]
                                  .toLowerCase()
                                  .endsWith(".mp4") ||
                                post?.Media_Content[0]
                                  .toLowerCase()
                                  .endsWith(".mov") ? (
                                <video
                                  style={{
                                    height: "130px",
                                    width: "100%",
                                    objectFit: "cover",
                                  }}
                                >
                                  <source
                                    src={post?.Media_Content[0]}
                                    type={
                                      post?.Media_Content[0]
                                        .toLowerCase()
                                        .endsWith(".mov")
                                        ? "video/quicktime"
                                        : "video/mp4"
                                    }
                                  />
                                </video>
                              ) : (
                                <img
                                  src={post?.Media_Content[0]}
                                  className="card-img-top"
                                  alt="Post media content"
                                  style={{
                                    height: "130px",
                                    objectFit: "cover",
                                  }}
                                />
                              )
                            ) : (
                              <img
                                src="https://cdn.synnc.us/creator/09d2eea2-9fa9-45b1-89ae-cfb0d8363b6b.png"
                                className="card-img-top"
                                alt="Default image"
                                style={{ height: "130px", objectFit: "cover" }}
                              />
                            )}
                          </div>
                          <div className="card-body d-flex flex-column">
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <div className="rounded-circle">
                                <img
                                  src={
                                    selectedCreator?.Profile_Image ||
                                    defaultImagePath
                                  }
                                  className="rounded-circle"
                                  alt="User avatar"
                                  width={36}
                                  height={36}
                                />
                              </div>
                              <div>
                                <div className="fw-medium">
                                  {selectedCreator?.Name}
                                </div>
                                <div className="text-muted small">
                                  {post?.Submitted_At}
                                </div>
                              </div>
                            </div>
                            <h5 className="card-title fs-14 line-clamp-3">
                              {post?.Post_Title}{" "}
                            </h5>
                            <a
                              className="text-info text-decoration-none text-end cursor mt-auto"
                              data-bs-toggle="modal"
                              data-bs-target="#creatorDetailModal"
                              onClick={() => {
                                setSelectedPost(post);
                              }}
                            >
                              View Details →
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <tr>
                    <td>No data found</td>
                  </tr>
                )}
              </div>
            </div>
          </div>
          {/* <div className='row'>
                    <div className='col-md-3'>
                        <div className="card ">
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
                        <div className="card ">
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
                        <div className="card ">
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
                        <div className="card ">
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
                </div> */}
          {/* <div className='card'>
                    <div className='card-body'>
                        <h5 className='mb-4'>Activated Creators</h5>
                        <div className='table-responsive'>
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Creator</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th>Activation Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <Image
                                                    src="/assets/images/model_1.png"
                                                    className="rounded-circle"
                                                    width={40}
                                                    height={40}
                                                    alt="User avatar"
                                                    priority
                                                />
                                                <div className='ms-3'>
                                                    <div>Adam Biddlecombe</div>
                                                    <div className='text-muted d-flex align-items-center fs-12'>
                                                        <Icon icon="mdi:linkedin" className='me-1 text-info' width={16} height={16} />
                                                        122.1k
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className='px-2 py-1 rounded rounded-pill bg-base text-primary'>
                                                Activated
                                            </span>
                                        </td>
                                        <td>$600</td>
                                        <td>Dec 10, 2023</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
        </div>
      </section>
      <CreatorDetailModal
        rendControl={rendControl}
        setRendControl={setRendControl}
        campaignData={campaignData}
        selectedPost={selectedPost}
        selectedCreator={selectedCreator}
      />
    </>
  );
}

export default ActivatedCreators;
