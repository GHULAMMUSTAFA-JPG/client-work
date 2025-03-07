"use client";

import {
  addCreatorInList,
  deleteListItem,
  fetch_dashboard_data,
  fetchBuyerActiveCampaigns,
  fetchBuyerDiscoveryData,
  getSavedList,
  getSpecificCreatorList,
  inviteCreatorCall,
} from "@/@api";
import CreateNewListModal from "@/components/CreateNewListModal";
import TopCardBuyer from "@/components/TopCardBuyer";
import ViewCreatorsModal from "@/components/ViewCreatorsModal";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { useRouter } from "next/navigation";
import { withAuthRole } from "@/utils/withAuthRole";
import CreatorProfileDrawer from "@/components/CreatorProfileDrawer";

function Mycreatorsbuyer() {
  const { user, setIsLoading, userProfile, setIsActive } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [buyersDetails, setBuyerDetails] = useState<any>();
  const [buyerList, setBuyerList] = useState<any>();
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedIdCreators, setSelectedIdCreators] = useState<any>();
  const [selectedList, setSelectedList] = useState<any>();
  const [activeCampaigns, setActiveCampaign] = useState<any>();
  const [rendControl, setRendControl] = useState<boolean>(false);
  const [rendControls, setRendControls] = useState<boolean>(false);
  const [query, setquery] = useState<string>("");
  const router = useRouter();
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>("");
  // const router = useRouter()
  console.log("buyersDetails", buyersDetails);
  useEffect(() => {
    fetchData();
    setIsActive(1);
  }, []);

  const fetchActiveCampaign = async () => {
    fetchBuyerActiveCampaigns(user?.email, setActiveCampaign, setIsLoading);
  };

  useEffect(() => {
    if (user?.email) {
      // fetchBuyerDiscoveryData(user?.email, setBuyerDetails, setIsLoading);
      getSavedList(user?.email, setBuyerList, setIsLoading);
      fetchActiveCampaign();
    }
  }, [user?.email, rendControl]);

  useEffect(() => {
    if (query == "") {
      setRendControl(!rendControl);
    }
  }, [query]);

  useEffect(() => {
    if (user?.email) {
      fetchBuyerDiscoveryData(
        user?.email,
        setBuyerDetails,
        setIsLoading,
        query
      );
    }
  }, [user?.email, rendControl, query]);

  useEffect(() => {
    selectedId !== "" &&
      getSpecificCreatorList(selectedId, setSelectedIdCreators, setIsLoading);
  }, [selectedId, rendControl]);

  useEffect(() => {
    console.log(activeCampaigns, "activeCampaigns");
  }, [activeCampaigns]);

  const fetchData = async () => {
    const response: any = await fetch_dashboard_data();
    // console.log(response.data)
    setUsers(response.data?.users);
  };

  const addToCreatorList = async (list: any, user: any) => {
    const dto = {
      List_Id: list?._id,
      Creator_Id: user?._id,
    };
    addCreatorInList(dto, rendControl, setRendControl);
  };
  const actionFunction = async (action: string, list: any) => {
    if (action == "edit") {
      setSelectedList(list);
    } else {
      deleteListItem(list, rendControl, setRendControl);
    }
  };

  const inviteCreator = async (selectedCampaign: any, user: any) => {
    const response = await inviteCreatorCall(
      {
        campaign_id: selectedCampaign?._id,
        creator_id: user?._id,
      },
      setIsLoading
    );
    console.log(response);
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setRendControl(!rendControl);
    }
  };
  return (
    <>
      <div className="container-fluid">
        {/* <TopCardBuyer /> */}
        <div className="row mb-3">
          <div className="col-12">
           
            <ul
              className="nav nav-underline mb-3 border-bottom"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Global Creators
                </button>
              </li>
              {/* <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">External Global Creators</button>
                            </li> */}
              {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">Draft Campaigns</button>
                                </li> */}
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="contact-tab-pane"
                  aria-selected="false"
                >
                  My Lists{" "}
                </button>
              </li>
              <div className="position-relative w-auto mb-2 ms-auto">
                <input
                  type="text"
                  className="form-control custom-input"
                  onChange={(e) => setquery(e.target.value)}
                  value={query}
                  id="exampleFormControlInput1"
                  placeholder="Search"
                  onKeyPress={handleKeyPress} //
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
            </ul>
            {/* <hr className="" /> */}
            <div className="row">
              <div className="col-12 mb-2">
                <div className="tab-content " id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home-tab-pane"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabIndex={0}
                  >
                    <div className="card">
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table align-middle text-center mb-0">
                            <thead>
                              <tr>
                                <th scope="col" className="text-start ps-4">
                                  Creators
                                </th>
                                {/* <th scope="col">Social Platform</th> */}
                                <th scope="col">Company</th>
                                <th scope="col">Followers</th>
                                <th scope="col">Impressions</th>
                                <th scope="col">Engagements</th>
                                <th scope="col">Actions</th>
                                {/* <th scope="col">Social Media Value</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {buyersDetails?.Global_Creators?.length !== 0 &&
                                buyersDetails?.Global_Creators?.map(
                                  (user: any) => (
                                    <tr
                                      key={user?._id}
                                      className="cursor hover-bg-light"
                                      onClick={(e) => {
                                        if (
                                          (e.target as HTMLElement).closest(
                                            ".drop-down-table"
                                          )
                                        ) {
                                          return;
                                        }
                                        setSelectedCreatorId(user?._id);
                                      }}
                                    >
                                      <td
                                        className="text-start ps-4"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#creatorProfileDrawer"
                                      >
                                        <div className="d-flex align-items-center">
                                          <img
                                            src={
                                              user?.Profile_Image ||
                                              defaultImagePath
                                            }
                                            alt={user?.Name}
                                            width={30}
                                            height={30}
                                            className="user-img img-fluid"
                                          />
                                          <span className="ms-2 text-truncate">
                                            {user?.Name}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#creatorProfileDrawer"
                                      >
                                        <p className="mb-2">
                                          {user?.Current_Company}
                                        </p>
                                      </td>
                                      <td
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#creatorProfileDrawer"
                                      >
                                        <p className="mb-2">
                                          {user?.No_of_Followers?.toLocaleString()}
                                        </p>
                                      </td>
                                      <td
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#creatorProfileDrawer"
                                      >
                                        <p className="mb-2">
                                          {user?.No_of_Impressions?.toLocaleString()}
                                        </p>
                                      </td>

                                      <td
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#creatorProfileDrawer"
                                      >
                                        <p className="mb-2">
                                          {user?.No_of_Engagements?.toLocaleString()}
                                        </p>
                                      </td>

                                      <td className="drop-down-table">
                                        <div className="dropdown">
                                          <button
                                            className="btn btn-info btn-sm dropdown-toggle rounded-pill px-3"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <Icon icon="material-symbols:add" />{" "}
                                            <span className="fs-12">
                                              ADD TO
                                            </span>
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
                                              <p className="fs-13 fw-500 text-black">
                                              Campaigns
                                              </p>
                                              {activeCampaigns?.campaigns?.map(
                                              (
                                                campaingElement: any,
                                                indexNum: number
                                              ) => {
                                                return (
                                                <div
                                                  key={indexNum}
                                                  className="d-flex align-items-center mb-2 ms-2 hover-bg-light"
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
                                                  className="btn btn-dark ms-auto flex-shrink-0"
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
                                              <p className="fs-13 fw-500 text-black">
                                              Lists
                                              </p>
                                              {buyerList?.map(
                                              (item: any, index: number) => (
                                                <div
                                                key={index}
                                                className="d-flex justify-content-between align-items-center mb-2 ms-2 hover-bg-light"
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
                                      </td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                
                  <div
                    className="tab-pane fade"
                    id="contact-tab-pane"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                    tabIndex={0}
                  >
                    <div className="container">
                      <div className="row">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mt-3">
                        <p className="fs-20 fw-600">My Lists</p>
                        <p className="fs-14">Manage your creator lists</p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-dark"
                          data-bs-toggle="modal"
                          data-bs-target="#createNewListModal"
                          onClick={() => {
                            setSelectedList(undefined);
                          }}
                        >
                          <Icon
                            icon="ri:add-fill"
                            onClick={() => {
                              setSelectedList(undefined);
                            }}
                          />{" "}
                          Create New List
                        </button>
       
                      </div>
                      <div  className="list-gridbox-3">
                      {buyerList?.map((entry: any, index: number) => {
                        return (
                          
                          
                    
<div key={index} className="card-listbox-campaigns">
      
        <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="fs-16 fw-bold mb-3">{entry?.List_Name &&
          entry?.List_Name?.length > 100
            ? entry?.List_Name?.slice(0, 100) + "..."
            : entry?.List_Name}</h2>
            <div className="icon-group">
                <button  onClick={() => {
              actionFunction("edit", entry);
            }} className="icon-btn"  data-bs-toggle="modal"
            data-bs-target="#createNewListModal"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pencil "><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg></button>
                <button  onClick={() => {
              actionFunction("delete", entry?._id);
            }} className="icon-btn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2 "><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
            </div>
        </div>

      
        <div className="category d-flex align-items-center mt-1">
            <span className="tag-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-tag text-emerald-600"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg></span>
            <span className="category-text">Technology</span>
        </div>

      
        <div className="info-row d-flex gap-3 mt-2 align-items-center">
            <div className="info-item d-flex align-items-center mt-2">
                <span className="info-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users mr-1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                <span className="info-text">12 Creators</span>
            </div>
            <div className="info-item d-flex align-items-center mt-2">
                <span className="info-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar mr-1"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg></span>
                <span className="info-text">Updated: 28/2/2024</span>
            </div>
        </div>

      
        <button   onClick={() => {
          setSelectedId(entry?._id);
        }} className="button-list"  data-bs-toggle="modal"
        data-bs-target="#viewCreatorsModal">Open & Manage</button>
    </div>
 
                        );
                      })}
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateNewListModal
        data={selectedList}
        setRendControl={setRendControl}
        rendControl={rendControl}
      />
      <ViewCreatorsModal
        data={selectedIdCreators}
        rendControl={rendControl}
        setRendControl={setRendControl}
        onCreatorClick={(creatorId) => setSelectedCreatorId(creatorId)}
      />
      <CreatorProfileDrawer creatorId={selectedCreatorId} />
    </>
  );
}
export default withAuthRole({
  Component: Mycreatorsbuyer,
  allowedRoles: ["buyer"],
});


