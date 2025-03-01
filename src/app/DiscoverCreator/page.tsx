"use client";
import {
  getDiscoverCampaigns,
  getDiscoverCampaignsForFilters,
  getDiscoverCampaignsForSearch,
  login,
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

function DiscoverCreator() {
  const searchParams = useSearchParams();
  const brandName = searchParams.get("brandName") || "";
  const [searchText, setSearchText] = useState<string>(brandName);
  const [campaignData, setCampaignData] = useState<any>();
  const { setIsLoading, user, setIsActive } = useAuth();
  const [pageNo, setPageNo] = useState<number>(1);
  const [limit, setLimit] = useState<number>(30);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  useEffect(() => {
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

  return (
    <>
      <section className="dashboard">
        <div className="container">
          <div className="row my-2">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                <div className="position-relative w-auto mb-2">
                  <input
                    type="text"
                    onChange={(e: any) => {
                      setSearchText(e?.target?.value);
                    }}
                    className="form-control custom-input"
                    id="exampleFormControlInput1"
                    placeholder="Search for Campaigns"
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
                  className="form-select custom-select mb-2"
                  onChange={(e: any) => {
                    filterCampaignCall(e.target.value);
                  }}
                  aria-label="Small select example"
                >
                  {/* <option selected value="popular">Most Popular</option> */}
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                {/* <button className='btn btn-primary rounded-pill d-flex align-items-center' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <Icon icon="akar-icons:settings-vertical" width={20} height={20} />
                                    <span className='ms-2'>Advanced Filters</span>
                                </button> */}
              </div>
            </div>
          </div>
          <div className="row g-2 mb-3">
            {campaignData?.campaigns?.map((campaign: any, index: number) => {
              return (
                <div
                  key={index}
                  className="col-md-12"
                  onClick={() => {
                    setSelectedCampaign(campaign);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#applyModal"
                >

      <div className="card card-hover py-2">
  
       <div className="card-body d-flex justify-content-start gap-3 item-content-start"> 
                  <div className="image-content">
                  <img
                            src={campaign?.Company_Logo || defaultImagePath}
                            className="border object-fit-cover rounded-circle flex-shrink-0 vh-60"
                            alt="logo"
                            width={40}
                            height={40}
                          />
                  </div>
                  <div className="content-wrapper w-100 mt-1">
                  <p className="fw-medium mb-0 fs-16 line-clamp-1">
                            {campaign?.Headline?.slice(0, 100)}
                  </p>
                   <p className="fs-13 mb-0 fs-16 line-clamp-1">
                            {campaign?.Campaign_Details?.slice(0, 100)}
                  </p>
               <div className="d-flex gap-2 mt-2 mb-2 align-items-center">
                <Icon
                  icon="solar:eye-broken"
                  width="18"
                  height="18"
                  className="text-gray flex-shrink-0"
                />
                <p className="mb-0 line-clamp-1">
                  {campaign?.Target_Audience?.join(" , ")}
                </p>
              </div>
              <div className="d-flex py-1">
                  {campaign.Company_Website && (
                    <Link
                      href={`${campaign.Company_Website}`}
                      target="_blank"
                    >
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
                    <Link
                      href={`https://${campaign.Company_Linkedin}`}
                      target="_blank"
                    >
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
                  <div className="action_wrapper text-end">
                  
                         <p className="fs-13 mb-0 fs-16 line-clamp-1 text-right">
                         $  {campaign?.Budget}
                  </p>
                  <div className="learnmore-btn d-flex justify-content-end">
                        <button
                          className="btn btn-dark ms-2 btn-sm w-s mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#applyModal"
                          onClick={() => {
                            setSelectedCampaign(campaign);
                          }}
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
