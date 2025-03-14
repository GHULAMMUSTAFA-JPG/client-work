import { List, Creator } from "./types";
import {
  Tag,
  Users,
  Calendar,
  ChevronRight,
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";
import Tooltip from "@/components/Tooltip";

interface ListCardProps {
  list: List;
  onEditList: (list: List) => void;
  onDeleteList: (listId: string) => void;
  onOpenList: (listId: string) => void;
  onAddCreatorToList: (listId: string) => void;
  isHovered: boolean;
  onHover: (isHovered: boolean) => void;
}

const ListCard = ({
  list,
  onEditList,
  onDeleteList,
  onOpenList,
  onAddCreatorToList,
  isHovered,
  onHover,
}: ListCardProps) => {
  return (
    <div
      className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-relative tw-transition-all tw-duration-200 hover:tw-shadow-lg tw-border-2 tw-border-transparent hover:tw-border-emerald-500"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
        <h3 className="tw-text-xl tw-font-semibold tw-text-gray-800">
          {list?.List_Name}
        </h3>
        <div className="tw-flex tw-space-x-2">
          <Tooltip content="Invite creators to this list">
            <button
              onClick={() => onAddCreatorToList(list._id)}
              className="tw-p-2 tw-text-gray-600 hover:tw-text-blue-600 tw-transition-colors"
            >
              <UserPlus size={18} />
            </button>
          </Tooltip>
          <button
            onClick={() => onEditList(list)}
            data-bs-toggle="modal"
            data-bs-target="#createNewListModal"
            className="tw-p-2 tw-text-gray-600 hover:tw-text-emerald-600 tw-transition-colors"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDeleteList(list._id)}
            className="tw-p-2 tw-text-gray-600 hover:tw-text-red-600 tw-transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-3">
        <Tag size={16} className="tw-text-emerald-600" />
        <span className="tw-text-sm tw-text-emerald-600 tw-font-medium">
          {list?.Category || "General"}
        </span>
      </div>

      <div className="tw-flex tw-items-center tw-space-x-4 tw-text-sm tw-text-gray-600">
        <div className="tw-flex tw-items-center">
          <Users size={16} className="tw-mr-1" />
          <span>{list?.List_Creators?.length || 0} Creators</span>
        </div>
        <div className="tw-flex tw-items-center">
          <Calendar size={16} className="tw-mr-1" />
          <span>
            Updated:{" "}
            {new Date(list?.Updated_At || new Date()).toLocaleDateString()}
          </span>
        </div>
      </div>

      <button
        onClick={() => onOpenList(list._id)}
        className="tw-mt-4 tw-w-full tw-bg-emerald-50 tw-text-emerald-600 tw-py-2 tw-rounded-md hover:tw-bg-emerald-100 tw-transition-colors tw-font-medium tw-flex tw-items-center tw-justify-center"
      >
        <span>Open & Manage</span>
        <ChevronRight size={16} className="tw-ml-1" />
      </button>

      {isHovered && (
        <div className="tw-absolute tw-left-0 tw-right-0 -tw-bottom-2 tw-transform tw-translate-y-full tw-z-10 tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-4 tw-border tw-border-gray-200">
          <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
            Top Creators
          </h4>
          <div className="tw-space-y-2">
            {list?.topCreators?.map((creator: Creator, idx: number) => (
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
            {(!list?.topCreators || list.topCreators.length === 0) && (
              <p className="tw-text-sm tw-text-gray-500">
                No top creators in this list yet
              </p>
            )}
          </div>
          <div className="tw-mt-3 tw-text-center">
            <button
              onClick={() => onOpenList(list._id)}
              className="tw-text-sm tw-text-emerald-600 tw-font-medium tw-cursor-pointer hover:tw-text-emerald-700"
            >
              View Full List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCard;
