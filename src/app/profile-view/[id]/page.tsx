"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { useEffect, useState } from "react";
import { getCreatorDetailsById } from "@/@api";
import { useRouter } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";
export default function Index({ params }: any) {
  const { user, setIsLoading, isLoading } = useAuth();
  const [userProfile, setUserDetails] = useState<any>(null);
  const router = useRouter();
  const [activeCampaigns, setActiveCampaigns] = useState<any>(null);
  const { id } = params;
  const [buyerList, setBuyerList] = useState<any[]>([]);
  useEffect(() => {
    if (id) {
      getCreatorDetailsById(id, setUserDetails, setIsLoading);
      // Fetch buyer list data here and set it
      fetch('/api/buyerList')
        .then(response => response.json())
        .then(data => setBuyerList(data))
        .catch(error => console.error('Error fetching buyer list:', error));
    }
  }, [id, setIsLoading]);

  function addToCreatorList(item: any, user: any): void {
    // Assuming we have an API endpoint to add a creator to a list
    fetch('/api/addToCreatorList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listId: item.id,
        userId: user.id,
        creatorId: userProfile._id,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Creator added to the list successfully');
      } else {
        alert('Failed to add creator to the list');
      }
    })
    .catch(error => {
      console.error('Error adding creator to the list:', error);
      alert('An error occurred while adding the creator to the list');
    });
  }

  return (
<div className="container">
<div className="main-profilebanner">
        {/* Banner Image */}
        <img
                src={userProfile?.Banner_Image || defaultImagePath}
                alt="Profile Banner"
                className="object-fit-cover rounded-3 w-100 cover-img"
                style={{ height: "200px" }}
              />
      </div>
      <div className="col-md-10 mx-auto">  

<div className="profile-box-container mb-4 position-relative"  style={{ marginTop: "-50px" }}>
            <div className="profile-topsection" >
              <div className="profile-image-content" style={{ width: "50%" }}>
              <div className="profile-image">
                <img
                src={userProfile?.Profile_Image || "https://e1cdn.social27.com/digitalevents/synnc/no-pic-synnc.jpg"}
                alt="Profile Picture"
                />
              </div>
              <div className="profile-image-content-text">
                {/* Profile Info */}
                <div className="mt-2">
                <h4 className="mb-1 fs-20" id="name">
                {userProfile?.Name}
                </h4>
        
             

                  <p className="mb-0 fs-14"> 
                  {userProfile?.Current_Company}
                </p>

            
               
                <div className="chips-container d-flex flex-wrap gap-2">
                  {userProfile?.Categories?.map((category: any, index: number) => (
                  <Tooltip title={category} key={index}>
                    <div className="chip">
                    <div className="chip-text">{category}</div>
                    </div>
                  </Tooltip>
                  ))}
                </div>
                </div>
              </div>
              </div>
              <div className="action-btn-profile d-flex align-items-center justify-content-end">
              <button className="btn btn-dark me-2"  onClick={() => {
                        router.push(`/inbox?id=${userProfile?._id}`);
                      }}>
                <Icon icon="mdi:chat" className="me-1" />
                Chat
              </button>
              <button className="btn btn-white border flex-shrink-0 btn-sm"  type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                <Icon icon="mdi:plus" className="me-1" />
                Add to
              </button>
              <ul
                                         className="border-radius0 py-2 px-2 dropdown-menu p-2 dropdown-menu-end position-fixed"
                                         style={{
                                           width: "400px",
                                           maxHeight: "300px",
                                           overflowY: "auto",
                                           top: "20%",
                                           left: "50%",
                                           transform: "translateX(-50%)",
                                           boxShadow: "1px 1px 5px #dddddd",
                                         }}
                                         >
                                            <div className="mb-3">
                                              <p className="fs-15 fw-500 text-black">
                                                Campaigns
                                              </p>
                                              {activeCampaigns?.campaigns?.map(
                                                (
                                                  campaingElement: any,
                                                  indexNum: number
                                                ) => {
                                                    function inviteCreator(campaignElement: any, user: any) {
                                                    // Assuming we have an API endpoint to invite a creator to a campaign
                                                    fetch('/api/inviteCreator', {
                                                      method: 'POST',
                                                      headers: {
                                                      'Content-Type': 'application/json',
                                                      },
                                                      body: JSON.stringify({
                                                      campaignId: campaignElement.id,
                                                      userId: user.id,
                                                      creatorId: userProfile._id,
                                                      }),
                                                    })
                                                    .then(response => response.json())
                                                    .then(data => {
                                                      if (data.success) {
                                                      alert('Creator invited to the campaign successfully');
                                                      } else {
                                                      alert('Failed to invite creator to the campaign');
                                                      }
                                                    })
                                                    .catch(error => {
                                                      console.error('Error inviting creator to the campaign:', error);
                                                      alert('An error occurred while inviting the creator to the campaign');
                                                    });
                                                    }

                                                  return (
                                                    <div
                                                      key={indexNum}
                                                      className="d-flex align-items-center mb-2 ms-2"
                                                    >
                                                      <span
                                                        className="d-flex align-items-center fs-12 text-truncate"
                                                        style={{
                                                          maxWidth: "300px",
                                                        }}
                                                      >
                                                        <Icon
                                                          icon="tabler:target"
                                                          className="me-2 flex-shrink-0"
                                                        />
                                                        {
                                                          campaingElement?.Headline
                                                        }
                                                      </span>
                                                      <button
                                                        className="btn btn-dark  ms-auto flex-shrink-0"
                                                        onClick={() => {
                                                          inviteCreator(
                                                            campaingElement,
                                                            user
                                                          );
                                                        }}
                                                      >
                                                        Add
                                                      </button>
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </div>

                                            <div>
                                            <p className="fs-15 fw-500 text-black">
                                                Lists
                                              </p>
                                              {buyerList?.map(
                                                (item: any, index: number) => (
                                                  <div
                                                    key={index}
                                                    className="d-flex justify-content-between align-items-center mb-2 ms-2"
                                                  >
                                                    <span
                                                      className="d-flex align-items-center fs-12 text-truncate"
                                                      style={{
                                                        maxWidth: "300px",
                                                      }}
                                                    >
                                                      <Icon
                                                        icon="tabler:target"
                                                        className="me-2 flex-shrink-0"
                                                      />
                                                      {item?.List_Name}
                                                    </span>
                                                    <button
                                                      className="btn btn-dark"
                                                      onClick={() =>
                                                        addToCreatorList(
                                                          item,
                                                          user
                                                        )
                                                      }
                                                    >
                                                      Add
                                                    </button>
                                                  </div>
                                                )
                                              )}

                                              <div className="border-top mt-2 pt-2">
                                                <a
                                                  className="dropdown-item p-1 d-flex align-items-center"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#createNewListModal"
                                                >
                                                  <Icon
                                                    icon="ri:add-fill"
                                                    className="me-2"
                                                  />
                                                  Create New List
                                                </a>
                                              </div>
                                            </div>
                                          </ul>
            </div>
            </div>


            <div className="statsbox-container">
            <div className="stats-box">
              <div className="stats-count">{userProfile?.Location}</div>
              <div className="stats-heading">Location</div>
            </div>
            <div className="stats-box">
              <div className="stats-count">
              {userProfile?.Average_Engagements}
              </div>
              <div className="stats-heading">Average Engagements</div>
            </div>
            <div className="stats-box">
              <div className="stats-count">{userProfile?.Average_Impressions}</div>
              <div className="stats-heading">Average Impressions</div>
            </div>
            <div className="stats-box">
              <div className="stats-count">{userProfile?.No_of_Followers || 0}</div>
              <div className="stats-heading">Followers</div>
            </div>
          </div>
          </div>

<div className="profile-bottom-section">
<div className="profile-left-column">
  <div className="profile-box-container mb-4 mt-16 position-relative">
    <div className="aboutusSection">
      <h2 style={{ display: "flex" }} className="py-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        &nbsp; About
      </h2>
      <p className="text-muted-l">
      {userProfile?.Description || ""}
      </p>
    </div>
  </div>
</div>
<div className="profile-right-column">
            <div className="profile-box-container mb-4 mt-16 position-relative">
              {/* Collaboration Section */}
              <div className="aboutusSection">
                <div className="letbox_campaigns">
                  <h2 style={{ display: "flex" }} className="py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                    </svg>
                    &nbsp; Let's Collaborate
                  </h2>
                                              
                   <div>
                   <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"><div className="d-flex align-items-center  justify-content-space-between mb-3"><div>
                    <h3 className="font-semibold text-gray-900">1x Sponsored Post</h3></div>
                   <span className="text-gray-900 font-medium">$ 900</span></div>
                   <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-gray-600">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mt-2.5">
                      </div>1 LinkedIn post focusing on your brand
                      </li>
                       <li className="flex items-start gap-2 text-gray-600">
                      <div className="w-1 h-1 rounded-full bg-gray-400 mt-2.5"></div>Basic performance analytics reported</li>
                      <li className="flex items-start gap-2 text-gray-600"><div className="w-1 h-1 rounded-full bg-gray-400 mt-2.5"></div>~1 week turnaround</li>
                      <li className="flex items-start gap-2 text-gray-600"><div className="w-1 h-1 rounded-full bg-gray-400 mt-2.5"></div>One round of revisions</li>
                      </ul>
                   <button className="btn btn-dark flex-shrink-0 btn-sm">Book Now</button>
                   </div>
                   </div>
                                    


               </div>
            </div>
          </div>
</div>
</div>
</div>
          </div>
  );
}
