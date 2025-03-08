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
import ViewCreatorsModal from "@/components/ViewCreatorsModal";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { withAuthRole } from "@/utils/withAuthRole";
import CreatorProfileDrawer from "@/components/CreatorProfileDrawer";
import { Search, Filter, X, Plus, UserPlus } from "lucide-react";
import { MultiSelect } from "@/components/MultiSelect";
import { CREATOR_FILTER_OPTIONS } from "@/constant/brand";
import Tooltip from "@/components/Tooltip";

// Add these interfaces at the top of the file, after the imports
interface FilterState {
  countries: string[];
  jobTitles: string[];
  companies: string[];
  companySizes: string[];
  followerRange: string;
  engagementRate: string;
  industry: string;
  language: string;
  verified: boolean;
}

interface ActiveFilterState {
  countries: string[];
  jobTitles: string[];
  companies: string[];
  companySizes: string[];
  followerRange: string;
}

const EMPTY_FILTERS: FilterState = {
  countries: [],
  jobTitles: [],
  companies: [],
  companySizes: [],
  followerRange: "",
  engagementRate: "",
  industry: "",
  language: "",
  verified: false,
};

const EMPTY_ACTIVE_FILTERS: ActiveFilterState = {
  countries: [],
  jobTitles: [],
  companies: [],
  companySizes: [],
  followerRange: "",
};

function Mycreatorsbuyer() {
  const { user, setIsLoading, setIsActive } = useAuth();

  const [users, setUsers] = useState<any[]>([]);
  const [buyersDetails, setBuyerDetails] = useState<any>();
  const [buyerList, setBuyerList] = useState<any>();
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedIdCreators, setSelectedIdCreators] = useState<any>();
  const [selectedList, setSelectedList] = useState<any>();
  const [activeCampaigns, setActiveCampaign] = useState<any>();
  const [rendControl, setRendControl] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilterState>(EMPTY_ACTIVE_FILTERS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<"campaign" | "list" | null>(
    null
  );

  const fetchData = useCallback(async () => {
    const response: any = await fetch_dashboard_data();
    setUsers(response.data?.users);
  }, []);

  const fetchActiveCampaign = useCallback(async () => {
    if (user?.email) {
      fetchBuyerActiveCampaigns(user.email, setActiveCampaign, setIsLoading);
    }
  }, [user?.email, setIsLoading]);

  const fetchCreatorList = useCallback(() => {
    if (user?.email) {
      getSavedList(user.email, setBuyerList, setIsLoading);
    }
  }, [user?.email, setIsLoading]);

  const fetchDiscoveryData = useCallback(() => {
    if (user?.email) {
      fetchBuyerDiscoveryData(
        user.email,
        setBuyerDetails,
        setIsLoading,
        query,
        Object.keys(activeFilters).length > 0 ? activeFilters : undefined
      );
    }
  }, [user?.email, query, activeFilters, setIsLoading]);

  // Filter functions
  const resetFilters = () => {
    setFilters(EMPTY_FILTERS);
    setActiveFilters(EMPTY_ACTIVE_FILTERS);
    fetchDiscoveryData();
  };

  const applyFilters = () => {
    setActiveFilters({
      countries: filters.countries,
      jobTitles: filters.jobTitles,
      companies: filters.companies,
      companySizes: filters.companySizes,
      followerRange: filters.followerRange,
    });
    setIsFilterOpen(false);
    fetchDiscoveryData();
  };

  // Update MultiSelect onChange handlers
  const handleFilterChange = (key: keyof FilterState, value: string[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Action functions
  const addToCreatorList = async (list: any, creator: any) => {
    const dto = {
      List_Id: list?._id,
      Creator_Id: creator?._id,
    };
    addCreatorInList(dto, rendControl, setRendControl);
  };

  const actionFunction = async (action: string, list: any) => {
    if (action === "edit") {
      setSelectedList(list);
    } else {
      deleteListItem(list, rendControl, setRendControl);
    }
  };

  const inviteCreator = async (selectedCampaign: any, creator: any) => {
    await inviteCreatorCall(
      {
        campaign_id: selectedCampaign?._id,
        creator_id: creator?._id,
      },
      setIsLoading
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setRendControl(!rendControl);
    }
  };

  // Effects
  useEffect(() => {
    fetchData();
    setIsActive(1);
  }, [fetchData, setIsActive]);

  useEffect(() => {
    if (user?.email) {
      fetchCreatorList();
      fetchActiveCampaign();
    }
  }, [user?.email, rendControl, fetchCreatorList, fetchActiveCampaign]);

  useEffect(() => {
    if (query === "") {
      setRendControl(!rendControl);
    }
  }, [query]);

  useEffect(() => {
    fetchDiscoveryData();
  }, [user?.email, rendControl, query, activeFilters, fetchDiscoveryData]);

  useEffect(() => {
    if (selectedId !== "") {
      getSpecificCreatorList(selectedId, setSelectedIdCreators, setIsLoading);
    }
  }, [selectedId, rendControl, setIsLoading]);

  // Render creator row
  const renderCreatorRow = (creator: any) => (
    <tr
      key={creator?._id}
      className="cursor hover-bg-light"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest(".drop-down-table")) {
          return;
        }
        setSelectedCreatorId(creator?._id);
      }}
    >
      <td
        className="text-start ps-4"
        data-bs-toggle="offcanvas"
        data-bs-target="#creatorProfileDrawer"
      >
        <div className="d-flex align-items-center">
          <img
            src={creator?.Profile_Image || defaultImagePath}
            alt={creator?.Name}
            width={30}
            height={30}
            className="user-img img-fluid"
          />
          <div className="ms-2">
            <div className="d-flex align-items-center gap-2">
            <div className="text-truncate fw-medium">{creator?.Name}</div>
            <div className=" fs-14">
              {creator?.Country_Code && (
                <img
                  src={`https://flagcdn.com/${creator.Country_Code.toLowerCase()}.svg`}
                  width="24"
                  height="18"
                  className="me-2"
                  alt={creator.Country_Code}
                />
              )}
              </div>
              </div>
              <span className="text-truncate text-secondary">
                {creator?.Job_Title || ""}
              </span>
          </div>
        </div>
      </td>
      <td data-bs-toggle="offcanvas" data-bs-target="#creatorProfileDrawer">
        <p className="mb-2">{creator?.Current_Company}</p>
      </td>
      <td data-bs-toggle="offcanvas" data-bs-target="#creatorProfileDrawer">
        <p className="mb-2">{creator?.No_of_Followers?.toLocaleString()}</p>
      </td>
      <td data-bs-toggle="offcanvas" data-bs-target="#creatorProfileDrawer">
        <p className="mb-2">{creator?.No_of_Impressions?.toLocaleString()}</p>
      </td>
      <td data-bs-toggle="offcanvas" data-bs-target="#creatorProfileDrawer">
        <p className="mb-2">{creator?.No_of_Engagements?.toLocaleString()}</p>
      </td>
      <td className="drop-down-table">
        <div className="tw-flex tw-justify-center tw-gap-2">
          <Tooltip content="Add creator to a list to organize and group similar creators">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCreatorId(creator?._id);
                setDrawerType("list");
                setIsDrawerOpen(true);
              }}
              className="tw-p-1.5 tw-bg-teal-500 tw-text-white tw-rounded tw-hover:bg-teal-600 tw-transition-colors"
            >
              <Plus className="tw-h-4 tw-w-4" />
            </button>
          </Tooltip>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCreatorId(creator?._id);
              setDrawerType("campaign");
              setIsDrawerOpen(true);
            }}
            className="tw-p-1.5 tw-bg-blue-500 tw-text-white tw-rounded tw-hover:bg-blue-600 tw-transition-colors"
          >
            <UserPlus className="tw-h-4 tw-w-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  // Render list card
  const renderListCard = (entry: any, index: number) => (
    <div
      key={index}
      className="tw-border tw-rounded-lg tw-p-6 tw-bg-white tw-shadow-sm"
    >
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-4 tw-mt-2">
        <h3 className="tw-font-medium tw-text-lg tw-truncate">
          {entry?.List_Name}
        </h3>
        <div className="tw-flex tw-gap-2">
          <Tooltip content="Edit list details">
            <button
              onClick={() => actionFunction("edit", entry)}
              data-bs-toggle="modal"
              data-bs-target="#createNewListModal"
              className="tw-p-1.5 tw-text-gray-500 tw-hover:text-gray-700 tw-transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil hover:text-blue-500"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
            </button>
          </Tooltip>
          <Tooltip content="Delete list">
            <button
              onClick={() => actionFunction("delete", entry?._id)}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash"
                >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" x2="10" y1="11" y2="17"></line>
                <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
            </button>
          </Tooltip>
        </div>
      </div>

     <div className="tw-flex tw-items-center tw-gap-4 tw-mb-4">
        <div className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-users"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>12 Creators</span>
        </div>
        <div className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
          <span>Updated: 28/2/2024</span>
        </div>
      </div>

      <button
        onClick={() => setSelectedId(entry?._id)}
        className="tw-w-full tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded-md tw-hover:bg-teal-600 tw-transition-colors"
        data-bs-toggle="modal"
        data-bs-target="#viewCreatorsModal"
      >
        Open & Manage
      </button>
    </div>
  );

  // Render filter sidebar
  const renderFilterSidebar = () => (
    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40">
      <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-96 tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
        <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b">
          <h2 className="tw-text-xl tw-font-semibold">
            Refine Your Creator Search
          </h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="tw-text-gray-400 tw-hover:text-gray-600"
          >
            <X className="tw-h-6 tw-w-6" />
          </button>
        </div>

        <div className="tw-flex-1 tw-overflow-y-auto tw-p-6">
          <div className="tw-space-y-6">
            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                Countries
              </label>
              <MultiSelect
                options={CREATOR_FILTER_OPTIONS.countryOptions}
                value={filters.countries}
                onChange={(value) => handleFilterChange("countries", value)}
                placeholder="Select countries"
              />
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                Job Titles
              </label>
              <MultiSelect
                options={CREATOR_FILTER_OPTIONS.jobTitleOptions}
                value={filters.jobTitles}
                onChange={(value) => handleFilterChange("jobTitles", value)}
                placeholder="Select job titles"
              />
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                Companies
              </label>
              <MultiSelect
                options={CREATOR_FILTER_OPTIONS.companyOptions}
                value={filters.companies}
                onChange={(value) => handleFilterChange("companies", value)}
                placeholder="Select companies"
              />
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                Company Size
              </label>
              <MultiSelect
                options={CREATOR_FILTER_OPTIONS.companySizeOptions}
                value={filters.companySizes}
                onChange={(value) => handleFilterChange("companySizes", value)}
                placeholder="Select company sizes"
              />
            </div>

            <div>
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                Follower Range
              </label>
              <select
                className="tw-w-full tw-border tw-rounded-md tw-p-2"
                value={filters.followerRange}
                onChange={(e) =>
                  setFilters({ ...filters, followerRange: e.target.value })
                }
              >
                {CREATOR_FILTER_OPTIONS.followerRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="tw-p-6 tw-border-t tw-bg-white">
          <div className="tw-flex tw-justify-end tw-space-x-3">
            <button
              onClick={resetFilters}
              className="tw-px-4 tw-py-2 tw-text-gray-600 tw-hover:text-gray-800"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded-md tw-hover:bg-teal-600"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaignDrawer = () => (
    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40">
      <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-full md:tw-w-[80%] lg:tw-w-[560px] tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
        <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b">
          <div>
            <h2 className="tw-text-xl tw-font-semibold">Invite to Campaign</h2>
            <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
              Select a campaign to invite this creator to
            </p>
          </div>
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              setDrawerType(null);
            }}
            className="tw-text-gray-400 tw-hover:text-gray-600"
          >
            <X className="tw-h-6 tw-w-6" />
          </button>
        </div>

        <div className="tw-flex-1 tw-overflow-y-auto">
          <div className="tw-p-6">
            <div className="tw-space-y-4">
              {activeCampaigns?.campaigns?.map(
                (campaign: any, index: number) => (
                  <div
                    key={index}
                    className="tw-border tw-rounded-lg tw-p-4 tw-hover:border-teal-500 tw-cursor-pointer tw-transition-all"
                    onClick={async () => {
                      await inviteCreator(campaign, {
                        _id: selectedCreatorId,
                      });
                      setIsDrawerOpen(false);
                      setDrawerType(null);
                    }}
                  >
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                      <h3 className="tw-font-medium">{campaign?.Headline}</h3>
                      <span className="tw-text-xs tw-px-2 tw-py-1 tw-rounded-full tw-bg-green-100 tw-text-green-800">
                        {campaign?.Is_Ongoing ? "Ongoing" : "Fixed Duration"}
                      </span>
                    </div>

                    <div className="tw-space-y-2">
                      <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="tw-text-teal-600"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span>{campaign?.Time_Ago}</span>
                      </div>

                      <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="tw-text-blue-600"
                        >
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span>
                          Budget: ${campaign?.Budget?.toLocaleString()}
                        </span>
                      </div>

                      <div className="tw-flex tw-flex-wrap tw-gap-1 tw-mt-2">
                        {campaign?.Target_Audience?.map(
                          (tag: string, i: number) => (
                            <span
                              key={i}
                              className="tw-px-2 tw-py-1 tw-text-xs tw-bg-gray-100 tw-rounded-full tw-text-gray-600"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>

                      <div className="tw-grid tw-grid-cols-3 tw-gap-2 tw-mt-3">
                        <div className="tw-text-center tw-p-2 tw-bg-gray-50 tw-rounded">
                          <div className="tw-text-sm tw-font-medium">
                            {campaign?.Creator_Insights?.Invited}
                          </div>
                          <div className="tw-text-xs tw-text-gray-500">
                            Invited
                          </div>
                        </div>
                        <div className="tw-text-center tw-p-2 tw-bg-gray-50 tw-rounded">
                          <div className="tw-text-sm tw-font-medium">
                            {campaign?.Creator_Insights?.Approved}
                          </div>
                          <div className="tw-text-xs tw-text-gray-500">
                            Approved
                          </div>
                        </div>
                        <div className="tw-text-center tw-p-2 tw-bg-gray-50 tw-rounded">
                          <div className="tw-text-sm tw-font-medium">
                            {campaign?.Creator_Insights?.In_Discussion}
                          </div>
                          <div className="tw-text-xs tw-text-gray-500">
                            In Discussion
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add renderListDrawer function
  const renderListDrawer = () => (
    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40">
      <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-full md:tw-w-[80%] lg:tw-w-[560px] tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
        <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b">
          <div>
            <h2 className="tw-text-xl tw-font-semibold">Add to List</h2>
            <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
              Add this creator to an existing list or create a new one
            </p>
          </div>
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              setDrawerType(null);
            }}
            className="tw-text-gray-400 tw-hover:text-gray-600"
          >
            <X className="tw-h-6 tw-w-6" />
          </button>
        </div>

        <div className="tw-flex-1 tw-overflow-y-auto">
          <div className="tw-p-6">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
              <h3 className="tw-text-lg tw-font-medium">Your Lists</h3>
              <button
                onClick={() => {
                  setSelectedList(undefined);
                  setIsDrawerOpen(false);
                  setDrawerType(null);
                }}
                data-bs-toggle="modal"
                data-bs-target="#createNewListModal"
                className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded-md tw-hover:bg-teal-600"
              >
                <Plus className="tw-h-4 tw-w-4" />
                Create New List
              </button>
            </div>
            <div className="tw-space-y-4">
              {buyerList?.map((list: any, index: number) => (
                <div
                  key={index}
                  className="tw-border tw-rounded-lg tw-p-4 tw-hover:border-teal-500 tw-transition-all"
                >
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <div>
                      <h4 className="tw-font-medium">{list?.List_Name}</h4>
                      <p className="tw-text-sm tw-text-gray-500">
                        {list?.Creators?.length || 0} creators
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        await addToCreatorList(list, {
                          _id: selectedCreatorId,
                        });
                        setIsDrawerOpen(false);
                        setDrawerType(null);
                      }}
                      className="tw-p-2 tw-rounded-full tw-text-teal-500 tw-hover:bg-teal-50 tw-transition-colors"
                    >
                      <Plus className="tw-h-5 tw-w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid">
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
            </ul>
<div className="container">
            <div className="row">

              <div className="col-12 mb-2">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home-tab-pane"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabIndex={0}
                  >

<div className="d-flex justify-content-between align-items-center py-3 px-3 gap-3">
                <div className="tw-flex-1 tw-relative">
                  <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-text-gray-400 tw-h-5 tw-w-5" />
                  <input
                    type="text"
                    placeholder="Search creators by name, company, or job title"
                    className="w-100 tw-pl-10 tw-pr-4 tw-py-3 mt-3 mb-3 tw-border tw-rounded-lg tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-teal-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="tw-flex btn-dark tw-items-center tw-px-4 tw-py-2 tw-border tw-rounded-lg tw-hover:bg-gray-50"
                >
                  <Filter className="tw-h-5 tw-w-5 tw-mr-2" />
                  Filter
                </button>
              </div>

                    <div className="card">
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table align-middle text-center mb-0">
                            <thead>
                              <tr>
                                <th scope="col" className="text-start ps-4">
                                  Creators
                                </th>
                                <th scope="col">Company</th>
                                <th scope="col">Followers</th>
                                <th scope="col">Impressions</th>
                                <th scope="col">Engagements</th>
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {buyersDetails?.Global_Creators?.length !== 0 &&
                                buyersDetails?.Global_Creators?.map(
                                  (creator: any) => renderCreatorRow(creator)
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
                            className="tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded-md tw-hover:bg-teal-600 tw-flex tw-items-center tw-gap-2"
                            data-bs-toggle="modal"
                            data-bs-target="#createNewListModal"
                            onClick={() => setSelectedList(undefined)}
                          >
                            <Plus className="tw-h-4 tw-w-4" />
                            Create New List
                          </button>
                        </div>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4 tw-mt-4">
                          {buyerList?.map((entry: any, index: number) =>
                            renderListCard(entry, index)
                          )}
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
      </div>

      {isFilterOpen && renderFilterSidebar()}
      {isDrawerOpen && drawerType === "campaign" && renderCampaignDrawer()}
      {isDrawerOpen && drawerType === "list" && renderListDrawer()}

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
