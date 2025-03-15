"use client";
import {
  getDiscoverCampaigns,
  getDiscoverCampaignsForFilters,
  getDiscoverCampaignsForSearch,
  login,applyCampaign
} from "@/@api";
import React, { useEffect, useState } from "react";
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
 const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  return (
    <>
      <section className="dashboard">
        <div className="container">
          <div className="row my-2">
            <div className="col-12">
              <h2 className="fs-20 fw-700">Discover Brand Campaigns</h2> 
              <p className="mt-2 fs-14">Find and collaborate with top brands looking for creators like you. Apply to campaigns that match your expertise and audience to monetize your content.</p>
                <div className="mt-1 flex items-center">
               </div>
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
                    placeholder="Search campaigns by brands and topic.."
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
                  onClick={() => {
                    setSelectedCampaign(campaign);
                    toggleSidebar();
                  }}
                >
                  <div className="card hover:tw-bg-gray-50 hover:tw-shadow-sw py-2">
                    <div className="card-body-box d-flex justify-content-between gap-3 item-content-start tw-items-center">

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
                       
                        <div className="learnmore-btn d-flex justify-content-end">
                          {/* <button  onClick={() => {
                    setSelectedCampaign(campaign);
                    toggleSidebar();
                  }} className="btn btn-dark ms-2 btn-sm w-s mt-2">
                            Learn more
                          </button> */}

               <button  onClick={() => {
                        // Placeholder for future functionality
                      }} data-bs-toggle="offcanvas"
                      data-bs-target="#applyPostCreatorOffcanvas" className="btn btn-dark ms-2 btn-sm w-s mt-2">
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

        {/* drawer box starts here  */}

        <div
className="offcanvas offcanvas-end"
tabIndex={-1}
id="applyPostCreatorOffcanvas"
style={{ width: '40%' }}
>
  <div className="offcanvas-header border-bottom">
    <div>
      <h5 className="offcanvas-title">Campaign Details</h5>
    
    </div>
    <button
    type="button"
    className="btn-close"
    data-bs-dismiss="offcanvas"
  ></button>
  </div>
  <div className="offcanvas-body flex-grow-1 overflow-auto">
    <div className="sidebar-content py-2 px-3 bg-light-gray">
      <div className="d-flex justify-content-between align-items-center gap-3 py-2">
        <div className="profileInfo py-1 px-3">
          <div className="mt-1 fs-12 fw-500">Why This Campaign Matches Your Profile</div>
          <div className="mt-1 fs-12 fw-400">Based on your expertise in Career Coaching, this campaign aligns well with your content style and audience interests.</div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="py-2 mb-1">
          <div className="d-flex align-items-start gap-2">
            <div className="img-container-sml"> <img
           src={selectedCampaign?.Company_Logo || defaultImagePath}
           className="flex-shrink-0"
           alt="logo"
           /> </div>
            <div>
              <div className="d-flex algin-items-center">
                <p className="fw-medium mb-0 fs-16">{selectedCampaign?.Headline}</p>
                <div className="d-flex gap-1 align-items-center"> {selectedCampaign?.Company_Website && (
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
                  )} </div>
              </div>
              <p className="fw-medium mb-0 fs-14"> {selectedCampaign?.Start_Date &&
                selectedCampaign?.End_Date ? ( <span className="fs-13 d-flex align-items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="13.267" height="15.162" viewBox="0 0 13.267 15.162">
                  <path id="Icon_fa-regular-calendar-days" data-name="Icon fa-regular-calendar-days" d="M4.5.711a.711.711,0,0,0-1.421,0V1.9H1.9A1.9,1.9,0,0,0,0,3.79v9.476a1.9,1.9,0,0,0,1.9,1.9h9.476a1.9,1.9,0,0,0,1.9-1.9V3.79a1.9,1.9,0,0,0-1.9-1.9H10.187V.711a.711.711,0,0,0-1.421,0V1.9H4.5ZM1.421,5.686H3.79V7.344H1.421Zm0,3.08H3.79v1.9H1.421Zm3.79,0H8.055v1.9H5.212Zm4.264,0h2.369v1.9H9.476Zm2.369-1.421H9.476V5.686h2.369Zm0,4.738v1.185a.475.475,0,0,1-.474.474h-1.9V12.082Zm-3.79,0V13.74H5.212V12.082Zm-4.264,0V13.74H1.9a.475.475,0,0,1-.474-.474V12.082ZM8.055,7.344H5.212V5.686H8.055Z" fill="#5c5c5c"/>
                </svg>
                &nbsp; {selectedCampaign?.Start_Date} -{" "}
                {selectedCampaign?.End_Date} </span> ) : ( <span className="fs-13 d-flex align-items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14.173" height="16.198" viewBox="0 0 14.173 16.198">
                  <path id="Icon_fa-regular-calendar-check" data-name="Icon fa-regular-calendar-check" d="M4.05,0a.757.757,0,0,1,.759.759V2.025H9.365V.759a.759.759,0,1,1,1.519,0V2.025h1.265A2.027,2.027,0,0,1,14.173,4.05V14.173A2.027,2.027,0,0,1,12.149,16.2H2.025A2.027,2.027,0,0,1,0,14.173V4.05A2.027,2.027,0,0,1,2.025,2.025H3.29V.759A.757.757,0,0,1,4.05,0Zm8.605,6.074H1.519v8.1a.508.508,0,0,0,.506.506H12.149a.508.508,0,0,0,.506-.506ZM10.409,9.4,6.865,12.939a.756.756,0,0,1-1.072,0L3.768,10.915A.758.758,0,0,1,4.84,9.842l1.487,1.487L9.333,8.324A.758.758,0,0,1,10.405,9.4Z" fill="#5c5c5c"/>
                </svg>
                &nbsp;
                Ongoing Campaign</span> )}</p>
              <p className="fs-12 mb-0 line-clamp-5">{selectedCampaign?.Campaign_Details.slice(0, 100)} </p>
              <p className="fs-12 mb-0 fw-500">Target Audience</p>
              <div className="d-flex flex-wrap gap-1 py-2"> {selectedCampaign?.Target_Audience?.map(
                (audience: string, index: number) => ( <span
         key={index}
         className="chips"
             > {audience} </span> )
                )} </div>
              <p className="fs-12 mb-0 fw-500">Campaign Details</p>
              <p className={`fs-12 mb-0 text-gray ${isReadMore ? '' : 'line-clamp-2'}`}> {selectedCampaign?.Campaign_Details} </p>
              {selectedCampaign?.Campaign_Details.length > 100 && (
              <button
           className="link fs-10"
           onClick={() => setIsReadMore(!isReadMore)}
              >
              {isReadMore ? 'Show less' : 'Read more'} </button>
              )} </div>
          </div>
        </div>
      </div>
      <div className="mainbox"> {!selectedCampaign?.Is_Applied && (
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
   
  
  </div>
  <div className="offcanvas-footer border-top p-3 bg-white">
      <div className="tw-flex tw-justify-end tw-space-x-3">
  <button className="tw-px-4 tw-py-2 tw-border tw-rounded tw-text-gray-600 hover:tw-text-gray-800" data-bs-dismiss="offcanvas">Cancel</button>
  <button
            className={`tw-px-4 tw-py-2 tw-bg-emerald-500 tw-text-white tw-rounded hover:tw-bg-emerald-600 ${
           selectedCampaign?.Is_Applied ? "btn-dark" : "btn-info"
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
        {selectedCampaign?.Is_Applied ? "Applied" : "Apply"} </button>
  
</div>




    </div>
</div>
  {/* drawer box ends here  */}
      </section>



      <CampaignOffcanvas />
      <CampaignFilterModal selectedCampaign={selectedCampaign} />
      <ApplyModal selectedCampaign={selectedCampaign} />
    </>
  );
}
export default withAuthRole({
  Component: DiscoverCreator,
  allowedRoles: ["creator"],
});