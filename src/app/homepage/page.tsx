"use client";

import { fetch_dashboard_data, getCampaignsCreatorsOverview } from "@/@api";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import PostCalendar from "@/components/Calendar";
import EditProfileModal from "@/components/EditProfileModal";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { defaultImagePath } from "@/components/constants";
import { Tooltip } from "@mui/material";
import HowItWorks from "@/components/HowItWorks";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";
import HowToInstall from "@/components/HowToInstall";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import { Drawer } from "@mui/material";
import { getCreatorPayouts } from "@/@api/creator";
import { calculatePayouts } from "@/utils/payoutUtils";

function Homepage() {
  const { user, userProfile, setIsLoading, notifications, setIsActive } =
    useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any>();
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [payouts, setPayouts] = useState<any>();
  const [payoutDetails, setPayoutDetails] = useState<{
    upcomingPayout: number;
    paidPayout: number;
    upcomingPayoutsList: any[];
    paidPayoutsList: any[];
  }>({
    upcomingPayout: 0,
    paidPayout: 0,
    upcomingPayoutsList: [],
    paidPayoutsList: [],
  });

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
    setPayouts(payouts);
  };
  useEffect(() => {
    const fetchPayouts = async () => {
      if (user?.uuid) {
        try {
          const userPosts = (await getCreatorPayouts(user.uuid)) as any[];
          const payoutData = calculatePayouts(userPosts);
          setPayoutDetails(payoutData);
        } catch (error) {
          console.error("Failed to fetch payouts:", error);
        }
      }
    };

    fetchPayouts();
  }, [user?.uuid]);

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

  const [isPayoutDrawerOpen, setIsPayoutDrawerOpenState] =
    useState<boolean>(false);

  function setIsPayoutDrawerOpen(open: boolean) {
    setIsPayoutDrawerOpenState(open);
  }

  const [selectedPayoutType, setSelectedPayoutTypeState] = useState<string>("");

  function setSelectedPayoutType(type: string) {
    setSelectedPayoutTypeState(type);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3 003">
          <HowToInstall />

          <div className="col-md-8">
            <div className="card mb-1">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="mb-0 fs-16 fw-medium">
                   Creator Profile
                  </p>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="22"
                            viewBox="0 0 20 22"
                          >
                            <g
                              id="Icon_feather-share-2"
                              data-name="Icon feather-share-2"
                              transform="translate(-2 -1)"
                            >
                              <path
                                id="Path_855"
                                data-name="Path 855"
                                d="M21,5a3,3,0,1,1-3-3A3,3,0,0,1,21,5Z"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <path
                                id="Path_856"
                                data-name="Path 856"
                                d="M9,12A3,3,0,1,1,6,9,3,3,0,0,1,9,12Z"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <path
                                id="Path_857"
                                data-name="Path 857"
                                d="M21,19a3,3,0,1,1-3-3A3,3,0,0,1,21,19Z"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <path
                                id="Path_858"
                                data-name="Path 858"
                                d="M8.59,13.51l6.83,3.98M15.41,6.51,8.59,10.49"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
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
                  <div className="img-container-lg-general">
                    <img
                      src={
                        userProfile?.Profile_Image ||
                        "https://e1cdn.social27.com/digitalevents/synnc/no-pic-synnc.jpg"
                      }
                      className="border object-fit-cover rounded-circle flex-shrink-0"
                      alt="Profile Picture"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex-grow-1 mb-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h5 className="mb-0 fw-medium fs-16">
                        {userProfile?.Name}
                      </h5>
                      <img
                        src={`https://flagcdn.com/24x18/${
                          (userProfile?.Country_Code || "us").toLowerCase()
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
                      {/*     <p className="mb-0 fs-12 text-warning">
                        @{userProfile?.Profile_URL || "No information"}
                      </p> */}
                      <p className="fs-14 fw-500 text-gray">
                        {userProfile?.Job_Title || ""}
                      </p>
                    </div>

                    <div className="d-flex gap-2 align-items-center mb-2">
                      <p className="fs-14 fw-500 text-gray">
                        {userProfile?.Current_Company}
                      </p>
                    </div>

                    {/* tags */}
                    {userProfile?.Audience_Interest.split(", ")?.length > 0 &&
                      userProfile?.Audience_Interest.split(", ")[0] !== "" && (
                        <div className="d-flex gap-2 mb-3">
                          {userProfile?.Audience_Interest.split(", ")?.map(
                            (audience_interest: string, index: number) => (
                              <div className="chip" key={index}>
                                <div className="chip-text">
                                  {" "}
                                  {audience_interest}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}

                    <p className="mb-0 fs-12 text-warning">
                      {userProfile?.Description &&
                      userProfile?.Description?.length > 100
                        ? userProfile?.Description?.slice(0, 100) + "..."
                        : userProfile?.Description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-itmes-center">
                <div className="statsbox-container-3">
                  <div className="stats-box">
                    <div className="stats-count">
                      {userProfile?.No_of_Followers}{" "}
                    </div>
                    <div className="stats-heading">Followers</div>
                  </div>
                </div>

                <div className="statsbox-container-3">
                  <div className="stats-box">
                    <div className="stats-count">
                      {userProfile?.Average_Engagements}
                    </div>
                    <div className="stats-heading">
                      Average Engagaements per post
                    </div>
                  </div>
                </div>

                <div className="statsbox-container-3">
                  <div className="stats-box">
                    <div className="stats-count">
                      {userProfile?.Average_Impressions}
                    </div>
                    <div className="stats-heading">
                      Average Impressions per post
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="statsbox-container-dash-4col py-3">



{/*               <div className="d-flex align-items-center gap-2 box-effect-shadow cursor-pointer" onClick={() => router.push('/campaigns')}>
                <div className="p-2 rounded-full bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21.022" viewBox="0 0 21 21.022">
  <g id="Icon_ion-megaphone-outline" data-name="Icon ion-megaphone-outline" transform="translate(-1.5 -1.478)">
    <path id="Path_870" data-name="Path 870" d="M19.122,2.448S15.061,7.5,11.25,7.5H3.75A.75.75,0,0,0,3,8.25v4.5a.75.75,0,0,0,.75.75h7.5c3.811,0,7.872,5.073,7.872,5.073a.684.684,0,0,0,1.128-.461V2.906a.667.667,0,0,0-1.128-.458ZM3,12s-.75-.281-.75-1.5S3,9,3,9m18,2.531a1.084,1.084,0,0,0,0-2.062M12,7.5v6m-6.75-6v6" fill="none" stroke="#1bb09d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_871" data-name="Path 871" d="M6.75,13.5v7.875a.375.375,0,0,0,.375.375H9.609a.75.75,0,0,0,.717-.972C9.933,19.518,9,18.1,9,15.75h.75A.75.75,0,0,0,10.5,15v-.75a.75.75,0,0,0-.75-.75H9" fill="none" stroke="#1bb09d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>

                </div>

                <div className="ml-4">
                  <p className="fs-13">Active Campaigns</p>
                  <p className="fs-16 fw-bold">
                    {campaigns?.Activated_Campaigns?.length}
                  </p>
                </div>
              </div> */}

<div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-100 tw-p-6 tw-hover:tw-bg-gray-400 cursor-pointer" onClick={() => router.push('/campaigns')}><div className="tw-flex tw-items-center tw-justify-between"><div><p className="tw-text-sm tw-text-gray-500">Active Campaigns</p><h3 className="tw-text-2xl tw-font-semibold tw-mt-1">{campaigns?.Activated_Campaigns?.length}</h3></div><div className="tw-bg-blue-50 tw-p-3 tw-rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21.022" viewBox="0 0 21 21.022"><g id="Icon_ion-megaphone-outline" data-name="Icon ion-megaphone-outline" transform="translate(-1.5 -1.478)"><path id="Path_870" data-name="Path 870" d="M19.122,2.448S15.061,7.5,11.25,7.5H3.75A.75.75,0,0,0,3,8.25v4.5a.75.75,0,0,0,.75.75h7.5c3.811,0,7.872,5.073,7.872,5.073a.684.684,0,0,0,1.128-.461V2.906a.667.667,0,0,0-1.128-.458ZM3,12s-.75-.281-.75-1.5S3,9,3,9m18,2.531a1.084,1.084,0,0,0,0-2.062M12,7.5v6m-6.75-6v6" fill="none" stroke="#1bb09d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path id="Path_871" data-name="Path 871" d="M6.75,13.5v7.875a.375.375,0,0,0,.375.375H9.609a.75.75,0,0,0,.717-.972C9.933,19.518,9,18.1,9,15.75h.75A.75.75,0,0,0,10.5,15v-.75a.75.75,0,0,0-.75-.75H9" fill="none" stroke="#1bb09d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg></div></div><div className="tw-mt-4 tw-flex tw-items-center tw-text-sm tw-text-gray-500"></div></div>




             {/*  <div className="d-flex align-items-center gap-2 box-effect-shadow cursor-pointer" onClick={() => {
                router.push('/campaigns');
                setTimeout(() => {
                  (document.querySelector('[data-bs-target="#submitted-campaigns"]') as HTMLElement)?.click();
                }, 100);
              }}>
                <div className="p-2 rounded-full bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="22.89" height="22.89" viewBox="0 0 22.89 22.89">
  <path id="Icon_material-twotone-connect-without-contact" data-name="Icon material-twotone-connect-without-contact" d="M12.3,15.734H10.011a10.3,10.3,0,0,1,10.3-10.3V7.722A8.006,8.006,0,0,0,12.3,15.734ZM20.312,12.3V10.011a5.724,5.724,0,0,0-5.722,5.722h2.289A3.429,3.429,0,0,1,20.312,12.3ZM7.722,4.289A2.289,2.289,0,1,0,5.433,6.578,2.281,2.281,0,0,0,7.722,4.289Zm5.093.572H10.526A3.422,3.422,0,0,1,7.15,7.722H3.717A1.714,1.714,0,0,0,2,9.439V12.3H8.867V9.714a5.688,5.688,0,0,0,3.948-4.853Zm8.641,14.306a2.289,2.289,0,1,0-2.289-2.289A2.281,2.281,0,0,0,21.456,19.167Zm1.717,1.144H19.739a3.422,3.422,0,0,1-3.376-2.862H14.074A5.688,5.688,0,0,0,18.023,22.3V24.89H24.89V22.028A1.714,1.714,0,0,0,23.173,20.312Z" transform="translate(-2 -2)" fill="#1b57b0"/>
</svg>


                </div>

                <div className="ml-4">
                  <p className="fs-13">Pending Applications</p>
                  <p className="fs-16 fw-bold">
                    {campaigns?.Submitted_Campaigns?.length}
                  </p>
                </div>
              </div> */}


<div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-100 tw-p-6 tw-hover:tw-bg-gray-400 cursor-pointer" onClick={() => {
                router.push('/campaigns');
                setTimeout(() => {
                  (document.querySelector('[data-bs-target="#submitted-campaigns"]') as HTMLElement)?.click();
                }, 100);
              }}><div className="tw-flex tw-items-center tw-justify-between"><div><p className="tw-text-sm tw-text-gray-500">Pending Applications</p><h3 className="tw-text-2xl tw-font-semibold tw-mt-1">{campaigns?.Submitted_Campaigns?.length}</h3></div><div className="tw-bg-blue-50 tw-p-3 tw-rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="22.89" height="22.89" viewBox="0 0 22.89 22.89">
  <path id="Icon_material-twotone-connect-without-contact" data-name="Icon material-twotone-connect-without-contact" d="M12.3,15.734H10.011a10.3,10.3,0,0,1,10.3-10.3V7.722A8.006,8.006,0,0,0,12.3,15.734ZM20.312,12.3V10.011a5.724,5.724,0,0,0-5.722,5.722h2.289A3.429,3.429,0,0,1,20.312,12.3ZM7.722,4.289A2.289,2.289,0,1,0,5.433,6.578,2.281,2.281,0,0,0,7.722,4.289Zm5.093.572H10.526A3.422,3.422,0,0,1,7.15,7.722H3.717A1.714,1.714,0,0,0,2,9.439V12.3H8.867V9.714a5.688,5.688,0,0,0,3.948-4.853Zm8.641,14.306a2.289,2.289,0,1,0-2.289-2.289A2.281,2.281,0,0,0,21.456,19.167Zm1.717,1.144H19.739a3.422,3.422,0,0,1-3.376-2.862H14.074A5.688,5.688,0,0,0,18.023,22.3V24.89H24.89V22.028A1.714,1.714,0,0,0,23.173,20.312Z" transform="translate(-2 -2)" fill="#1b57b0"/>
</svg></div></div><div className="tw-mt-4 tw-flex tw-items-center tw-text-sm tw-text-gray-500"></div></div>

       {/*        <div className="d-flex align-items-center gap-2 box-effect-shadow">
                <div className="p-2 rounded-full bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24">
  <path id="Icon_fa-solid-hand-holding-dollar" data-name="Icon fa-solid-hand-holding-dollar" d="M14.625,1.125v.492c.3.056.591.127.853.2A1.126,1.126,0,1,1,14.9,3.989a5.936,5.936,0,0,0-1.416-.234,1.89,1.89,0,0,0-.909.206.537.537,0,0,0-.164.141.223.223,0,0,0-.033.131v.028a.536.536,0,0,0,.155.122,6.123,6.123,0,0,0,1.284.473l.042.014a7.354,7.354,0,0,1,1.777.717,2.463,2.463,0,0,1,1.238,2.1,2.578,2.578,0,0,1-1.252,2.273,3.489,3.489,0,0,1-1,.413v.5a1.125,1.125,0,0,1-2.25,0v-.534c-.445-.108-.853-.248-1.2-.366-.1-.033-.192-.066-.281-.094A1.127,1.127,0,0,1,11.6,7.744l.342.117a5.682,5.682,0,0,0,1.589.389,1.7,1.7,0,0,0,.9-.192.435.435,0,0,0,.15-.136.316.316,0,0,0,.038-.192V7.72c0-.047,0-.1-.187-.216a5.7,5.7,0,0,0-1.27-.483l-.089-.028a7.454,7.454,0,0,1-1.706-.675A2.37,2.37,0,0,1,10.12,4.252a2.525,2.525,0,0,1,1.3-2.222,3.656,3.656,0,0,1,.947-.384v-.52a1.125,1.125,0,0,1,2.25,0ZM26.634,15.764a1.873,1.873,0,0,1-.4,2.62L20.3,22.758A6.381,6.381,0,0,1,16.519,24H1.5A1.5,1.5,0,0,1,0,22.5v-3A1.5,1.5,0,0,1,1.5,18H3.225l2.1-1.687A5.988,5.988,0,0,1,9.08,15H16.5a1.5,1.5,0,0,1,0,3H12.75a.75.75,0,0,0,0,1.5H18.4l5.611-4.134A1.873,1.873,0,0,1,26.634,15.764ZM9.075,18h0Z" fill="#1b57b0"/>
</svg>


                </div>

                <div
                  className="ml-4 cursor-pointer"
                  onClick={() => {
                    setIsPayoutDrawerOpen(true);
                    setSelectedPayoutType("upcoming");
                  }}
                >
                  <p className="fs-13">Upcoming Payouts</p>
                  <p className="fs-16 fw-bold">
                    ${payoutDetails.upcomingPayout.toLocaleString()}
                  </p>
                  <p className="fs-12 fw-400">Expected</p>
                </div>
              </div> */}


 <div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-100 tw-p-6 tw-hover:tw-bg-gray-400 cursor-pointer"  onClick={() => {
                    setIsPayoutDrawerOpen(true);
                    setSelectedPayoutType("upcoming");
                  }}><div className="tw-flex tw-items-center tw-justify-between"><div><p className="tw-text-sm tw-text-gray-500">Upcoming Payouts</p><h3 className="tw-text-2xl tw-font-semibold tw-mt-1">${payoutDetails.upcomingPayout.toLocaleString()}</h3></div><div className="tw-bg-blue-50 tw-p-3 tw-rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24">
                  <path id="Icon_fa-solid-hand-holding-dollar" data-name="Icon fa-solid-hand-holding-dollar" d="M14.625,1.125v.492c.3.056.591.127.853.2A1.126,1.126,0,1,1,14.9,3.989a5.936,5.936,0,0,0-1.416-.234,1.89,1.89,0,0,0-.909.206.537.537,0,0,0-.164.141.223.223,0,0,0-.033.131v.028a.536.536,0,0,0,.155.122,6.123,6.123,0,0,0,1.284.473l.042.014a7.354,7.354,0,0,1,1.777.717,2.463,2.463,0,0,1,1.238,2.1,2.578,2.578,0,0,1-1.252,2.273,3.489,3.489,0,0,1-1,.413v.5a1.125,1.125,0,0,1-2.25,0v-.534c-.445-.108-.853-.248-1.2-.366-.1-.033-.192-.066-.281-.094A1.127,1.127,0,0,1,11.6,7.744l.342.117a5.682,5.682,0,0,0,1.589.389,1.7,1.7,0,0,0,.9-.192.435.435,0,0,0,.15-.136.316.316,0,0,0,.038-.192V7.72c0-.047,0-.1-.187-.216a5.7,5.7,0,0,0-1.27-.483l-.089-.028a7.454,7.454,0,0,1-1.706-.675A2.37,2.37,0,0,1,10.12,4.252a2.525,2.525,0,0,1,1.3-2.222,3.656,3.656,0,0,1,.947-.384v-.52a1.125,1.125,0,0,1,2.25,0ZM26.634,15.764a1.873,1.873,0,0,1-.4,2.62L20.3,22.758A6.381,6.381,0,0,1,16.519,24H1.5A1.5,1.5,0,0,1,0,22.5v-3A1.5,1.5,0,0,1,1.5,18H3.225l2.1-1.687A5.988,5.988,0,0,1,9.08,15H16.5a1.5,1.5,0,0,1,0,3H12.75a.75.75,0,0,0,0,1.5H18.4l5.611-4.134A1.873,1.873,0,0,1,26.634,15.764ZM9.075,18h0Z" fill="#1b57b0"/>
                </svg></div></div><div className="tw-mt-4 tw-flex tw-items-center tw-text-sm tw-text-gray-500">Expected</div></div>





<div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-100 tw-p-6 tw-hover:tw-bg-gray-400 cursor-pointer"  onClick={() => {
                    setIsPayoutDrawerOpen(true);
                    setSelectedPayoutType("upcoming");
                  }}><div className="tw-flex tw-items-center tw-justify-between"><div><p className="tw-text-sm tw-text-gray-500">Total Payouts</p><h3 className="tw-text-2xl tw-font-semibold tw-mt-1">${payoutDetails.paidPayout.toLocaleString()}</h3></div><div className="tw-bg-blue-50 tw-p-3 tw-rounded-full"> <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="22"
                  viewBox="0 0 14 22"
                >
                  <g
                    id="Group_37"
                    data-name="Group 37"
                    transform="translate(-5 -1)"
                  >
                    <line
                      id="Line_1"
                      data-name="Line 1"
                      y2="20"
                      transform="translate(12 2)"
                      fill="none"
                      stroke="#22c55e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <path
                      id="Path_868"
                      data-name="Path 868"
                      d="M17,5H9.5a3.5,3.5,0,0,0,0,7h5a3.5,3.5,0,1,1,0,7H6"
                      fill="none"
                      stroke="#22c55e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </g>
                </svg></div></div><div className="tw-mt-4 tw-flex tw-items-center tw-text-sm tw-text-gray-500">Received</div></div>

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
                                    <div className="img-container-topHeader">
                                    <img
                                      src={
                                        element?.Company_Logo ||
                                        defaultImagePath
                                      }
                                      className=""
                                      alt="logo"
                                     
                                    />
                                    </div>
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
            <Drawer
              anchor="right"
              open={isPayoutDrawerOpen}
              onClose={() => setIsPayoutDrawerOpen(false)}
            >
              <div className="p-4" style={{ width: "500px" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Payouts Details</h5>
                  <Icon
                    icon="mdi:close"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={() => setIsPayoutDrawerOpen(false)}
                  />
                </div>

                {/* tabs */}
                <div
                  className="d-flex bg-tabs py-2 w-100"
                  role="tablist"
                  aria-orientation="horizontal"
                >
                  <button
                    className={`tab-payouts ${
                      selectedPayoutType === "total" ? "tab-payouts-active" : ""
                    }`}
                    role="tab"
                    type="button"
                    aria-selected={selectedPayoutType === "total"}
                    onClick={() => setSelectedPayoutType("total")}
                  >
                    Total Payouts
                  </button>
                  <button
                    className={`tab-payouts  ${
                      selectedPayoutType === "upcoming"
                        ? "tab-payouts-active"
                        : ""
                    }`}
                    role="tab"
                    type="button"
                    aria-selected={selectedPayoutType === "upcoming"}
                    onClick={() => setSelectedPayoutType("upcoming")}
                  >
                    Upcoming Payouts
                  </button>
                </div>
                <div className="mt-4">
                  {selectedPayoutType === "total" && (
                    <div className="PayoutBox">
                      <div>
                        {/* Total Payouts Content */}
                        {payoutDetails.paidPayoutsList.map((payout, index) => (
                          <div
                            key={index}
                            className="notification_wrapper new_campaign_application"
                          >
                            <div className="notify_icons">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16.5"
                                height="16.5"
                                viewBox="0 0 16.5 16.5"
                              >
                                <path
                                  id="Icon_core-resize-both"
                                  data-name="Icon core-resize-both"
                                  d="M18.97,9.97,16.6,12.337,11.663,7.4l2.383-2.383L12.781,3.75H3.75v9l1.28,1.28,2.39-2.39,4.939,4.939L9.954,18.985l1.265,1.265H20.25v-9Zm-.22,8.78H12.311l2.17-2.17L7.42,9.519l-2.17,2.17V5.25h6.439L9.541,7.4,16.6,14.459l2.148-2.148Z"
                                  transform="translate(-3.75 -3.75)"
                                />
                              </svg>
                            </div>
                            <div className="ml-3 w-100">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="w-50">
                                  <p className="fs-14 fw-500">
                                    {payout.postTitle}
                                  </p>
                                  <p className="fs-11 fw-400 text-gray">
                                    {payout.date}
                                  </p>
                                </div>

                                <div className="w-50 text-right">
                                  <p className="fs-14 fw-500 text-red">
                                    ${payout.budget}
                                  </p>
                                  <p className="fs-11 fw-400 text-gray">Paid</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {payoutDetails.paidPayoutsList.length === 0 && (
                          <div className="text-center py-3">
                            <p>No paid payouts yet</p>
                          </div>
                        )}
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="fs-16 fw-500 text-black">
                          Total Received
                        </div>
                        <div className="fs-16 fw-500 text-teal">
                          ${payoutDetails.paidPayout.toLocaleString()}
                        </div>
                      </div>

                      {/* Total Payouts Content */}
                    </div>
                  )}
                  {selectedPayoutType === "upcoming" && (
                    <div className="PayoutBox">
                      <div>
                        {/* Upcoming Payouts Content */}
                        {payoutDetails.upcomingPayoutsList.map(
                          (payout, index) => (
                            <div
                              key={index}
                              className="notification_wrapper new_campaign_application"
                            >
                              <div className="notify_icons">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16.5"
                                  height="16.5"
                                  viewBox="0 0 16.5 16.5"
                                >
                                  <path
                                    id="Icon_core-resize-both"
                                    data-name="Icon core-resize-both"
                                    d="M18.97,9.97,16.6,12.337,11.663,7.4l2.383-2.383L12.781,3.75H3.75v9l1.28,1.28,2.39-2.39,4.939,4.939L9.954,18.985l1.265,1.265H20.25v-9Zm-.22,8.78H12.311l2.17-2.17L7.42,9.519l-2.17,2.17V5.25h6.439L9.541,7.4,16.6,14.459l2.148-2.148Z"
                                    transform="translate(-3.75 -3.75)"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3 w-100">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="w-50">
                                    <p className="fs-14 fw-500">
                                      {payout.postTitle}
                                    </p>
                                    <p className="fs-11 fw-400 text-gray">
                                      Expected: {payout.date}
                                    </p>
                                  </div>

                                  <div className="w-50 text-right">
                                    <p className="fs-14 fw-500 text-red">
                                      ${payout.budget}
                                    </p>
                                    <p className="fs-11 fw-400 text-gray">
                                      Upcoming
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                        {payoutDetails.upcomingPayoutsList.length === 0 && (
                          <div className="text-center py-3">
                            <p>No upcoming payouts yet</p>
                          </div>
                        )}
                      </div>
                      {/* Upcoming Payouts Content */}
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="fs-16 fw-500 text-black">
                          Total Expected
                        </div>
                        <div className="fs-16 fw-500 text-teal">
                          ${payoutDetails.upcomingPayout.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* tabs */}
              </div>
            </Drawer>

            <div className="card mb-3">
              <div className="card-body">
               <PostCalendar />
              </div>
            </div>

            <div className="card mb-3" style={{ height: "48%" }}>
              <div className="card-body">
                <p className="mb-2 fs-16 fw-medium ">What's New</p>
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
          </div>
        </div>
      </div>

      <EditProfileModal user={user} userProfile={userProfile} />
    </>
  );
}

export default withAuth(Homepage);
