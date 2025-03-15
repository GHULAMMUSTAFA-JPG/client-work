import { useState } from "react";
import { X, Plus, Users } from "lucide-react";
import { Creator, List } from "./types";

interface ListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  creators: Creator[];
  lists: List[];
  selectedCreatorId: string;
  selectedList: List | null;
  onAddToList: (listId: string, creatorId: string) => void;
  onCreateNewList: () => void;
}

const ListDrawer = ({
  isOpen,
  onClose,
  creators,
  lists,
  selectedCreatorId,
  selectedList,
  onAddToList,
  onCreateNewList,
}: ListDrawerProps) => {
  const [creatorSearch, setCreatorSearch] = useState<string>("");

  if (!isOpen) return null;

  // Helper function to check if a creator is in a list
  const isCreatorInList = (list: List, creatorId: string) => {
    if (!list?.List_Creators || !Array.isArray(list.List_Creators))
      return false;
    return list.List_Creators.includes(creatorId);
  };

  // Get creators who are already in the list - List_Creators is an array of IDs in our data structure
  const existingCreatorIds = selectedList?.List_Creators || [];

  // Filter global creators to only include those not already in the list
  const availableCreators =
    selectedList && creators
      ? creators.filter(
          (creator: Creator) => !existingCreatorIds.includes(creator._id)
        )
      : creators;

  // Filter creators based on search term
  const filteredCreators = availableCreators?.filter(
    (creator: Creator) =>
      creator?.Name?.toLowerCase().includes(creatorSearch.toLowerCase()) ||
      creator?.Current_Company?.toLowerCase().includes(
        creatorSearch.toLowerCase()
      ) ||
      creator?.Job_Title?.toLowerCase().includes(creatorSearch.toLowerCase())
  );

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40">
      <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-full md:tw-w-[80%] lg:tw-w-[560px] tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
        <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b">
          <div>
            <h2 className="tw-text-xl tw-font-semibold">
              {selectedList
                ? `Add Creators to "${selectedList.List_Name}"`
                : "Add to List"}
            </h2>
            <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
              {selectedList
                ? "Select creators to add to this list"
                : "Add this creator to an existing list or create a new one"}
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              setCreatorSearch("");
            }}
            className="tw-text-gray-400 tw-hover:text-gray-600"
          >
            <X className="tw-h-6 tw-w-6" />
          </button>
        </div>

        <div className="tw-flex-1 tw-overflow-y-auto">
          {selectedList ? (
            <div className="tw-p-6">
              <div className="tw-bg-emerald-50 tw-border tw-border-emerald-100 tw-rounded-lg tw-p-4 tw-mb-6">
                <div className="tw-flex tw-items-center tw-space-x-3">
                  <div className="tw-p-2 tw-bg-emerald-100 tw-rounded-full">
                    <Users className="tw-h-5 tw-w-5 tw-text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="tw-font-medium tw-text-emerald-800">
                      {selectedList.List_Name}
                    </h3>
                    <p className="tw-text-sm tw-text-emerald-600">
                      {selectedList.List_Creators?.length || 0} creators •{" "}
                      {selectedList.Category || "General"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="tw-relative tw-mb-6">
                <input
                  type="text"
                  placeholder="Search creators..."
                  className="tw-w-full tw-pl-4 tw-pr-4 tw-py-2 tw-border tw-rounded-lg tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-teal-500"
                  value={creatorSearch}
                  onChange={(e) => setCreatorSearch(e.target.value)}
                />
              </div>

              <div className="tw-space-y-4">
                {filteredCreators && filteredCreators.length > 0 ? (
                  filteredCreators.map((creator: Creator, index: number) => (
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
                            <h4 className="tw-font-medium">{creator?.Name}</h4>
                            <p className="tw-text-sm tw-text-gray-500">
                              {creator?.No_of_Followers?.toLocaleString() ||
                                "0"}{" "}
                              followers
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            onAddToList(selectedList._id, creator._id);
                            onClose();
                            setCreatorSearch("");
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
                    onCreateNewList();
                    onClose();
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#createNewListModal"
                  className="tw-flex tw-itmes-center tw-gap-2 tw-justify-center tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded hover:tw-bg-teal-600"
                >
                  <Plus className="tw-h-4 tw-w-4" />
                  Create New List
                </button>
              </div>
              <div className="tw-space-y-4">
                {lists?.map((list: List, index: number) => {
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
                          <h4 className="tw-font-medium">{list?.List_Name}</h4>
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
                            onClick={() => {
                              onAddToList(list._id, selectedCreatorId);
                              onClose();
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

export default ListDrawer;
