"use client";

import { useEffect, useState } from "react";
import { Search, Globe, Building, Linkedin } from "lucide-react";
import { defaultImagePath } from "@/components/constants";
import Image from "next/image";
import { apiController } from "../../@api/baseUrl";
import BrandFilterOffcanvas from "@/components/BrandFilterOffcanvas";
import BrandViewCampaignOffcanvas from "@/components/BrandViewCampaignOffcanvas";
import { useAuth } from "@/contexts/AuthContext";

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

export default function DiscoverBrandsPage() {
  const { user, setIsLoading } = useAuth();
  const [brandss, setbrandss] = useState([]);
  const [searchquery, setsearchquery] = useState("");
  const [sortOption, setSortOption] = useState("most_popular");
  const handleSortChange = (option: string) => {
    setSortOption(option); // Update the state with the selected sort option
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiController.post(
          "/dashboard/creators/discover_brands",
          {
            user_id: user.uuid,
            is_interested: false,
            filters: {
              categories: [],
              size: [],
              location: [],
            },
            search_query: searchquery,
            sort_by: sortOption,
          }
        );
        console.log(response);
        if (response.status === 200) {
          setbrandss(response.data.brands);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchquery, sortOption]);

  return (
    <>
      <div className="container py-4">
        <div className="mb-4">
          <h1 className="h3 mb-2">Discover Brands</h1>
          <p className="text-muted fs-14">
            Explore brands looking to collaborate and sponsor you in endless
            ways.
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
                value={searchquery}
                onChange={(e) => setsearchquery(e.target.value)}
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
            >
              Filters
            </button>

            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                Sort: {sortOption}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortChange("most_popular")}
                  >
                    MOST_POPULAR
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortChange("largest_first")}
                  >
                    LARGEST_FIRST
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortChange("smallest_first")}
                  >
                    SMALLEST_FIRST
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Brands List */}
        <div className="brands-list">
          {brandss?.map((brand: any) => (
            <div key={brand._id} className="card mb-3">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-auto">
                    <div className="wrapper-img-brand">
                      <img
                        src={
                          brand.Company_Banner
                            ? brand.Company_Banner
                            : defaultImagePath
                        }
                        // alt={`${brand.Company_Name} logo`}
                        width={60}
                        height={60}
                        className="rounded"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h5 className="card-title mb-0">{brand.Company_Name}</h5>
                      <div className="d-flex gap-1">
                        <Linkedin
                          className="h-4 w-4 text-gray"
                          width={16}
                          height={16}
                        />
                        <Globe
                          className="h-4 w-4 text-gray"
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>
                    <p className="card-text text-gray fs-12 mb-3">
                      {brand.Company_Description}
                    </p>
                    <div className="d-flex gap-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {brand.Size}
                      </span>
                      {brand?.Categories?.map((category: any, idx: any) => (
                        <span
                          key={idx}
                          className="badge bg-secondary bg-opacity-10 text-secondary"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#campaignsOffcanvas"
                      >
                        View campaigns
                      </button>
                      <button className="btn btn-outline-secondary">
                        I'm Interested
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BrandFilterOffcanvas />
      <BrandViewCampaignOffcanvas />
    </>
  );
}
