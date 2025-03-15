"use client";
import { getCampaignsCreatorsOverview, login } from "@/@api";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import CampaignOffcanvas from "@/components/campaignoffcanvas";
import { useRouter } from "next/navigation";
import CampaignFilterModal from "@/components/campaignfiltermodal";
import { defaultImagePath } from "@/components/constants";

import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "@/components/EmptyState";
import { withAuthRole } from "@/utils/withAuthRole";
import Link from "next/link";
import BrandViewCampaignOffcanvas from "@/components/BrandViewCampaignOffcanvas";
import { Key } from "lucide-react";
function Campaigns() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<any>();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const { user, setIsLoading } = useAuth();
  const handleRowClick = (id: string) => {
    router.push(`/campaign-hub?id=${id}`);
  };

  useEffect(() => {
    console.log('selectedCampaign', selectedCampaign)
  }, selectedCampaign)
  useEffect(() => {
    user?.email &&
      getCampaignsCreatorsOverview(user?.email, setCampaigns, setIsLoading);
  }, [user]);

  const hasActiveCampaigns = !!campaigns?.Activated_Campaigns?.length;
  const hasSubmittedCampaigns = !!campaigns?.Submitted_Campaigns?.length;

  return (
    <>
      <section className="dashboard">
        <div className="container-fluid">
          <div className="row my-3">
            <div className="col-12">
              <div className="">
                <ul
                  className="nav nav-underline mb-3 border-bottom"
                  id="active-submitted-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="active-campaigns-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#active-campaigns"
                      type="button"
                      role="tab"
                      aria-controls="active-campaigns"
                      aria-selected="true"
                    >
                      Active Campaigns(
                      {campaigns?.Activated_Campaigns?.length || 0})
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="submitted-campaigns-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#submitted-campaigns"
                      type="button"
                      role="tab"
                      aria-controls="submitted-campaigns"
                      aria-selected="false"
                    >
                      Pending Applications (
                      {campaigns?.Submitted_Campaigns?.length || 0})
                    </button>
                  </li>
                </ul>
              </div>

              <div className="row">
                <div className="col-12 mb-2">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="active-campaigns"
                      role="tabpanel"
                      aria-labelledby="active-campaigns-tab"
                      tabIndex={0}
                    >
                      {hasActiveCampaigns && (
                        <div className="row g-3 mb-3">
                          {campaigns?.Activated_Campaigns?.map(
                            (campaign: any, index: number) => {
                              return (
                                <div key={index} className="col-md-4">
                                  <div className="tw-border tw-rounded-md  tw-bg-white tw-shadow-sm cursor-pointer hover:tw-bg-gray-50 hover:tw-shadow-sm tw-py-10 tw-px-6" onClick={() => handleRowClick(campaign._id)}>
      <div className="tw-flex tw-items-start tw-justify-between">
            <div className="tw-flex tw-items-start tw-space-x-4">
              <div className="img-container-topHeader">
              {campaign?.Company_Logo ? (
        <img
          src={campaign.Company_Logo}
          className=""
          alt="logo"
          width={40}
          height={40}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-light rounded-circle flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
          }}
        >
          <span className="fw-bold text-uppercase">
            {campaign?.Company_Name
              ? campaign.Company_Name.charAt(
                0
              )
              : "C"}
          </span>
        </div>
      )}
              </div>
              <div>
                
                <div className="tw-text-gray-600 tw-mt-1">
                  <p className="fw-medium mb-0 fs-16">{campaign?.Headline?.slice(0, 100)}</p>
                  <div className="d-flex align-items-center">
          <p className="fs-12 text-warning mb-0">
            {campaign?.Created_At}
          </p>
          <div className="vr mx-2"></div>
          <p className="fs-12 text-warning mb-0">
            {campaign?.Time_Ago}
          </p>
        </div>
                </div>
                <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mt-2">
                {campaign?.Target_Audience?.map((audience: string, index: number) => (
                   <span key={index} className="chips">{audience}</span>
                 ))}
                </div>
                 </div>
            </div>
          </div>


</div>
                                  </div>
                              );
                            }
                          )}
                        </div>
                      )}
                      {!hasActiveCampaigns && (
                        <EmptyState
                          icon="bi bi-briefcase-fill"
                          title="No Active Campaigns"
                          description="You currently have no active campaigns."
                          secondaryDescription="Start a new campaign or check for new opportunities."
                          buttonText="Find Campaigns"
                          buttonLink="/DiscoverCreator"
                        />
                      )}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="submitted-campaigns"
                      role="tabpanel"
                      aria-labelledby="submitted-campaigns-tab"
                      tabIndex={1}
                    >
                      {hasSubmittedCampaigns && (
                        <div className="row g-3 mb-3">
                          {campaigns?.Submitted_Campaigns?.map(
                            (campaign: any, index: number) => {
                              return (
                                <div key={index} className="col-md-4">
                                   <div className="tw-border tw-rounded-lg tw-p-6 tw-bg-white tw-shadow-sm hover:tw-bg-gray-50 hover:tw-shadow-sm">
      <div className="tw-flex tw-items-start tw-justify-between">
            <div className="tw-flex tw-items-start tw-space-x-4">
              <div className="img-container-topHeader">
              {campaign?.Company_Logo ? (
        <img
          src={campaign.Company_Logo}
          className=""
          alt="logo"
        
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-light rounded-circle flex-shrink-0"
          style={{
            width: "50px",
            height: "50px",
          }}
        >
          <span className="fw-bold text-uppercase">
            {campaign?.Company_Name
              ? campaign.Company_Name.charAt(
                0
              )
              : "C"}
          </span>
        </div>
      )}
              </div>
              <div>
                
                <div className="tw-text-gray-600 tw-mt-1">
                  <p className="fw-medium mb-0 fs-16">{campaign?.Headline?.slice(0, 100)}</p>
                  <div className="d-flex align-items-center">
          <p className="fs-12 text-warning mb-0">
            {campaign?.Created_At}
          </p>
          <div className="vr mx-2"></div>
          <p className="fs-12 text-warning mb-0">
            {campaign?.Time_Ago}
          </p>
        </div>
                <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mt-2">
                {campaign?.Target_Audience?.map((audience: string, index: number) => (
                   <span key={index} className="chips">{audience}</span>
                 ))}
                </div>
                </div>
          
                 </div>     
         
            </div>
          </div>
          <div className="tw-flex tw-justify-end tw-items-center tw-p-4">
  <button   className="tw-border tw-border-teal-500 tw-text-teal-500 tw-bg-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-teal-500 hover:tw-text-white tw-transition-colors">
    View Details
  </button>
</div>


</div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                      {!hasSubmittedCampaigns && (
                        <EmptyState
                          icon="bi bi-file-earmark-text"
                          title="No Submitted Campaigns"
                          description="You haven't submitted any campaigns yet."
                          secondaryDescription="Submit a campaign to start working with brands."
                          buttonText="Submit a Campaign"
                          buttonLink="/DiscoverCreator"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CampaignOffcanvas />
      {/* <BrandViewCampaignOffcanvas brandid={brandId} companyname={companyName} /> */}
      <CampaignFilterModal selectedCampaign={selectedCampaign} />
    </>
  );
}
export default withAuthRole({
  Component: Campaigns,
  allowedRoles: ["creator"],
});
