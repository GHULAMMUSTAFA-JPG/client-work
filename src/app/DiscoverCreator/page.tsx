"use client";
import {
  getDiscoverCampaigns,
  getDiscoverCampaignsForFilters,
  getDiscoverCampaignsForSearch,
  login, applyCampaign
} from "@/@api";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import CampaignOffcanvas from "@/components/campaignoffcanvas";
import CampaignFilterModal from "@/components/campaignfiltermodal";
import ApplyModal from "@/components/ApplyModal";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { withAuthRole } from "@/utils/withAuthRole";
import Link from "next/link";
import { toast } from "react-toastify";
import BrandViewCampaignOffcanvas from "@/components/BrandViewCampaignOffcanvas";
import SidebarDrawerCanvas from "@/components/sidebar-drawer";
import * as bootstrap from "bootstrap";
import BrandViewCampaign from "@/components/sidebar-drawer";

function DiscoverCreator() {
  const searchParams = useSearchParams();
  const brandName = searchParams.get("brandName") || "";
  const [searchText, setSearchText] = useState<string>(brandName);
  const [campaignData, setCampaignData] = useState<any>();
  const { setIsLoading, user, setIsActive } = useAuth();
  const [pageNo, setPageNo] = useState<number>(1);
  const [limit, setLimit] = useState<number>(30);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const offcanvasRef = useRef<HTMLDivElement>(null); // Ref to control the offcanvas

  // Toggle sidebar with the campaign data
  const toggleSidebar = (campaign: any) => {
    const offcanvasElement = offcanvasRef.current;
    if (offcanvasElement && campaign) {
      setSelectedCampaign(campaign);
      const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      offcanvas.show();
      console.log("Toggling with campaign:", campaign);
    }
  };
  useEffect(() => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    setIsActive(1);
    if (!brandName && user?.email) {
      getDiscoverCampaigns(
        setCampaignData,
        setIsLoading,
        user.email,
        limit,
        pageNo
      );
    }
  }, [user?.email, pageNo, brandName]);

  useEffect(() => {
    if (brandName) {
      setSearchText(brandName);
      getDiscoverCampaignsForSearch(brandName, setCampaignData, setIsLoading);
    }
  }, [brandName]);

  const searchCampaign = () => {
    getDiscoverCampaignsForSearch(searchText, setCampaignData, setIsLoading);
  };

  const filterCampaignCall = (e: any) => {
    getDiscoverCampaignsForFilters(e, setCampaignData, setIsLoading);
  };

  const [description, setDescription] = useState<string>("");

  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setDescription(event.target.value);
  }

  const applyCreatorProgram = (e: any) => {
    e.preventDefault();
    if (description.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }
    const isloggedin = localStorage.getItem("user");
    if (!isloggedin) {
      toast.error("Please login to apply");
      return;
    }
    applyCampaign(
      {
        campaign_id: selectedCampaign?._id,
        creator_email: user?.email,
        message: description,
      },
      setDescription,
      setIsLoading
    );
  };

  function handleApplyClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (selectedCampaign) {
      applyCreatorProgram(e);
    }
  }

  const [isReadMore, setIsReadMore] = useState<boolean>(false);



  // Define the header content with campaign data
  const headerContent = selectedCampaign && (
    <div className="tw-flex tw-items-center tw-space-x-4">
      <div className="img-container-topHeader">
        <img
          src={selectedCampaign?.Company_Logo || "https://cdn.synnc.us/brand/fc331bd6-a9a5-4496-a38a-09964d080e24.png"}
          alt=""
          className=""
        />
      </div>
      <div>
        <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900">{selectedCampaign?.Company_Name || "Unknown Brand"}</h2>
        <p className="tw-text-gray-600">
          Testttt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies orci sed nisi auctor.
        </p>
      </div>
    </div>
  );

  // Define the body content with campaign data
  const bodyContent = selectedCampaign && (
    <div className="p-4 campaign-box-border">
      <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">{selectedCampaign.Headline || "N/A"}</h3>
        <div className="tw-flex tw-space-x-2">
          <span className="tw-flex tw-items-center tw-text-xs tw-font-medium tw-text-red-600 tw-bg-red-50 tw-px-2 tw-py-1 tw-rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-flame tw-w-3 tw-h-3 tw-mr-1"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            Urgent
          </span>
        </div>
      </div>

      <p className="tw-text-gray-600 tw-mb-4">{selectedCampaign.Brief_Description || "No description available"}</p>

      <div className="tw-space-y-4">
        <div>
          <h4 className="tw-text-sm tw-font-semibold tw-text-gray-900 tw-mb-2">Duration</h4>
          <p className="tw-text-sm tw-text-gray-700">
            {selectedCampaign.Is_Ongoing ? "On Going" : `${selectedCampaign.Start_Date || "N/A"} - ${selectedCampaign.End_Date || "N/A"}`}
          </p>
        </div>

        <div>
          <h4 className="tw-text-sm tw-font-semibold tw-text-gray-900 tw-mb-2">Requirements</h4>
          <ul className="tw-space-y-2">
            <li className="tw-text-sm tw-text-gray-700">{selectedCampaign.Campaign_Details || "No details available"}</li>
          </ul>
        </div>

        <div>
          <h4 className="tw-text-sm tw-font-semibold tw-text-gray-900 tw-mb-2">Platforms</h4>
          <div className="tw-flex tw-flex-wrap tw-gap-2">
            {selectedCampaign.Target_Audience?.length > 0 ? (
              selectedCampaign.Target_Audience.map((platform: string, index: number) => (
                <span
                  key={index}
                  className="tw-inline-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium tw-bg-gray-100 tw-text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-globe tw-w-3 tw-h-3 tw-mr-1"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  {platform}
                </span>
              ))
            ) : (
              <span className="tw-inline-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium tw-bg-gray-100 tw-text-gray-800">
                No platforms specified
              </span>
            )}
          </div>
        </div>

        <div className="tw-flex tw-items-center tw-justify-between tw-pt-4">
          <div className="tw-flex tw-items-center tw-space-x-2">
            <span className="tw-flex tw-items-center tw-text-xs tw-font-medium tw-text-green-600 tw-bg-green-50 tw-px-2 tw-py-1 tw-rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-dollar-sign tw-w-3 tw-h-3 tw-mr-1"
              >
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              ${selectedCampaign.Budget?.toLocaleString() || "N/A"} per post
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Define the footer content with campaign data
  const footerContent = selectedCampaign && (
    <div className="d-flex justify-content-end gap-2">
      <button
        className="btn btn-outline-dark btn-sm"
        data-bs-dismiss="offcanvas"
      >
        Cancel
      </button>
      {selectedCampaign.Is_Applied ? (
        <button disabled className="btn btn-dark btn-sm">
          Applied
        </button>
      ) : selectedCampaign.Is_Invited ? (
        <button disabled className="btn btn-dark btn-sm">
          Invited
        </button>
      ) : (
        <button
          onClick={() => {
            const offcanvasElement = offcanvasRef.current;
            if (offcanvasElement) {
              const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
              offcanvas.hide();
            }
            // Assuming handleApply exists in SidebarDrawerCanvas
            SidebarDrawerCanvas?.prototype?.handleApply?.(selectedCampaign._id);
          }}
          className="btn btn-info btn-sm"
          disabled={selectedCampaign.Is_Applied || selectedCampaign.Is_Invited}
        >
          Apply Now
        </button>
      )}
    </div>
  );

  return (
    <>
      <section className="dashboard">
        <div className="container">
          <div className="row my-2">
            <div className="col-12">
              <h2 className="fs-20 fw-700">Discover Brand Campaigns</h2>
              <p className="mt-2 fs-14">Find and collaborate with top brands looking for creators like you. Apply to campaigns that match your expertise and audience to monetize your content.</p>
              <div className="mt-1 flex items-center">
                <div className="flex items-center text-sm text-teal-600 text-red tw-hidden">
                  <span className="font-medium">9 campaigns available</span>
                  <span className="mx-2">•</span><span>5 highly matched</span>
                </div></div>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between flex-wrap mb-3 mt-3">
                <div className="position-relative w-auto mb-2">
                  <input
                    type="text"
                    onChange={(e: any) => {
                      setSearchText(e?.target?.value);
                    }}
                    className="form-control custom-input-brand"
                    id="exampleFormControlInput1"
                    placeholder="Search campaigns by brands, topic, or budget.."
                    onKeyDown={(e: any) => {
                      e.key == "Enter" && searchCampaign();
                    }}
                  />
                  <Icon
                    icon="ph:magnifying-glass"
                    width={16}
                    height={16}
                    className="text-secondary position-absolute top-50 start-0 translate-middle-y ms-3"
                  />
                  {/* <Icon icon="ph:x" width={20} height={20} className='text-secondary position-absolute top-50 end-0 translate-middle-y me-3 cursor' /> */}
                  {/* <Icon icon="akar-icons:settings-vertical" width={20} height={20} className='text-primary position-absolute top-50 end-0 translate-middle-y me-3 cursor' data-bs-toggle="modal" data-bs-target="#exampleModal" /> */}
                </div>
                <select
                  className="form-select custom-select-brand mb-2"
                  onChange={(e: any) => {
                    filterCampaignCall(e.target.value);
                  }}
                  aria-label="Small select example"
                >
                  {/* <option selected value="popular">Most Popular</option> */}
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>

              </div>
            </div>
          </div>
          <div className="row g-2 mb-1">
            {campaignData?.campaigns?.map((campaign: any, index: number) => {
              return (
                <div
                  key={index}
                  className="col-md-12"

                >
                  <div className="card card-hover py-2">
                    <div className="card-body-box d-flex justify-content-between gap-3 item-content-start">

                      <div className="d-flex align-items-center gap-3 justify-content-start">
                        <div className="img-container-lg">
                          <img
                            src={campaign?.Company_Logo || defaultImagePath}
                            className="flex-shrink-0"
                            alt="logo"

                          />
                        </div>
                        <div className="content-wrapper w-100 mt-1">

                          <div className="d-flex align-items-center">

                            <p className="fw-medium mb-0 fs-16 line-clamp-1">
                              {campaign?.Headline?.slice(0, 100)}
                            </p>
                            <div className="d-flex py-1">
                              {campaign.Company_Website && (
                                <Link href={`${campaign.Company_Website}`} target="_blank">
                                  <Icon
                                    icon="mdi:web"
                                    width="18"
                                    height="18"
                                    className="text-warning ms-1"
                                    style={{
                                      minWidth: "18px",
                                      minHeight: "18px",
                                    }}
                                  />
                                </Link>
                              )}
                              {campaign.Company_Linkedin && (
                                <Link href={`https://${campaign.Company_Linkedin}`} target="_blank">
                                  <Icon
                                    icon="mdi:linkedin"
                                    width="18"
                                    height="18"
                                    className="text-info ms-2"
                                    style={{
                                      minWidth: "18px",
                                      minHeight: "18px",
                                    }}
                                  />
                                </Link>
                              )}
                            </div>
                            <p className="fs-12 mb-0 mx-2 text-black bg-light rounded p-1">
                              Deadline: {campaign?.End_Date ? campaign.End_Date : "Ongoing"}
                            </p>

                          </div>



                          <p className="fs-13 mb-0 fs-16 w-90 line-clamp-2">
                            {campaign?.Campaign_Details?.slice(0, 100)}
                          </p>
                          <div className="d-flex gap-2 mt-2 mb-2 align-items-center">
                            <div className="d-flex flex-wrap gap-1">
                              {campaign?.Target_Audience?.map(
                                (audience: string, index: number) => (
                                  <span
                                    key={index}
                                    className="chips"
                                  >
                                    {audience}
                                  </span>
                                )
                              )}
                            </div>
                          </div>


                        </div>
                      </div>

                      <div className="action_wrapper">
                        <div className="d-flex justify-content-end flex-column">
                          <p className="fs-13 mb-0 text-right text-black">
                            ${campaign?.Budget} per post
                          </p>

                        </div>
                        <div className="learnmore-btn d-flex justify-content-end">
                          <button
                            onClick={() => toggleSidebar(campaign)} // Pass campaign directly
                            className="btn btn-dark ms-2 btn-sm w-s mt-2"
                          >
                            Learn more
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {campaignData?.pagination?.Total_Pages > pageNo && (
            <div className="d-flex justify-content-center mt-4">
              <button
                onClick={() => {
                  setPageNo(pageNo + 1);
                }}
                className="btn btn-dark ms-2  w-s "
              >
                Load more
              </button>
            </div>
          )}
        </div>
        {/* {isSidebarOpen && (
          <div className={`sidebar-drawer-campaign ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebarFrame">
              <div className="sidebar-header">
                <div className="d-flex justify-content-between align-items-center py-2 px-3 bg-light-gray">
                  <h6 className="fs-16 fw-500">Campaign Details</h6>
                  <button onClick={toggleSidebar} className="bg-white border btn btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16.325" height="16.325" viewBox="0 0 16.325 16.325">
                    <path id="Icon_ion-close" data-name="Icon ion-close" d="M15.822,13.785l5.7-5.7a1.441,1.441,0,0,0-2.036-2.04l-5.7,5.7-5.7-5.7a1.442,1.442,0,0,0-2.04,2.04l5.7,5.7-5.7,5.7a1.442,1.442,0,0,0,2.04,2.04l5.7-5.7,5.7,5.7a1.442,1.442,0,0,0,2.04-2.04Z" transform="translate(-5.623 -5.623)" />
                  </svg>
                  </button></div>

              </div>
              <div className="sidebar-content py-2 px-3 bg-light-gray">


                <div className="d-flex justify-content-between align-items-center gap-3 py-2">
                  <div className="profileMatchbox py-1  px-3">
                    <div className="mt-1 fs-12 fw-500 mb-1">Compensation</div>
                    <div className="mt-1 fs-16 fw-500 mb-1">$ {selectedCampaign?.Budget.toLocaleString()} per post</div>
                    <div className="mt-1 fs-10 fw-400 mb-1">Final rates may be negotiated based on scope and deliverables.</div>

                  </div>

                  <div className="profileInfo py-1 px-3">
                    <div className="mt-1 fs-12 fw-500">Why This Campaign Matches Your Profile</div>
                    <div className="mt-1 fs-12 fw-400">Based on your expertise in Career Coaching, this campaign aligns well with your content style and audience interests.</div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div className="py-2 mb-1">


                    <div className="d-flex align-items-start gap-2">
                      <div className="img-container-sml">
                        <img
                          src={selectedCampaign?.Company_Logo || defaultImagePath}
                          className="flex-shrink-0"
                          alt="logo"
                        />
                      </div>
                      <div>

                        <div className="d-flex algin-items-center">
                          <p className="fw-medium mb-0 fs-16">{selectedCampaign?.Headline}</p>
                          <div className="d-flex gap-1 align-items-center">
                            {selectedCampaign?.Company_Website && (
                              <Link href={`${selectedCampaign.Company_Website}`} target="_blank">
                                <Icon
                                  icon="mdi:web"
                                  width="18"
                                  height="18"
                                  className="text-warning ms-1"
                                  style={{
                                    minWidth: "18px",
                                    minHeight: "18px",
                                  }}
                                />
                              </Link>
                            )}
                            {selectedCampaign?.Company_Linkedin && (
                              <Link href={`https://${selectedCampaign.Company_Linkedin}`} target="_blank">
                                <Icon
                                  icon="mdi:linkedin"
                                  width="18"
                                  height="18"
                                  className="text-info ms-2"
                                  style={{
                                    minWidth: "18px",
                                    minHeight: "18px",
                                  }}
                                />
                              </Link>
                            )}
                          </div>
                        </div>

                        <p className="fw-medium mb-0 fs-14">  {selectedCampaign?.Start_Date &&
                          selectedCampaign?.End_Date ? (
                          <span className="fs-13 d-flex align-items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13.267" height="15.162" viewBox="0 0 13.267 15.162">
                              <path id="Icon_fa-regular-calendar-days" data-name="Icon fa-regular-calendar-days" d="M4.5.711a.711.711,0,0,0-1.421,0V1.9H1.9A1.9,1.9,0,0,0,0,3.79v9.476a1.9,1.9,0,0,0,1.9,1.9h9.476a1.9,1.9,0,0,0,1.9-1.9V3.79a1.9,1.9,0,0,0-1.9-1.9H10.187V.711a.711.711,0,0,0-1.421,0V1.9H4.5ZM1.421,5.686H3.79V7.344H1.421Zm0,3.08H3.79v1.9H1.421Zm3.79,0H8.055v1.9H5.212Zm4.264,0h2.369v1.9H9.476Zm2.369-1.421H9.476V5.686h2.369Zm0,4.738v1.185a.475.475,0,0,1-.474.474h-1.9V12.082Zm-3.79,0V13.74H5.212V12.082Zm-4.264,0V13.74H1.9a.475.475,0,0,1-.474-.474V12.082ZM8.055,7.344H5.212V5.686H8.055Z" fill="#5c5c5c" />
                            </svg>
                            &nbsp; {selectedCampaign?.Start_Date} -{" "}
                            {selectedCampaign?.End_Date}
                          </span>
                        ) : (
                          <span className="fs-13 d-flex align-items-center mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="14.173" height="16.198" viewBox="0 0 14.173 16.198">
                            <path id="Icon_fa-regular-calendar-check" data-name="Icon fa-regular-calendar-check" d="M4.05,0a.757.757,0,0,1,.759.759V2.025H9.365V.759a.759.759,0,1,1,1.519,0V2.025h1.265A2.027,2.027,0,0,1,14.173,4.05V14.173A2.027,2.027,0,0,1,12.149,16.2H2.025A2.027,2.027,0,0,1,0,14.173V4.05A2.027,2.027,0,0,1,2.025,2.025H3.29V.759A.757.757,0,0,1,4.05,0Zm8.605,6.074H1.519v8.1a.508.508,0,0,0,.506.506H12.149a.508.508,0,0,0,.506-.506ZM10.409,9.4,6.865,12.939a.756.756,0,0,1-1.072,0L3.768,10.915A.758.758,0,0,1,4.84,9.842l1.487,1.487L9.333,8.324A.758.758,0,0,1,10.405,9.4Z" fill="#5c5c5c" />
                          </svg>
                            &nbsp;
                            Ongoing Campaign</span>
                        )}</p>
                        <p className="fs-12 mb-0 line-clamp-5">{selectedCampaign?.Campaign_Details.slice(0, 100)}
                        </p>

                        <p className="fs-12 mb-0 fw-500">Target Audience</p>
                        <div className="d-flex flex-wrap gap-1 py-2">
                          {selectedCampaign?.Target_Audience?.map(
                            (audience: string, index: number) => (
                              <span
                                key={index}
                                className="chips"
                              >
                                {audience}
                              </span>
                            )
                          )}
                        </div>

                        <p className="fs-12 mb-0 fw-500">Campaign Details</p>
                        <p className={`fs-12 mb-0 text-gray ${isReadMore ? '' : 'line-clamp-2'}`}>
                          {selectedCampaign?.Campaign_Details}
                        </p>
                        {selectedCampaign?.Campaign_Details.length > 100 && (
                          <button
                            className="link fs-10"
                            onClick={() => setIsReadMore(!isReadMore)}
                          >
                            {isReadMore ? 'Show less' : 'Read more'}
                          </button>
                        )}

                      </div>
                    </div>

                  </div>

                </div>



                <div className="mainbox">
                  {!selectedCampaign?.Is_Applied && (
                    <div className="mt-1">
                      <p className="fs-12 mb-0 fw-500 mb-2">Send a Message to Apply</p>

                      <textarea
                        className="form-control p-2"
                        placeholder="Describe your interest in collaborating and share details on pricing to help brands make a quick decision."
                        value={description}
                        onChange={handleDescriptionChange}
                        style={{ minHeight: "110px", resize: "none" }}
                      ></textarea>
                    </div>
                  )}
                  <div className="deadlinedate bg-light mt-3 p-2">
                    <p className="fs-12 mb-0 fw-500">Application Deadline</p>
                    <p className="fs-14 mb-0  mb-2 text-red">{selectedCampaign?.End_Date ? selectedCampaign.End_Date : "Ongoing"}</p>
                  </div>
                </div>

              </div>
              <div className="sidebar-footer">
                <div className="d-flex justify-content-end gap-2 py-2 px-3 bg-light-gray">
                  <button className="btn btn-outline-dark btn-sm" onClick={toggleSidebar}>Cancel</button>
                  <button
                    className={`btn ${selectedCampaign?.Is_Applied ? "btn-dark" : "btn-info"
                      }`}
                    onClick={(e) => {
                      if (!selectedCampaign?.Is_Applied && description.trim() !== "") {
                        handleApplyClick(e);
                        toast.success("Application submitted successfully!");
                      } else if (description.trim() === "") {
                        toast.error("Message cannot be empty");
                      }
                    }}
                    disabled={selectedCampaign?.Is_Applied}
                  >
                    {selectedCampaign?.Is_Applied ? "Applied" : "Apply"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}

      </section>
      <SidebarDrawerCanvas
        ref={offcanvasRef}
        data={selectedCampaign}
        headerContent={headerContent}
        bodyContent={bodyContent}
        footerContent={footerContent}
      />

      {/* <BrandViewCampaignOffcanvas brandid={brandId} companyname={companyName} /> */}
      {/* <CampaignOffcanvas /> */}
      {/* <CampaignFilterModal selectedCampaign={selectedCampaign} />
      <ApplyModal selectedCampaign={selectedCampaign} /> */}
    </>
  );
}
export default withAuthRole({
  Component: DiscoverCreator,
  allowedRoles: ["creator"],
});



