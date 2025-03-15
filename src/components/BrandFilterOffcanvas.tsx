import { ChangeEvent } from "react";

interface FilterItem {
  Value: string;
  Key: string;
}

interface FilterData {
  companies?: FilterItem[];
  country_codes?: FilterItem[];
  job_titles?: FilterItem[];
  employee_range?: FilterItem[];
  follower_range?: FilterItem[];
  sizes?: string[];
  categories?: string[];
  locations?: string[];
}

interface BrandFilterOffcanvasProps {
  availablefilters?: FilterData;
  sizes: string[];
  regions: string[];
  categories: string[];
  companies: string[];
  jobTitles: string[];
  employeeRanges: string[];
  followerRanges: string[];
  interested: boolean;
  setSizes: (sizes: string[]) => void;
  setRegions: (regions: string[]) => void;
  setCategories: (categories: string[]) => void;
  setCompanies: (companies: string[]) => void;
  setJobTitles: (jobTitles: string[]) => void;
  setEmployeeRanges: (employeeRanges: string[]) => void;
  setFollowerRanges: (followerRanges: string[]) => void;
  setInterested: (interested: boolean) => void;
  rerender: boolean;
  setrerender: (rerender: boolean) => void;
  setsearchquery: (query: string) => void;
  setSortOption: (option: string) => void;
  page: number;
  setPage: (page: number) => void;
}

export default function BrandFilterOffcanvas({
  availablefilters,
  sizes,
  regions,
  categories,
  companies,
  jobTitles,
  employeeRanges,
  followerRanges,
  interested,
  setSizes,
  setRegions,
  setCategories,
  setCompanies,
  setJobTitles,
  setEmployeeRanges,
  setFollowerRanges,
  setInterested,
  rerender,
  setrerender,
  setsearchquery,
  setSortOption,
  page,
  setPage,
}: BrandFilterOffcanvasProps) {
  const handleInterestChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInterested(event.target.checked);
  };

  // Generic handler for all filter types
  const handleFilterChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string[]) => void,
    currentValues: string[]
  ): void => {
    const { id, checked } = event.target;
    setter(
      checked
        ? [...currentValues, id]
        : currentValues.filter((value) => value !== id)
    );
  };

  const handleClearAll = (): void => {
    setSizes([]);
    setRegions([]);
    setCategories([]);
    setCompanies([]);
    setJobTitles([]);
    setEmployeeRanges([]);
    setFollowerRanges([]);
    setInterested(false);
    setsearchquery("");

    if (page !== 1) {
      setPage(1);
    }

    setSortOption("most_popular");
    setrerender(!rerender);
  };

  const handleApplyFilter = (): void => {
    if (page !== 1) {
      setPage(1);
    }

    setrerender(!rerender);

    const closeButton = document
      .getElementById("filtersOffcanvas")
      ?.querySelector(".btn-close") as HTMLButtonElement;

    if (closeButton) {
      closeButton.click();
    }
  };

  // Create filter section component to reduce redundancy
  const FilterSection = ({
    title,
    items,
    values,
    setter,
    isValueKey = false,
  }: {
    title: string;
    items: any[] | undefined;
    values: string[];
    setter: (value: string[]) => void;
    isValueKey?: boolean;
  }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button 
            className="accordion-button fs-14 fw-500 d-flex gap-2 align-items-center p-3 tw-justify-between"
            type="button"
            data-bs-toggle="collapse" 
            data-bs-target={`#${title.replace(/\s+/g, '')}-collapse`}
            aria-expanded="true"
            style={{backgroundColor: 'transparent'}}
          >
            <span className="w-100">{title}</span>
         
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
              className="lucide lucide-chevron-down"
              style={{
                transform: 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </h2>

        <div 
          id={`${title.replace(/\s+/g, '')}-collapse`}
          className="accordion-collapse collapse show"
        >
          <div className="accordion-body mt-3">
            <div className="tw-relative mb-3">
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
                className="lucide lucide-search tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-h-4 tw-w-4 tw-text-gray-400"
                aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              
              <input 
                type="text" 
                id="search-input"
                className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-2 focus:tw-ring-teal-500 focus:tw-border-transparent focus:tw-shadow-md"
                placeholder={`${title}...`}
                aria-label="Search countries"
              />
            </div>

            <div className="py-1 tw-text-xs tw-font-medium tw-text-gray-500 mb-2">Popular Choices</div>

            {items.map((item) => {
              const id = isValueKey ? item.Value : item;
              const label = isValueKey ? item.Key : item;

              return (
                <div className="form-check form-check px-3 hover:tw-bg-gray-50 py-2 d-flex align-items-center tw-justify-between" key={id}>
                  <div>
                  <input
                    className="form-check-input text-black"
                    type="checkbox"
                    id={id}
                    checked={values.includes(id)}
                    onChange={(e) => handleFilterChange(e, setter, values)}
                  />
                  <label className="tw-text-sm tw-text-gray-700" htmlFor={id}>
                    {label}
                  </label>
                  </div>
                  <span className="fs-10 tw-text-gray-400">150</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="offcanvas offcanvas-end w-50"
      tabIndex={-1}
      id="filtersOffcanvas"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title">Refine Your Creator Search</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>


      <div className="offcanvas-body">
      
        <FilterSection
          title="Size"
          items={availablefilters?.sizes}
          values={sizes}
          setter={setSizes}
        />

        <FilterSection
          title="Category"
          items={availablefilters?.categories}
          values={categories}
          setter={setCategories}
        />

        <FilterSection
          title="Region"
          items={availablefilters?.locations}
          values={regions}
          setter={setRegions}
        />

        <FilterSection
          title="Companies"
          items={availablefilters?.companies}
          values={companies}
          setter={setCompanies}
          isValueKey={true}
        />

        <FilterSection
          title="Job Titles"
          items={availablefilters?.job_titles}
          values={jobTitles}
          setter={setJobTitles}
          isValueKey={true}
        />

        <FilterSection
          title="Employee Range"
          items={availablefilters?.employee_range}
          values={employeeRanges}
          setter={setEmployeeRanges}
          isValueKey={true}
        />

        <FilterSection
          title="Follower Range"
          items={availablefilters?.follower_range}
          values={followerRanges}
          setter={setFollowerRanges}
          isValueKey={true}
        />

        <FilterSection
          title="Country"
          items={availablefilters?.country_codes}
          values={regions}
          setter={setRegions}
          isValueKey={true}
        />

      </div>

      <div className="offcanvas-footer border-top p-3 bg-white">
      <div className="tw-flex tw-justify-end tw-space-x-3">
  <button className="tw-px-4 tw-py-2 tw-border tw-rounded tw-text-gray-600 hover:tw-text-gray-800" onClick={handleClearAll}>Reset All</button>
  <button className="tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded hover:tw-bg-teal-600"   onClick={handleApplyFilter}>
  Apply Filters 
  </button>
</div>
      </div>


        </div>

   
  );
}
