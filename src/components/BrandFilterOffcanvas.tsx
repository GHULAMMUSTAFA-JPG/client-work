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
      <div className="mb-4">
        <h6 className="mb-3">{title}</h6>
        {items.map((item) => {
          const id = isValueKey ? item.Value : item;
          const label = isValueKey ? item.Key : item;

          return (
            <div className="form-check form-check-inline" key={id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={values.includes(id)}
                onChange={(e) => handleFilterChange(e, setter, values)}
              />
              <label className="form-check-label" htmlFor={id}>
                {label}
              </label>
            </div>
          );
        })}
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
        <h5 className="offcanvas-title">Filters</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body">
        <p className="text-muted mb-4 fs-14">
          Refine your brand search with filters
        </p>

        <div className="row">
          <div className="mb-4 col-md-2">
            <h6 className="mb-3">Watching</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="interested"
                checked={interested}
                onChange={handleInterestChange}
              />
              <label className="form-check-label" htmlFor="interested">
                Interested
              </label>
            </div>
          </div>
        </div>

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

        <div className="mt-auto d-flex gap-2 pt-4 border-top">
          <button className="btn text-decoration-none" onClick={handleClearAll}>
            Clear all
          </button>
          <button
            onClick={handleApplyFilter}
            className="btn btn-primary ms-auto"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}
