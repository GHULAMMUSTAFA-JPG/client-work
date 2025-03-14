import { X } from "lucide-react";
import { MultiSelect } from "@/components/MultiSelect";
import { CREATOR_FILTER_OPTIONS } from "@/constant/brand";
import { FilterState } from "./types";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string[]) => void;
  onSetFilter: (key: keyof FilterState, value: string) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onSetFilter,
  onApplyFilters,
  onResetFilters,
}: FilterSidebarProps) => {
  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40">
      <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-96 tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
        <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b">
          <h2 className="tw-text-xl tw-font-semibold">
            Refine Your Creator Search
          </h2>
          <button
            onClick={onClose}
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
                onChange={(value) => onFilterChange("countries", value)}
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
                onChange={(value) => onFilterChange("jobTitles", value)}
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
                onChange={(value) => onFilterChange("companies", value)}
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
                onChange={(value) => onFilterChange("companySizes", value)}
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
                onChange={(e) => onSetFilter("followerRange", e.target.value)}
              >
                <option value="">Select follower range</option>
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
              onClick={onResetFilters}
              className="tw-px-4 tw-py-2 tw-text-gray-600 tw-hover:text-gray-800"
            >
              Reset
            </button>
            <button
              onClick={onApplyFilters}
              className="tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded-md tw-hover:bg-teal-600"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
