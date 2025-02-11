"use client";
import { getCampaignsCreatorsOverview, login } from "@/@api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import CampaignOffcanvas from "@/components/campaignoffcanvas";
import { useRouter } from "next/navigation";
import CampaignFilterModal from "@/components/campaignfiltermodal";
import { defaultImagePath } from "@/components/constants";

import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "@/components/EmptyState";
import { withAuthRole } from "@/utils/withAuthRole";
function Campaigns() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<any>();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const { user, setIsLoading } = useAuth();
  const handleRowClick = (e: any) => {
    router.push(`/SubmitCampaigns?id=${e.target.id}`);
  };

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
                      Active Campaigns (
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
                      Submitted Campaigns (
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
                                  <div className="card card-hover h-100">
                                    <div className="card-body d-flex flex-column">
                                      <div className="d-flex gap-2 mb-4">
                                        <img
                                          src={
                                            campaign?.Company_Logo ||
                                            defaultImagePath
                                          }
                                          className="border object-fit-cover rounded-circle flex-shrink-0"
                                          alt="logo"
                                          width={40}
                                          height={40}
                                        />
                                        <div>
                                          <p className="fw-medium mb-0 fs-16">
                                            {campaign?.Headline?.slice(0, 100)}
                                          </p>

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
                                        <Icon
                                          icon="mdi:linkedin"
                                          width={18}
                                          height={18}
                                          className="text-info ms-auto"
                                        />
                                        <Icon
                                          icon="mdi:web"
                                          width={18}
                                          height={18}
                                          className="text-warning ms-1"
                                        />
                                      </div>
                                      <div className="d-flex gap-2 mb-4 align-items-center">
                                        <Icon
                                          icon="solar:eye-broken"
                                          width="18"
                                          height="18"
                                          className="text-gray flex-shrink-0"
                                        />
                                        <p className="mb-0">
                                          {campaign?.Target_Audience?.join(
                                            " , "
                                          )}
                                        </p>
                                      </div>
                                      <div className="d-flex gap-3 justify-content-end">
                                        <button
                                          className="btn btn-outline-dark"
                                          id={campaign?._id}
                                          onClick={handleRowClick}
                                        >
                                          Manage Submissions
                                        </button>
                                        <button
                                          className="btn btn-dark"
                                          key={index}
                                          onClick={() => {
                                            setSelectedCampaign(campaign);
                                          }}
                                          data-bs-toggle="modal"
                                          data-bs-target="#exampleModal"
                                        >
                                          Detail
                                        </button>
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
                                  <div className="card card-hover h-100">
                                    <div className="card-body d-flex flex-column">
                                      <div className="d-flex gap-2 mb-4">
                                        <img
                                          src={
                                            campaign?.Company_Logo ||
                                            defaultImagePath
                                          }
                                          className="border object-fit-cover rounded-circle flex-shrink-0"
                                          alt="logo"
                                          width={40}
                                          height={40}
                                        />
                                        <div>
                                          <p className="fw-medium mb-0 fs-16">
                                            {campaign?.Headline?.slice(0, 100)}
                                          </p>
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
                                        <Icon
                                          icon="mdi:linkedin"
                                          width={18}
                                          height={18}
                                          className="text-info ms-auto"
                                        />
                                        <Icon
                                          icon="mdi:web"
                                          width={18}
                                          height={18}
                                          className="text-warning ms-1"
                                        />
                                      </div>
                                      <div className="d-flex gap-2 mb-4 align-items-center">
                                        <Icon
                                          icon="solar:eye-broken"
                                          width="18"
                                          height="18"
                                          className="text-gray flex-shrink-0"
                                        />
                                        <p className="mb-0">
                                          {campaign?.Target_Audience?.join(
                                            " , "
                                          )}
                                        </p>
                                      </div>
                                      <div className="d-flex gap-3 justify-content-end">
                                        <button
                                          className="btn btn-dark"
                                          key={index}
                                          onClick={() => {
                                            setSelectedCampaign(campaign);
                                          }}
                                          data-bs-toggle="modal"
                                          data-bs-target="#exampleModal"
                                        >
                                          Detail
                                        </button>
                                      </div>
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
      <CampaignFilterModal selectedCampaign={selectedCampaign} />
    </>
  );
}
export default withAuthRole({
  Component: Campaigns,
  allowedRoles: ["creator"],
});
