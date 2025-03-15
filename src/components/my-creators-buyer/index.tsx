import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { withAuthRole } from "@/utils/withAuthRole";
import { useRouter, useSearchParams } from "next/navigation";
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
import CreatorProfileDrawer from "@/components/CreatorProfileDrawer";
import CreateNewListModal from "@/components/CreateNewListModal";
import {
  EMPTY_FILTERS,
  EMPTY_ACTIVE_FILTERS,
  FilterState,
  ActiveFilterState,
} from "./types";

// Import our new components
import GlobalCreatorsTab from "./GlobalCreatorsTab";
import MyListsTab from "./MyListsTab";
import FilterSidebar from "./FilterSidebar";
import ListDrawer from "./ListDrawer";
import CampaignDrawer from "./CampaignDrawer";
import CreatorsDrawer from "./CreatorsDrawer";
import MyCreatorsShell from "@/components/Mycreators-shell";

function Mycreatorsbuyer() {
  const { user, setIsLoading, setIsActive } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State variables
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

  // Action handlers
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.push(`/mycreatorsbuyer?${params.toString()}`, { scroll: false });
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

  const handleFilterChange = (key: keyof FilterState, value: string[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSetFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // List actions
  const addToCreatorList = async (listId: string, creatorId: string) => {
    const dto = {
      List_Id: listId,
      Creator_Id: creatorId,
    };
    addCreatorInList(dto, rendControl, setRendControl);
  };

  const handleListAction = async (action: string, list: any) => {
    if (action === "edit") {
      setSelectedList(list);
    } else {
      deleteListItem(list, rendControl, setRendControl);
    }
  };

  const handleRemoveCreatorFromList = async (
    listId: string,
    creatorId: string
  ) => {
    const response: any = await apiController.delete(
      "/dashboard/buyers/remove_creator_from_list",
      {
        data: {
          List_Id: listId,
          Creator_Id: creatorId,
        },
      }
    );
    if (!response?.error) {
      setRendControl(!rendControl);
    }
  };

  // Campaign actions
  const inviteCreator = async (campaignId: string, creatorId: string) => {
    await inviteCreatorCall(
      {
        campaign_id: campaignId,
        creator_id: creatorId,
      },
      setIsLoading
    );
  };

  // Drawer handlers
  const handleOpenFilterSidebar = () => setIsFilterOpen(true);
  const handleCloseFilterSidebar = () => setIsFilterOpen(false);

  const handleOpenDrawer = (
    type: "campaign" | "list" | "creators",
    creatorId?: string,
    listId?: string
  ) => {
    setIsDrawerOpen(true);
    setDrawerType(type);
    if (creatorId) setSelectedCreatorId(creatorId);
    if (listId) setSelectedId(listId);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerType(null);
  };

  const handleCreateNewList = () => {
    setSelectedList(undefined);
  };

  // Data fetching
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
                    Profile_Image: null,
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
  }, [user?.email, getCompanyData]);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
      const tabElement = document.querySelector(`#${tabFromUrl}-tab`);
      if (tabElement) {
        (tabElement as HTMLElement).click();
      }
    }
  }, [searchParams]);

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
                      />
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
                      <GlobalCreatorsTab
                        creators={buyersDetails?.Global_Creators || []}
                        query={query}
                        setQuery={setQuery}
                        handleKeyPress={handleKeyPress}
                        activeFilters={activeFilters}
                        onOpenFilterSidebar={handleOpenFilterSidebar}
                        onSelectCreator={(creatorId) =>
                          setSelectedCreatorId(creatorId)
                        }
                        onAddToList={(creatorId) =>
                          handleOpenDrawer("list", creatorId)
                        }
                        onInviteToCampaign={(creatorId) =>
                          handleOpenDrawer("campaign", creatorId)
                        }
                      />
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
                      <MyListsTab
                        lists={buyerList || []}
                        onCreateList={handleCreateNewList}
                        onEditList={(list) => handleListAction("edit", list)}
                        onDeleteList={(listId) =>
                          handleListAction("delete", listId)
                        }
                        onOpenList={(listId) =>
                          handleOpenDrawer("creators", undefined, listId)
                        }
                        onAddCreatorToList={(listId) =>
                          handleOpenDrawer("list", undefined, listId)
                        }
                        hoveredListId={hoveredListId}
                        onHoverList={setHoveredListId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render components */}
      {isFilterOpen && (
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={handleCloseFilterSidebar}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSetFilter={handleSetFilter}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
        />
      )}

      {isDrawerOpen && drawerType === "campaign" && (
        <CampaignDrawer
          isOpen={isDrawerOpen && drawerType === "campaign"}
          onClose={handleCloseDrawer}
          campaigns={activeCampaigns?.campaigns || []}
          selectedCreatorId={selectedCreatorId}
          onInviteCreator={inviteCreator}
        />
      )}

      {isDrawerOpen && drawerType === "list" && (
        <ListDrawer
          isOpen={isDrawerOpen && drawerType === "list"}
          onClose={handleCloseDrawer}
          creators={buyersDetails?.Global_Creators || []}
          lists={buyerList || []}
          selectedCreatorId={selectedCreatorId}
          selectedList={
            selectedId
              ? buyerList?.find((list: any) => list._id === selectedId)
              : null
          }
          onAddToList={addToCreatorList}
          onCreateNewList={handleCreateNewList}
        />
      )}

      {isDrawerOpen && drawerType === "creators" && (
        <CreatorsDrawer
          isOpen={isDrawerOpen && drawerType === "creators"}
          onClose={handleCloseDrawer}
          list={selectedList}
          creators={selectedIdCreators?.List_Creators || []}
          onRemoveCreator={handleRemoveCreatorFromList}
          onViewCreatorProfile={(creatorId) => setSelectedCreatorId(creatorId)}
        />
      )}

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
