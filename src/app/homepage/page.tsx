"use client";

import { fetch_dashboard_data, getCampaignsCreatorsOverview } from "@/@api";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import PostCalendar from "@/components/Calendar";
import EditProfileModal from "@/components/EditProfileModal";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { defaultImagePath } from "@/components/constants";
import { Tooltip } from "@mui/material";
import WelcomeBanner from "@/components/WelcomeBanner";
import HowItWorks from "@/components/HowItWorks";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";
import HowToInstall from "@/components/HowToInstall";
import { NodeNextRequest } from "next/dist/server/base-http/node";

function Homepage() {
  const { user, userProfile, setIsLoading, notifications, setIsActive } =
    useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any>();
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const howItWorksSteeps = [
    {
      title: "Step 1: Claim your profile",
      description: "Download and install our Chrome extension to get started.",
      icon: "bi bi-download",
      link: "https://chrome.google.com/webstore/category/extensions",
    },

    {
      title: "Step 2: Discover campaigns",
      description: "Find campaigns that match your expertise and interests.",
      icon: "bi bi-search",
      link: "https://app.synnc.us/campaigns",
    },
    {
      title: "Step 3: Get Paid",
      description:
        "Complete campaign requirements and receive payment securely.",
      icon: "bi bi-currency-dollar",
    },
  ];
  // const router = useRouter()
  useEffect(() => {
    setIsActive(0);
    fetchData();
    user?.email &&
      getCampaignsCreatorsOverview(user?.email, setCampaigns, setIsLoading);
  }, [user]);

  const fetchData = async () => {
    const response: any = await fetch_dashboard_data();
    setUsers(response?.data?.users);
  };

  const shareProfile = () => {
    try {
      const path = window.location.origin + "/profile-view/" + userProfile?._id;
      navigator.clipboard.writeText(path);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, 5000);
    } catch (error) {}
  };

  const router = useRouter();
  const hasActiveCampaigns =
    campaigns &&
    campaigns?.Activated_Campaigns &&
    campaigns?.Activated_Campaigns?.length !== 0;

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3 003">
          <HowToInstall />

          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="mb-0 fs-16 fw-medium">Profile</p>
                  <div className="d-flex align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      <Tooltip
                        title={linkCopied ? "Link Copied" : "Share Profile"}
                        arrow
                        placement="top"
                      >

                         <div
                      className="editprofilebox"
                      onClick={shareProfile}
                      style={{ cursor: "pointer" }}
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22">
  <g id="Icon_feather-share-2" data-name="Icon feather-share-2" transform="translate(-2 -1)">
    <path id="Path_855" data-name="Path 855" d="M21,5a3,3,0,1,1-3-3A3,3,0,0,1,21,5Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    <path id="Path_856" data-name="Path 856" d="M9,12A3,3,0,1,1,6,9,3,3,0,0,1,9,12Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    <path id="Path_857" data-name="Path 857" d="M21,19a3,3,0,1,1-3-3A3,3,0,0,1,21,19Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    <path id="Path_858" data-name="Path 858" d="M8.59,13.51l6.83,3.98M15.41,6.51,8.59,10.49" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </g>
</svg>

                    </div>
       
                      </Tooltip>
                      <Tooltip title="Edit Profile" arrow placement="top">
                      <div
                      className="editprofilebox"
                      onClick={() => router.push("/Profile")}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="edit-medium"
                        aria-hidden="true"
                        data-supported-dps="24x24"
                        fill="currentColor"
                      >
                        <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                      </svg>
                    </div>
                      </Tooltip>
                    </div>
                    <Link
                      href="https://chrome.google.com/webstore/category/extensions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary ms-3 d-flex align-items-center gap-1"
                    >
                      <Icon icon="mdi:download" width={18} height={18} />
                      <span>Download Chrome Extension</span>
                    </Link>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <img
                    src={userProfile?.Profile_Image || defaultImagePath}
                    className="border object-fit-cover rounded-circle flex-shrink-0"
                    alt="Profile Picture"
                    width={80}
                    height={80}
                  />

                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h5 className="mb-0 fw-medium fs-16">
                        {userProfile?.Name}
                      </h5>
                      <img
                        src={`https://flagcdn.com/24x18/${
                          userProfile?.Country_Code || "us"
                        }.png`}
                        width={24}
                        height={14}
                      />
                      {userProfile?.Profile_URL ? (
                        <Link
                          href={`https://www.linkedin.com/in/${userProfile?.Profile_URL}`}
                          target="_blank"
                        >
                          <Icon
                            style={{ cursor: "pointer" }}
                            icon="mdi:linkedin"
                            width={24}
                            height={24}
                            className="text-info"
                          />
                        </Link>
                      ) : (
                        <Tooltip
                          title="Add your LinkedIn User"
                          arrow
                          placement="top"
                        >
                          <Icon
                            style={{ cursor: "pointer", color: "grey" }}
                            icon="mdi:linkedin"
                            width={24}
                            height={24}
                            // className="text-info"
                            className="text-grey"
                            onClick={() => router.push("/Profile")}
                          />
                        </Tooltip>
                      )}
                    </div>

                    <div className="d-flex gap-2 align-items-center mb-2">
                      <p className="mb-0 fs-12 text-warning">
                        @{userProfile?.Profile_URL || "No information"}
                      </p>
                    
                    </div>
                    {/* tags */}
                    <div className="d-flex gap-2 ">
                      {userProfile?.Audience_Interest.split(", ")?.map(
                        (audience_interest: string, index: number) => (
                          <div className="chip" key={index}>
                          <div className="chip-text">{" "}{audience_interest}
</div>
                        </div>
                        )
                      )}
                    </div>
                    <div className="d-flex gap-2 flex-wrap mb-3">
                      {userProfile?.Skills?.map(
                        (element: any, index: number) => (
                          <span
                            key={index}
                            className="badge bg-success text-secondary rounded-pill fw-light border border-transparent"
                          >
                            {element}
                          </span>
                        )
                      )}
                    </div>

                    <p className="mb-0 fs-12 text-warning">
                      {userProfile?.Description &&
                      userProfile?.Description?.length > 100
                        ? userProfile?.Description?.slice(0, 100) + "..."
                        : userProfile?.Description}
                    </p>
                  </div>
                </div>

                <div className="statsbox-container-dash">
               
                <div className="stats-box-dash">
                       
                        <h5 className="stats-count-dash">
                          {userProfile?.No_of_Followers}{" "}
                        </h5>
                        <p className="stats-heading-dash">Followers</p>
                 </div>
                  
                  
                 <div className="stats-box-dash">
                          <h5 className="stats-count-dash">
                          {userProfile?.Average_Engagements}
                        </h5>
                        <p className="stats-heading-dash">
                          Average Engagaements per post
                        </p>
                      </div>
              
                      <div className="stats-box-dash">
                               <h5 className="stats-count-dash">
                          {userProfile?.Average_Impressions}
                        </h5>
                        <p className="stats-heading-dash">
                          Average Impressions per post
                        </p>
                      </div>
               
                </div>
     </div>
     </div>
            <div className="card h-10">
              {!hasActiveCampaigns && (
                <div className="d-flex flex-column justify-content-center min-h-100 howitwork">
                  <HowItWorks steps={howItWorksSteeps} />
                </div>
              )}
              {hasActiveCampaigns && (
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="mb-0 fs-16 fw-medium">Activated Campaigns</p>
                    <p
                      className="mb-0 fs-12 fw-medium ms-auto cursor"
                      onClick={() => {
                        router.push("/campaigns");
                      }}
                    >
                      {" "}
                      Campaigns{" "}
                    </p>
                    <Icon
                      icon="ri:arrow-right-line"
                      width="16"
                      height="16"
                      className="cursor ms-1"
                    />
                  </div>
                  <div className="bg-campaigns">
                    <div className="card-wrapper">
                      {campaigns?.Activated_Campaigns?.map(
                        (element: any, index: any) => {
                          if (index < 5) {
                            return (
                              <div
                                onClick={() => {
                                  router.push(
                                    `/SubmitCampaigns?id=${element?._id}`
                                  );
                                }}
                                key={index}
                                className="card mb-2 card-hover"
                              >
                                <div className="card-body py-2 ps-2 pe-3">
                                  <div className="d-flex gap-3 align-items-center">
                                    <img
                                      src={
                                        element?.Company_Logo ||
                                        defaultImagePath
                                      }
                                      className="border object-fit-cover rounded flex-shrink-0"
                                      alt="logo"
                                      width={32}
                                      height={32}
                                    />
                                    <p className="mb-0 fw-medium">
                                      {element?.Headline}
                                    </p>
                                    <p className="mb-0 fs-12 text-warning ms-auto">
                                      {element?.Created_At} |{" "}
                                      {element?.Time_Ago}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="card mb-3" style={{ height: "48%" }}>
              <div className="card-body">
                <p className="mb-2 fs-16 fw-medium ">Notifications</p>
                {notifications?.notifications &&
                notifications?.notifications?.length !== 0 ? (
                  notifications?.notifications
                    .slice(0, 8)
                    ?.map((notify: any, index: number) => {
                      return (
                        <div key={index} className="notification-list">
                          <div className="d-flex gap-3">
                            <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                              {notify?.Notification_Icon_Type ==
                                "new_campaign_application" && (
                                <Icon
                                  icon="ci:add-plus"
                                  width="22"
                                  height="22"
                                  className="text-info"
                                />
                              )}
                              {notify?.Notification_Icon_Type ==
                                "campaign_application_accepted" && (
                                <Icon
                                  icon="mdi:tick"
                                  width="20"
                                  height="20"
                                  className="text-primary"
                                />
                              )}
                              {notify?.Notification_Icon_Type ==
                                "campaign_post_rejected" && (
                                <Icon
                                  icon="pepicons-pencil:exclamation"
                                  width="22"
                                  height="22"
                                  className="text-danger"
                                />
                              )}
                              {notify?.Notification_Icon_Type ==
                                "campaign_post_approved" && (
                                <Icon
                                  icon="mdi:tick"
                                  width="20"
                                  height="20"
                                  className="text-primary"
                                />
                              )}
                              {notify?.Notification_Icon_Type ==
                                "campaign_post_submission" && (
                                <Icon
                                  icon="ci:add-plus"
                                  width="22"
                                  height="22"
                                  className="text-info"
                                />
                              )}
                            </div>
                            <div className="flex-grow-1">
                              <p className="mb-0 fw-medium fs-12">
                                {notify?.Title}
                              </p>
                              <p className="mb-0 fs-10 text-warning line-clamp-1">
                                {notify?.Message}
                              </p>
                            </div>
                          </div>
                          <hr className="my-2 text-warning" />
                        </div>
                      );
                    })
                ) : (
                  <EmptyState
                    icon="bi bi-bell-slash"
                    title="No New Notifications"
                    description="You're all caught up! No new notifications at the moment."
                    iconSize={32}
                  />
                )}
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <p className="mb-0 fs-16 fw-medium">Upcoming Posts</p>
                <PostCalendar />
              </div>
            </div>

            {/* <div className="card">
                            <div className="card-body">
                                <p className='mb-2 fs-16 fw-medium'>Payments</p>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <p className='mb-0 fs-12'>Total Sync Earnings</p>
                                    <p className='mb-0 fw-medium fs-16'>$30k</p>
                                </div>
                                <hr className='my-2 text-warning' />
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <p className='mb-0 fs-12'>Payement Incoming for Campaign</p>
                                    <i className="bi bi-check-circle-fill text-primary ms-2"></i>
                                </div>
                                <hr className='my-2 text-warning' />
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <p className='mb-0 fs-12'>Payement Sent</p>
                                    <i className="bi bi-check-circle-fill text-primary ms-2"></i>
                                </div>
                                <hr className='my-2 text-warning' />
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0 fs-12'>Payement Incoming for Campaign</p>
                                    <i className="bi bi-check-circle-fill text-primary ms-2"></i>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>

      <EditProfileModal user={user} userProfile={userProfile} />
    </>
  );
}

export default withAuth(Homepage);
