import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Creator } from "@/types";
import Image from "next/image";

interface CreatorsDropDownProps {
  creators: Creator[];
  selectedCreator: Creator | null;
  setSelectedCreator: (creator: Creator) => void;
}

const CreatorsDropDown: React.FC<CreatorsDropDownProps> = ({
  creators,
  selectedCreator,
  setSelectedCreator,
}) => {
  const [isCreatorDropdownOpen, setIsCreatorDropdownOpen] = useState(false);

  return (
    <div className="tw-md:col-span-1">
      <div className="tw-relative tw-mb-6">
        <button
          onClick={() => setIsCreatorDropdownOpen(!isCreatorDropdownOpen)}
          className="tw-w-full tw-flex tw-items-center tw-space-x-3 tw-bg-white tw-rounded-lg tw-p-3 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow"
        >
          {selectedCreator && (
            <>
              {selectedCreator.profilePicture ? (
                <img
                  src={selectedCreator.profilePicture}
                  alt={selectedCreator.name}
                  width={48}
                  height={48}
                  className="tw-rounded-full tw-object-cover tw-border-2 tw-border-gray-100"
                />
              ) : (
                <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-gray-100 tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-gray-100">
                  <span className="tw-text-lg tw-font-medium tw-text-gray-600">
                    {selectedCreator.name[0]}
                  </span>
                </div>
              )}
              <div className="tw-flex tw-flex-col tw-text-left tw-flex-1">
                <span className="tw-font-medium tw-text-gray-900">
                  {selectedCreator.name}
                </span>
              </div>
              <ChevronDown className="tw-w-4 tw-h-4 tw-text-gray-500" />
            </>
          )}
        </button>

        {isCreatorDropdownOpen && (
          <div className="tw-absolute tw-top-full tw-left-0 tw-right-0 tw-mt-2 tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-2 tw-z-10 tw-max-h-80 tw-overflow-y-auto">
            {creators.map((creator) => (
              <button
                key={creator.id}
                onClick={() => {
                  setSelectedCreator(creator);
                  setIsCreatorDropdownOpen(false);
                }}
                className="tw-w-full tw-flex tw-items-center tw-space-x-3 tw-p-3 hover:tw-bg-gray-50 tw-rounded-lg tw-transition-colors"
              >
                {creator.profilePicture ? (
                  <img
                    src={creator.profilePicture}
                    alt={creator.name}
                    width={40}
                    height={40}
                    className="tw-rounded-full tw-object-cover"
                  />
                ) : (
                  <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
                    <span className="tw-text-lg tw-font-medium tw-text-gray-600">
                      {creator.name[0]}
                    </span>
                  </div>
                )}
                <div className="tw-flex tw-flex-col tw-text-left tw-flex-1">
                  <span className="tw-font-medium tw-text-gray-900">
                    {creator.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorsDropDown;
