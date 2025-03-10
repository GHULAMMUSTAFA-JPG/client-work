"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, Undo2, FilterIcon, ArrowDownUp } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { apiController } from "../../@api/baseUrl";
import BrandFilterOffcanvas from "@/components/BrandFilterOffcanvas";
import BrandViewCampaignOffcanvas from "@/components/BrandViewCampaignOffcanvas";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/loader";
import Link from "next/link";
import { getCreatorUniqueFilters } from "@/@api/creator";

interface Campaign {
  title: string;
  description: string;
  budgetRange: string;
  duration: string;
  requirements: string[];
}

interface Brand {
  id: number;
  name: string;
  description: string;
  categories: string[];
  size: string;
  campaigns: Campaign[];
}

interface FilterItem {
  Value: string;
  Key: string;
}

interface FilterResponse {
  companies: FilterItem[];
  country_codes: FilterItem[];
  job_titles: FilterItem[];
  employee_range: FilterItem[];
  follower_range: FilterItem[];
  sizes?: string[];
  categories?: string[];
  locations?: string[];
}

interface BrandAPIResponse {
  _id: string;
  Company_Name: string;
  Company_Description: string;
  Company_Logo?: string;
  Company_Website?: string;
  Company_Linkedin?: string;
  Categories?: string[];
  Size?: string;
  Is_Interested: boolean;
}

interface ApiRequestFilters {
  categories: string[];
  size: string[];
  location: string[];
  companies: string[];
  job_titles: string[];
  employee_range: string[];
  follower_range: string[];
}

export default function DiscoverBrandsPage() {
  const { user } = useAuth();
  const [brands, setBrands] = useState<BrandAPIResponse[]>([]);
  const [availableFilters, setAvailableFilters] = useState<
    FilterResponse | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("most_popular");

  // Filter states
  const [sizes, setSizes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [employeeRanges, setEmployeeRanges] = useState<string[]>([]);
  const [followerRanges, setFollowerRanges] = useState<string[]>([]);
  const [interested, setInterested] = useState(false);

  // UI states
  const [rerender, setRerender] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");

  const observer = useRef<IntersectionObserver>();

  const handleSortChange = (option: string): void => {
    setSortOption(option);
    if (page !== 1) {
      setPage(1);
    }
  };

  // Infinite scroll implementation
  const lastBrandElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (page !== 1) {
      setPage(1);
    }
    setSearchQuery(e.target.value);
  };

  // Fetch brands data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Create filters object
        const filters: ApiRequestFilters = {
          categories,
          size: sizes,
          location: regions,
          companies,
          job_titles: jobTitles,
          employee_range: employeeRanges,
          follower_range: followerRanges,
        };

        const response = await apiController.post(
          "/dashboard/creators/discover_brands",
          {
            user_id: user?.uuid,
            is_interested: interested,
            filters,
            search_query: searchQuery,
            sort_by: sortOption,
            pagination: {
              page,
              limit: 30,
            },
          }
        );

        if (response.status === 200) {
          const newBrands = response.data.brands;
          setBrands((prev) =>
            page === 1 ? newBrands : [...prev, ...newBrands]
          );
          setHasMore(newBrands.length > 0);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching brands:", error);
      }
    };

    fetchData();
  }, [searchQuery, sortOption, rerender, page, user?.uuid]);

  // Fetch filter options
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await getCreatorUniqueFilters();
        if (response) {
          setAvailableFilters(response as FilterResponse);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  // Handle brand interest toggle
  const handleInterested = async (
    action: "add" | "remove",
    id: string,
    index: number
  ): Promise<void> => {
    try {
      const url =
        action === "add"
          ? "/dashboard/creators/add_brand_to_creator_interest"
          : "/dashboard/creators/remove_brand_from_creator_interest";

      const response = await apiController.post(url, {
        creator_id: user?.uuid,
        brand_id: id,
      });

      if (response.status === 200) {
        const updatedBrands = brands.map((brand, i) => {
          if (i === index) {
            return {
              ...brand,
              Is_Interested: !brand.Is_Interested,
            };
          }
          return brand;
        });

        setBrands(updatedBrands);
      }
    } catch (error) {
      console.error("Error updating interest:", error);
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="h3 mb-2">Discover Brands</h1>
        <p className="text-muted fs-14">
          Explore brands looking to collaborate and sponsor you in endless ways.
        </p>
      </div>

      <div className="row g-3 mb-4 align-items-center">
        <div className="col">
          <div className="input-group discover-brands-search">
            <span className="input-group-text border-end-0 bg-white">
              <Search
                className="h-4 w-4 text-gray fs-12"
                width={16}
                height={16}
              />
            </span>
            <input
              value={searchQuery}
              onChange={handleSearch}
              type="search"
              className="form-control border-start-0"
              placeholder="Search brands and keywords"
            />
          </div>
        </div>

        <div className="col-auto d-flex gap-2">
          <button
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#filtersOffcanvas"
            style={{ color: "black" }}
          >
            <FilterIcon size={13} />
            Filters
          </button>

          <div
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
            className="dropdown"
          >
            <span style={{ color: "grey" }}> Sort: </span>

            <button
              style={{
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              {sortOption === "most_popular"
                ? "Most Popular"
                : sortOption === "largest_first"
                  ? "Largest First"
                  : sortOption === "smallest_first"
                    ? "Smallest First"
                    : ""}
              <ArrowDownUp size={13} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSortChange("most_popular")}
                >
                  Most Popular
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSortChange("largest_first")}
                >
                  Largest First
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSortChange("smallest_first")}
                >
                  Smallest First
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brands List */}
      <div className="brands-list">
        {brands.map((brand, index) => (
          <div
            key={brand._id}
            ref={index === brands.length - 1 ? lastBrandElementRef : undefined}
            className="card mb-3"
          >
            <div className="card-body p-4">
              <div className="row">
                <div className="col-auto">
                  <div className="img-container-lg">
                    {brand.Company_Logo ? (
                      <img
                        src={brand.Company_Logo}
                        alt={brand.Company_Name}
                        className="w-100 h-100 object-fit-cover"
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center bg-light rounded-circle w-100 h-100">
                        <span className="fs-1 fw-bold text-uppercase">
                          {brand.Company_Name
                            ? brand.Company_Name.charAt(0)
                            : "B"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <h5 className="card-title mb-0">{brand.Company_Name}</h5>
                    <div className="d-flex gap-1">
                      {brand.Company_Website && (
                        <Link
                          href={`https://${brand.Company_Website}`}
                          target="_blank"
                        >
                          <Icon
                            icon="mdi:web"
                            width="18"
                            height="18"
                            className="text-warning ms-1"
                            style={{
                              minWidth: "18px",
                              minHeight: "18px",
                            }}
                          />
                        </Link>
                      )}
                      {brand.Company_Linkedin && (
                        <Link
                          href={`https://${brand.Company_Linkedin}`}
                          target="_blank"
                        >
                          <Icon
                            icon="mdi:linkedin"
                            width="18"
                            height="18"
                            className="text-info ms-2"
                            style={{
                              minWidth: "18px",
                              minHeight: "18px",
                            }}
                          />
                        </Link>
                      )}
                    </div>
                    <span className="status-box">{brand.Size}</span>
                  </div>
                  <p className="card-text text-gray fs-12 mb-3">
                    {brand.Company_Description}
                  </p>
                  <div className="d-flex gap-2">
                    {brand?.Categories?.map((category, idx) => (
                      <span key={idx} className="chips">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-auto">
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => {
                        setCompanyName(brand.Company_Name);
                        setBrandId(brand._id);
                      }}
                      className="btn btn-dark ms-2 w-s"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#campaignsOffcanvas"
                    >
                      View campaigns
                    </button>
                    {brand.Is_Interested ? (
                      <button
                        style={{ display: "flex", gap: "8px" }}
                        onClick={() =>
                          handleInterested("remove", brand._id, index)
                        }
                        className="btn btn-outline-primary"
                      >
                        <Undo2 size={16} />
                        <span>Interested</span>
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleInterested("add", brand._id, index)
                        }
                        className="btn btn-outline-primary"
                      >
                        I'm Interested
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && !searchQuery && <Loader />}
      </div>

      <BrandFilterOffcanvas
        availablefilters={availableFilters}
        sizes={sizes}
        regions={regions}
        categories={categories}
        companies={companies}
        jobTitles={jobTitles}
        employeeRanges={employeeRanges}
        followerRanges={followerRanges}
        interested={interested}
        setSizes={setSizes}
        setRegions={setRegions}
        setCategories={setCategories}
        setCompanies={setCompanies}
        setJobTitles={setJobTitles}
        setEmployeeRanges={setEmployeeRanges}
        setFollowerRanges={setFollowerRanges}
        setInterested={setInterested}
        rerender={rerender}
        setrerender={setRerender}
        setsearchquery={setSearchQuery}
        setSortOption={setSortOption}
        page={page}
        setPage={setPage}
      />

      <BrandViewCampaignOffcanvas brandid={brandId} companyname={companyName} />
    </div>
  );
}
