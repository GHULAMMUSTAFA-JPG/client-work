import { X, Trash2, Users } from "lucide-react";
import { Creator, List } from "./types";

interface CreatorsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  list: List | null;
  creators: Creator[];
  onRemoveCreator: (listId: string, creatorId: string) => void;
  onViewCreatorProfile: (creatorId: string) => void;
}

const CreatorsDrawer = ({
  isOpen,
  onClose,
  list,
  creators,
  onRemoveCreator,
  onViewCreatorProfile,
}: CreatorsDrawerProps) => {
  if (!isOpen || !list) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40">
      <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-full md:tw-w-[80%] lg:tw-w-[560px] tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
        <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b">
          <div>
            <h2 className="tw-text-xl tw-font-semibold">
              {list?.List_Name || "List Creators"}
            </h2>
            <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
              Manage creators in this list
            </p>
          </div>
          <button
            onClick={onClose}
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
                    {list?.List_Name}
                  </h3>
                  <p className="tw-text-sm tw-text-emerald-600">
                    {creators?.length || 0} creators •{" "}
                    {list?.Category || "General"}
                  </p>
                </div>
              </div>
            </div>

            <div className="tw-space-y-4">
              {creators && creators.length > 0 ? (
                creators.map((creator: Creator) => (
                  <div
                    key={creator?._id}
                    className="tw-border tw-rounded-lg tw-p-4 tw-hover:border-emerald-500 tw-transition-all"
                  >
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <div
                        className="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer"
                        onClick={() => onViewCreatorProfile(creator._id)}
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
                          onRemoveCreator(list._id, creator._id);
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

export default CreatorsDrawer;
