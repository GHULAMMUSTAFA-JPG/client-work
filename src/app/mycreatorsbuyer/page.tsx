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
  fetchCompanyData,
} from "@/@api";
import { apiController } from "@/@api/baseUrl";
import CreateNewListModal from "@/components/CreateNewListModal";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { withAuthRole } from "@/utils/withAuthRole";
import CreatorProfileDrawer from "@/components/CreatorProfileDrawer";
import {
  Search,
  Filter,
  X,
  Plus,
  UserPlus,
  Tag,
  Users,
  Calendar,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { MultiSelect } from "@/components/MultiSelect";
import { CREATOR_FILTER_OPTIONS } from "@/constant/brand";
import Tooltip from "@/components/Tooltip";
import MyCreatorsShell from "@/components/Mycreators-shell";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const [drawerType, setDrawerType] = useState<
    "campaign" | "list" | "creators" | null
  >(null);
  const [creatorSearch, setCreatorSearch] = useState<string>("");
  console.log("buyerList", buyerList);
  const [companyData, setCompanyData] = useState<any>([]);
  const [creatorStats, setCreatorStats] = useState({
    totalCreators: 0,
    totalEngagements: 0,
    growthRate: 0,
  });
  const [hoveredListId, setHoveredListId] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get("tab") || "global"
  );

  // Update URL when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);

    // Create new URL with the tab parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);

    // Update URL without refreshing the page
    router.push(`/mycreatorsbuyer?${params.toString()}`, { scroll: false });
  };

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
    if (user?._id) {
      getSavedList(
        user._id,
        (lists: any[]) => {
          // Enhance each list with top creators if available
          const enhancedLists = lists.map((list: any) => {
            // Check if the list already has creator IDs
            if (list.Creator_IDs && Array.isArray(list.Creator_IDs)) {
              // Limit to 3 creators for the preview
              const topCreatorIds = list.Creator_IDs.slice(0, 3);

              // Find creator details from buyersDetails if available
              const topCreators = topCreatorIds.map((creatorId: string) => {
                // Find this creator in our existing data
                const creatorData = buyersDetails?.find(
                  (creator: any) => creator._id === creatorId
                );
                return (
                  creatorData || {
                    _id: creatorId,
                    Name: "Unknown Creator",
                    Profile_Image: defaultImagePath,
                  }
                );
              });

              return { ...list, topCreators };
            }

            return { ...list, topCreators: [] };
          });

          setBuyerList(enhancedLists);
          setIsLoading(false);
        },
        setIsLoading
      );
    }
  }, [user?._id, buyersDetails, setIsLoading]);

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

  const getCompanyData = useCallback(async () => {
    if (user?.email) {
      fetchCompanyData(user.email, setCompanyData, setIsLoading);
    }
  }, [user?.email, setIsLoading]);

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

  const handleInvite = () => {
    const subject = "Join Social27 Creator Platform";
    const body =
      "Hey! I'd like to invite you to join Social27's Creator Platform.";
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`,
      "_blank"
    );
  };

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

  console.log("selectedList", selectedList);
  useEffect(() => {
    if (selectedId !== "") {
      getSpecificCreatorList(
        selectedId,
        (creators: any[]) => {
          setSelectedIdCreators(creators);

          if (buyerList) {
            const currentList = buyerList.find(
              (list: any) => list._id === selectedId
            );
            if (currentList) {
              setSelectedList({
                ...currentList,
                creators: creators,
              });
            }
          }

          setIsLoading(false);
        },
        setIsLoading
      );
    }
  }, [selectedId, rendControl, buyerList, setIsLoading]);

  useEffect(() => {
    if (user?.email) {
      getCompanyData();
    }
  }, [user?.email, setIsLoading, getCompanyData]);

  // Effect to sync URL with initial tab state
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");

    if (tabFromUrl) {
      setActiveTab(tabFromUrl);

      // Activate the correct tab using Bootstrap's tab API
      // This needs to be done in a useEffect to ensure the DOM is ready
      const tabElement = document.querySelector(`#${tabFromUrl}-tab`);
      if (tabElement) {
        (tabElement as HTMLElement).click();
      }
    }
  }, [searchParams]);

  // Content block for My Creators tab

  // Render creator row
  const renderCreatorRow = (creator: any) => (
    <tr
      key={creator?._id}
      className="cursor hover-bg-light"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest(".drop-down-table")) {
          return;
        }
        // Don't set the selectedCreatorId here to prevent opening the drawer when clicking anywhere on the row
      }}
    >
      <td
        className="text-start ps-4"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedCreatorId(creator?._id);
        }}
        data-bs-toggle="offcanvas"
        data-bs-target="#creatorProfileDrawer"
      >
        <div className="d-flex align-items-center">
          {creator?.Profile_Image ? (
            <img
              src={creator.Profile_Image}
              alt={creator?.Name}
              width={30}
              height={30}
              className="user-img img-fluid rounded-circle"
            />
          ) : (
            <div className="tw-w-[30px] tw-h-[30px] tw-rounded-full tw-bg-emerald-600 tw-flex tw-items-center tw-justify-center tw-text-white tw-font-medium">
              {creator?.Name?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
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
      <td>
        <p className="mb-2">{creator?.Current_Company}</p>
      </td>
      <td>
        <p className="mb-2">{creator?.No_of_Followers?.toLocaleString()}</p>
      </td>
      <td>
        <p className="mb-2">{creator?.No_of_Impressions?.toLocaleString()}</p>
      </td>
      <td>
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
      className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-relative tw-transition-all tw-duration-200 hover:tw-shadow-lg tw-border-2 tw-border-transparent hover:tw-border-emerald-500"
      onMouseEnter={() => {
        setHoveredListId(entry?._id);
      }}
      onMouseLeave={() => setHoveredListId(null)}
    >
      <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
        <h3 className="tw-text-xl tw-font-semibold tw-text-gray-800">
          {entry?.List_Name}
        </h3>
        <div className="tw-flex tw-space-x-2">
          <Tooltip content="Invite creators to this list">
            <button
              onClick={() => {
                setSelectedId(entry?._id);
                setDrawerType("list");
                setIsDrawerOpen(true);
              }}
              className="tw-p-2 tw-text-gray-600 hover:tw-text-blue-600 tw-transition-colors"
            >
              <UserPlus size={18} />
            </button>
          </Tooltip>
          <button
            onClick={() => actionFunction("edit", entry)}
            data-bs-toggle="modal"
            data-bs-target="#createNewListModal"
            className="tw-p-2 tw-text-gray-600 hover:tw-text-emerald-600 tw-transition-colors"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => actionFunction("delete", entry?._id)}
            className="tw-p-2 tw-text-gray-600 hover:tw-text-red-600 tw-transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-3">
        <Tag size={16} className="tw-text-emerald-600" />
        <span className="tw-text-sm tw-text-emerald-600 tw-font-medium">
          {entry?.Category || "General"}
        </span>
      </div>

      <div className="tw-flex tw-items-center tw-space-x-4 tw-text-sm tw-text-gray-600">
        <div className="tw-flex tw-items-center">
          <Users size={16} className="tw-mr-1" />
          <span>{entry?.List_Creators?.length || 0} Creators</span>
        </div>
        <div className="tw-flex tw-items-center">
          <Calendar size={16} className="tw-mr-1" />
          <span>
            Updated:{" "}
            {new Date(entry?.Updated_At || new Date()).toLocaleDateString()}
          </span>
        </div>
      </div>

      <button
        onClick={() => {
          setSelectedId(entry?._id);
          setDrawerType("creators");
          setIsDrawerOpen(true);
        }}
        className="tw-mt-4 tw-w-full tw-bg-emerald-50 tw-text-emerald-600 tw-py-2 tw-rounded-md hover:tw-bg-emerald-100 tw-transition-colors tw-font-medium tw-flex tw-items-center tw-justify-center"
      >
        <span>Open & Manage</span>
        <ChevronRight size={16} className="tw-ml-1" />
      </button>

      {hoveredListId === entry?._id && (
        <div className="tw-absolute tw-left-0 tw-right-0 -tw-bottom-2 tw-transform tw-translate-y-full tw-z-10 tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-4 tw-border tw-border-gray-200">
          <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
            Top Creators
          </h4>
          <div className="tw-space-y-2">
            {entry?.topCreators?.map((creator: any, idx: number) => (
              <div key={idx} className="tw-flex tw-items-center tw-space-x-2">
                {creator?.Profile_Image ? (
                  <img
                    src={creator.Profile_Image}
                    alt={creator?.Name}
                    className="tw-w-8 tw-h-8 tw-rounded-full tw-object-cover"
                  />
                ) : (
                  <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-emerald-600 tw-flex tw-items-center tw-justify-center tw-text-white tw-font-medium">
                    {creator?.Name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
                <span className="tw-text-sm tw-text-gray-600">
                  {creator?.Name}
                </span>
              </div>
            ))}
            {entry?.topCreators && entry.topCreators.length === 0 && (
              <p className="tw-text-sm tw-text-gray-500">
                No top creators in this list yet
              </p>
            )}
          </div>
          <div className="tw-mt-3 tw-text-center">
            <button
              onClick={() => {
                setSelectedId(entry?._id);
                setDrawerType("creators");
                setIsDrawerOpen(true);
              }}
              className="tw-text-sm tw-text-emerald-600 tw-font-medium tw-cursor-pointer hover:tw-text-emerald-700"
            >
              View Full List
            </button>
          </div>
        </div>
      )}
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
            <p className="tw-text-sm tw-text-gray-500 tw-mt-1 tw-flex tw-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.829"
                height="12.828"
                viewBox="0 0 12.829 12.828"
              >
                <path
                  id="Icon_feather-arrow-down-right"
                  data-name="Icon feather-arrow-down-right"
                  d="M7,7,17,17M17,7V17H7"
                  transform="translate(-5.586 -5.586)"
                  fill="none"
                  stroke="#1bb09d"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Choose a campaign to invite this creator and collaborate
              seamlessly
            </p>
          </div>
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              setDrawerType(null);
            }}
            className="tw-text-gray-400 hover:text-gray-600"
          >
            <X className="tw-h-6 tw-w-6" />
          </button>
        </div>

        <div className="tw-flex-1 tw-overflow-y-auto tw-bg-gray-50">
          <div className="tw-p-6">
            <div className="tw-space-y-4">
              {activeCampaigns?.campaigns?.map(
                (campaign: any, index: number) => (
                  <Tooltip key={index} content="Invite to campaign">
                    <div
                      className="tw-bg-white tw-border-gray-100 tw-border tw-rounded-mg py-4 px-3 tw-shadow-sm hover:tw-shadow-lg tw-round-md tw-cursor-pointer tw-transition-all"
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

                        <div className="tw-flex tw-flex-wrap tw-gap-1 tw-mt-2 mb-3">
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
                  </Tooltip>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add renderListDrawer function
  const renderListDrawer = () => {
    // Find the currently selected list if we have a selectedId
    const currentSelectedList = selectedId
      ? buyerList?.find((list: any) => list._id === selectedId)
      : null;

    // Get creators who are already in the list - List_Creators is an array of IDs in our data structure
    const existingCreatorIds = currentSelectedList?.List_Creators || [];

    // Filter global creators to only include those not already in the list
    const availableCreators =
      currentSelectedList && buyersDetails?.Global_Creators
        ? buyersDetails.Global_Creators.filter(
            (creator: any) => !existingCreatorIds.includes(creator._id)
          )
        : buyersDetails?.Global_Creators;

    // Filter creators based on search term
    const filteredCreators = availableCreators?.filter(
      (creator: any) =>
        creator?.Name?.toLowerCase().includes(creatorSearch.toLowerCase()) ||
        creator?.Current_Company?.toLowerCase().includes(
          creatorSearch.toLowerCase()
        ) ||
        creator?.Job_Title?.toLowerCase().includes(creatorSearch.toLowerCase())
    );

    // Helper function to check if a creator is in a list
    const isCreatorInList = (list: any, creatorId: string) => {
      if (!list?.List_Creators || !Array.isArray(list.List_Creators))
        return false;
      return list.List_Creators.includes(creatorId);
    };

    return (
      <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40">
        <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-full md:tw-w-[80%] lg:tw-w-[560px] tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
          <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b">
            <div>
              <h2 className="tw-text-xl tw-font-semibold">
                {currentSelectedList
                  ? `Add Creators to "${currentSelectedList.List_Name}"`
                  : "Add to List"}
              </h2>
              <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
                {currentSelectedList
                  ? "Select creators to add to this list"
                  : "Add this creator to an existing list or create a new one"}
              </p>
            </div>
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setDrawerType(null);
                setCreatorSearch("");
                if (currentSelectedList) {
                  setSelectedId("");
                }
              }}
              className="tw-text-gray-400 tw-hover:text-gray-600"
            >
              <X className="tw-h-6 tw-w-6" />
            </button>
          </div>

          <div className="tw-flex-1 tw-overflow-y-auto">
            {currentSelectedList ? (
              <div className="tw-p-6">
                <div className="tw-bg-emerald-50 tw-border tw-border-emerald-100 tw-rounded-lg tw-p-4 tw-mb-6">
                  <div className="tw-flex tw-items-center tw-space-x-3">
                    <div className="tw-p-2 tw-bg-emerald-100 tw-rounded-full">
                      <Users className="tw-h-5 tw-w-5 tw-text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="tw-font-medium tw-text-emerald-800">
                        {currentSelectedList.List_Name}
                      </h3>
                      <p className="tw-text-sm tw-text-emerald-600">
                        {currentSelectedList.List_Creators?.length || 0}{" "}
                        creators • {currentSelectedList.Category || "General"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="tw-space-y-4">
                  {filteredCreators && filteredCreators.length > 0 ? (
                    filteredCreators.map((creator: any, index: number) => (
                      <div
                        key={index}
                        className="tw-border tw-rounded-lg tw-p-4 tw-hover:border-emerald-500 tw-transition-all"
                      >
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <div className="tw-flex tw-items-center tw-space-x-3">
                            {creator?.Profile_Image ? (
                              <img
                                src={creator.Profile_Image}
                                alt={creator?.Name}
                                className="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover"
                              />
                            ) : (
                              <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-emerald-600 tw-flex tw-items-center tw-justify-center tw-text-white tw-font-medium">
                                {creator?.Name?.charAt(0)?.toUpperCase() || "?"}
                              </div>
                            )}
                            <div>
                              <h4 className="tw-font-medium">
                                {creator?.Name}
                              </h4>
                              <p className="tw-text-sm tw-text-gray-500">
                                {creator?.No_of_Followers?.toLocaleString() ||
                                  "0"}{" "}
                                followers
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={async () => {
                              await addToCreatorList(currentSelectedList, {
                                _id: creator._id,
                              });
                              setIsDrawerOpen(false);
                              setDrawerType(null);
                              setCreatorSearch("");
                              setSelectedId("");
                            }}
                            className="tw-p-2 tw-rounded-full tw-text-emerald-500 tw-hover:bg-emerald-50 tw-transition-colors"
                          >
                            <Plus className="tw-h-5 tw-w-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="tw-text-center tw-py-8 tw-text-gray-500">
                      <div className="tw-p-3 tw-bg-gray-100 tw-rounded-full tw-w-16 tw-h-16 tw-mx-auto tw-mb-4 tw-flex tw-items-center tw-justify-center">
                        <Users className="tw-h-8 tw-w-8 tw-text-gray-400" />
                      </div>
                      <p className="tw-text-lg tw-font-medium">
                        No creators available
                      </p>
                      <p className="tw-mt-1 tw-text-sm">
                        {creatorSearch
                          ? "No creators match your search"
                          : "All creators are already in this list"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="tw-p-6">
                <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
                  <h3 className="tw-text-lg tw-font-medium">Your Lists</h3>
                  <button
                    onClick={() => {
                      setSelectedList(undefined);
                      setIsDrawerOpen(false);
                      setDrawerType(null);
                      setCreatorSearch("");
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
                  {buyerList?.map((list: any, index: number) => {
                    const creatorAlreadyInList = isCreatorInList(
                      list,
                      selectedCreatorId
                    );
                    return (
                      <div
                        key={index}
                        className={`tw-border tw-rounded-lg tw-p-4 ${
                          creatorAlreadyInList
                            ? "tw-border-emerald-300 tw-bg-emerald-50"
                            : "tw-hover:border-teal-500"
                        } tw-transition-all`}
                      >
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <div>
                            <h4 className="tw-font-medium">
                              {list?.List_Name}
                            </h4>
                            <p className="tw-text-sm tw-text-gray-500">
                              {list?.List_Creators?.length || 0} creators
                              {creatorAlreadyInList && (
                                <span className="tw-ml-2 tw-text-emerald-600">
                                  • Creator already added
                                </span>
                              )}
                            </p>
                          </div>
                          {!creatorAlreadyInList ? (
                            <button
                              onClick={async () => {
                                await addToCreatorList(list, {
                                  _id: selectedCreatorId,
                                });
                                setIsDrawerOpen(false);
                                setDrawerType(null);
                                setCreatorSearch("");
                              }}
                              className="tw-p-2 tw-rounded-full tw-text-teal-500 tw-hover:bg-teal-50 tw-transition-colors"
                            >
                              <Plus className="tw-h-5 tw-w-5" />
                            </button>
                          ) : (
                            <div className="tw-p-2 tw-rounded-full tw-bg-emerald-100 tw-text-emerald-600">
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
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Add renderCreatorsDrawer function
  const renderCreatorsDrawer = () => {
    // Find the currently selected list
    const currentList = buyerList?.find((list: any) => list._id === selectedId);

    return (
      <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40">
        <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-full md:tw-w-[80%] lg:tw-w-[560px] tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
          <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b">
            <div>
              <h2 className="tw-text-xl tw-font-semibold">
                {currentList?.List_Name || "List Creators"}
              </h2>
              <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
                Manage creators in this list
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
              {/* List summary section */}
              <div className="tw-bg-emerald-50 tw-border tw-border-emerald-100 tw-rounded-lg tw-p-4 tw-mb-6">
                <div className="tw-flex tw-items-center tw-space-x-3">
                  <div className="tw-p-2 tw-bg-emerald-100 tw-rounded-full">
                    <Users className="tw-h-5 tw-w-5 tw-text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="tw-font-medium tw-text-emerald-800">
                      {currentList?.List_Name}
                    </h3>
                    <p className="tw-text-sm tw-text-emerald-600">
                      {selectedIdCreators?.List_Creators?.length || 0} creators
                      • {currentList?.Category || "General"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="tw-space-y-4">
                {selectedIdCreators?.List_Creators &&
                selectedIdCreators.List_Creators.length > 0 ? (
                  selectedIdCreators.List_Creators.map((creator: any) => (
                    <div
                      key={creator?._id}
                      className="tw-border tw-rounded-lg tw-p-4 tw-hover:border-emerald-500 tw-transition-all"
                    >
                      <div className="tw-flex tw-items-center tw-justify-between">
                        <div
                          className="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer"
                          onClick={() => {
                            setSelectedCreatorId(creator?._id);
                          }}
                          data-bs-toggle="offcanvas"
                          data-bs-target="#creatorProfileDrawer"
                        >
                          {creator?.Profile_Image ? (
                            <img
                              src={creator.Profile_Image}
                              alt={creator?.Name}
                              className="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover"
                            />
                          ) : (
                            <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-emerald-600 tw-flex tw-items-center tw-justify-center tw-text-white tw-font-medium">
                              {creator?.Name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                          )}
                          <div>
                            <h4 className="tw-font-medium">{creator?.Name}</h4>
                            <div className="tw-flex tw-items-center tw-space-x-4 tw-text-sm tw-text-gray-500">
                              <span>{creator?.Current_Company || "N/A"}</span>
                              <span>
                                {creator?.No_of_Followers?.toLocaleString() ||
                                  "0"}{" "}
                                followers
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const deleteCreator = async () => {
                              const response: any = await apiController.delete(
                                "/dashboard/buyers/remove_creator_from_list",
                                {
                                  data: {
                                    List_Id: selectedId,
                                    Creator_Id: creator?._id,
                                  },
                                }
                              );
                              if (!response?.error) {
                                setRendControl(!rendControl);
                              }
                            };
                            deleteCreator();
                          }}
                          className="tw-p-2 tw-rounded-full tw-text-red-500 tw-hover:bg-red-50 tw-transition-colors"
                        >
                          <Trash2 className="tw-h-5 tw-w-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="tw-text-center tw-py-10 tw-text-gray-500">
                    <Users className="tw-h-16 tw-w-16 tw-mx-auto tw-mb-4 tw-text-gray-300" />
                    <p className="tw-text-lg tw-font-medium">
                      No creators in this list yet
                    </p>
                    <p className="tw-mt-2">
                      Add creators to this list from the Global Creators tab
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                  className={`nav-link ${
                    activeTab === "global" ? "active" : ""
                  }`}
                  id="global-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected={activeTab === "global"}
                  onClick={() => handleTabChange("global")}
                >
                  Global Creators
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "company" ? "active" : ""
                  }`}
                  id="company-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#mycreators-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="mycreators-tab-pane"
                  aria-selected={activeTab === "company"}
                  onClick={() => handleTabChange("company")}
                >
                  My Company Creators
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "lists" ? "active" : ""
                  }`}
                  id="lists-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="contact-tab-pane"
                  aria-selected={activeTab === "lists"}
                  onClick={() => handleTabChange("lists")}
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
                      className={`tab-pane fade ${
                        activeTab === "company" ? "show active" : ""
                      }`}
                      id="mycreators-tab-pane"
                      role="tabpanel"
                      aria-labelledby="company-tab"
                      tabIndex={0}
                    >
                      <MyCreatorsShell
                        handleInvite={handleInvite}
                        companyData={companyData}
                        creatorStats={creatorStats}
                      ></MyCreatorsShell>
                    </div>

                    <div
                      className={`tab-pane fade ${
                        activeTab === "global" ? "show active" : ""
                      }`}
                      id="home-tab-pane"
                      role="tabpanel"
                      aria-labelledby="global-tab"
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
                      className={`tab-pane fade ${
                        activeTab === "lists" ? "show active" : ""
                      }`}
                      id="contact-tab-pane"
                      role="tabpanel"
                      aria-labelledby="lists-tab"
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
      {isDrawerOpen && drawerType === "creators" && renderCreatorsDrawer()}

      <CreateNewListModal
        data={selectedList}
        setRendControl={setRendControl}
        rendControl={rendControl}
      />
      <CreatorProfileDrawer creatorId={selectedCreatorId} />
    </>
  );
}

export default withAuthRole({
  Component: Mycreatorsbuyer,
  allowedRoles: ["buyer"],
});
