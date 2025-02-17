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

function Homepage() {
  const { user, userProfile, setIsLoading, notifications, setIsActive } =
    useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any>();
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const howItWorksSteeps = [
    {
      title: "Discover Campaigns",
      description: "Find brand campaigns that fit your niche.",
      icon: "bi bi-search",
    },
    {
      title: "Apply & Get Hired",
      description: "Submit your application and collaborate with brands.",
      icon: "bi bi-person-check",
    },
    {
      title: "Create & Get Paid",
      description: "Deliver high-quality content and receive payment securely.",
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
            <div className="card mb-3 ">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center mb-3 gap-3">
                    <p className="mb-0 fs-16 fw-medium">Profile</p>

                    <div className="d-flex gap-2 align-items-center cursor">
                      <Tooltip
                        title={linkCopied ? "Link Copied" : "Share Profile"}
                        arrow
                        placement="top"
                        className=""
                      >
                        <Icon
                          icon="iconamoon:share-1-thin"
                          width="20"
                          height="20"
                          className="cursor flex-shrink-0 text-dark me-1"
                          onClick={() => {
                            shareProfile();
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Edit Profile" arrow placement="top">
                        <Icon
                          icon="material-symbols-light:edit-square-outline-rounded"
                          width="20"
                          height="20"
                          className="cursor flex-shrink-0 text-dark"
                          onClick={() => router.push("/Profile")}
                        />
                      </Tooltip>
                    </div>
                  </div>
                  <Link
                    href="https://chrome.google.com/webstore/category/extensions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary ms-3 d-flex align-items-center gap-1"
                  >
                    <Icon icon="mdi:download" width={18} height={18} />
                    <span>Download Extension</span>
                  </Link>
                </div>
                <div className="d-flex gap-2 mb-3">
                  <img
                    src={userProfile?.Profile_Image || defaultImagePath}
                    className="border object-fit-cover rounded-circle flex-shrink-0"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <p className="mb-0 fw-medium fs-16">
                        {userProfile?.Name}
                      </p>
                      <img
                        src={`https://flagcdn.com/24x18/${
                          userProfile?.Country_Code || "us"
                        }.png`}
                        width={24}
                        height={14}
                        className="mx-2"
                      />
                      <Link
                        href={
                          userProfile?.Profile_URL
                            ? `https://www.linkedin.com/in/${userProfile?.Profile_URL}`
                            : "#"
                        }
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
                    </div>

                    <div className="d-flex gap-2 align-items-center mt-2">
                      <p className="mb-0 fs-12 text-warning">
                        @{userProfile?.Profile_URL || "No information"}
                      </p>
                      <div
                        className="bg-light rounded-circle d-inline-block"
                        style={{ width: "6px", height: "6px" }}
                      ></div>
                      <p className="mb-0 fs-12 text-warning">
                        <span className="text-dark fw-medium">
                          {userProfile?.No_of_Followers}{" "}
                        </span>
                        followers
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 flex-wrap mb-3">
                  {userProfile?.Skills?.map((element: any, index: number) => {
                    return (
                      <span
                        key={index}
                        className="badge bg-success text-secondary rounded-pill fw-light border border-transparent"
                      >
                        {element}
                      </span>
                    );
                  })}
                </div>
                <p className="mb-0 fs-12 text-warning">
                  {userProfile?.Description &&
                  userProfile?.Description?.length > 100
                    ? userProfile?.Description?.slice(0, 100) + "..."
                    : userProfile?.Description}
                </p>

                <div className="row mt-4 g-4">
                  <div className="col-md-4">
                    <div className="card h-100 bg-box">
                      <div className="card-body">
                        <p className="text-muted">Followers</p>
                        <h5 className="CounterTXT">
                          {userProfile?.No_of_Followers}{" "}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100 bg-box">
                      <div className="card-body">
                        <p className="text-muted">
                          Average Engagaements per post
                        </p>
                        <h5 className="CounterTXT">
                          {userProfile?.Average_Engagements}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100 bg-box">
                      <div className="card-body">
                        <p className="text-muted">
                          Average Impressions per post
                        </p>
                        <h5 className="CounterTXT">
                          {userProfile?.Average_Impressions}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card h-10">
              {!hasActiveCampaigns && (
                <div className="d-flex flex-column justify-content-center min-h-100">
                  <WelcomeBanner
                    title="Welcome to Synnc!"
                    subtitle="Get started by exploring brand campaigns and applying for collaborations."
                    cta={{
                      text: "Find Campaigns",
                      link: "/campaigns",
                    }}
                  />
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
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <p className="mb-2 fs-16 fw-medium">Notifications</p>

                {notifications?.notifications &&
                notifications?.notifications?.length !== 0 ? (
                  notifications?.notifications?.map(
                    (notify: any, index: number) => {
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
                    }
                  )
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
        {!hasActiveCampaigns && <HowItWorks steps={howItWorksSteeps} />}
        {/* <Topcard /> */}

        {/* <div className="row graphs g-3">
                    <div className="col-md-6">
                        <ChartsDashboard />
                    </div>
                    <div className="col-md-6">
                        <BarsDashboard />
                    </div>
                    <div className="col-md-6">
                        <VerticalBarChart />
                    </div>
                    <div className="col-md-6">
                        <ProgressDashboard />
                    </div>
                </div> */}
      </div>

      <EditProfileModal user={user} userProfile={userProfile} />
    </>
  );
}

export default withAuth(Homepage);
