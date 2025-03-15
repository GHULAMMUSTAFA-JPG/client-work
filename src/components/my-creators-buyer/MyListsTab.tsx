import { List } from "./types";
import { Plus } from "lucide-react";
import ListCard from "./ListCard";

interface MyListsTabProps {
  lists: List[];
  onCreateList: () => void;
  onEditList: (list: List) => void;
  onDeleteList: (listId: string) => void;
  onOpenList: (listId: string) => void;
  onAddCreatorToList: (listId: string) => void;
  hoveredListId: string | null;
  onHoverList: (listId: string | null) => void;
}

const MyListsTab = ({
  lists,
  onCreateList,
  onEditList,
  onDeleteList,
  onOpenList,
  onAddCreatorToList,
  hoveredListId,
  onHoverList,
}: MyListsTabProps) => {
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between align-items-center">
          <div className="mt-3">
            <p className="fs-20 fw-600">My Lists</p>
            <p className="fs-14">Manage your creator lists</p>
          </div>
          <button
            type="button"
            className="tw-flex tw-itmes-center tw-gap-2 tw-justify-center tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded hover:tw-bg-teal-600"
            data-bs-toggle="modal"
            data-bs-target="#createNewListModal"
            onClick={onCreateList}
          >
            <Plus className="tw-h-4 tw-w-4" />
            Create New List
          </button>
        </div>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4 tw-mt-4">
          {lists?.map((list: List, index: number) => (
            <ListCard
              key={index}
              list={list}
              onEditList={onEditList}
              onDeleteList={onDeleteList}
              onOpenList={onOpenList}
              onAddCreatorToList={onAddCreatorToList}
              isHovered={hoveredListId === list._id}
              onHover={(isHovered) => onHoverList(isHovered ? list._id : null)}
            />
          ))}

          {(!lists || lists.length === 0) && (
            <div className="tw-col-span-full tw-text-center tw-py-12">
              <div className="tw-bg-gray-100 tw-rounded-full tw-w-16 tw-h-16 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="tw-text-gray-400"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="tw-text-lg tw-font-medium tw-text-gray-700">
                No lists created yet
              </h3>
              <p className="tw-text-gray-500 tw-mt-2">
                Create your first list to organize creators
              </p>
              <button
                onClick={onCreateList}
                className="tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded hover:tw-bg-teal-600"
                data-bs-toggle="modal"
                data-bs-target="#createNewListModal"
              >
                Create New List
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListsTab;
