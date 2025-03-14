import { Creator } from "./types";
import { Plus, UserPlus } from "lucide-react";
import Tooltip from "@/components/Tooltip";
import { defaultImagePath } from "@/components/constants";

interface CreatorRowProps {
  creator: Creator;
  onSelectCreator: (creatorId: string) => void;
  onAddToList: (creatorId: string) => void;
  onInviteToCampaign: (creatorId: string) => void;
}

const CreatorRow = ({
  creator,
  onSelectCreator,
  onAddToList,
  onInviteToCampaign,
}: CreatorRowProps) => {
  return (
    <tr key={creator?._id} className="cursor hover-bg-light">
      <td
        className="text-start ps-4"
        onClick={(e) => {
          e.stopPropagation();
          onSelectCreator(creator._id);
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
              <div className="fs-14">
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
                onAddToList(creator._id);
              }}
              className="tw-p-1.5 tw-bg-teal-500 tw-text-white tw-rounded tw-hover:bg-teal-600 tw-transition-colors"
            >
              <Plus className="tw-h-4 tw-w-4" />
            </button>
          </Tooltip>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onInviteToCampaign(creator._id);
            }}
            className="tw-p-1.5 tw-bg-blue-500 tw-text-white tw-rounded tw-hover:bg-blue-600 tw-transition-colors"
          >
            <UserPlus className="tw-h-4 tw-w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CreatorRow;
