"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, Globe, Building, Linkedin, ArrowLeft } from "lucide-react";
import { Undo2 } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { defaultImagePath } from "@/components/constants";
import Image from "next/image";
import { apiController } from "../../@api/baseUrl";
import BrandFilterOffcanvas from "@/components/BrandFilterOffcanvas";
import BrandViewCampaignOffcanvas from "@/components/BrandViewCampaignOffcanvas";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/loader";
import { toast } from "react-toastify";
import Link from "next/link";
import { FilterIcon, ArrowDownUp } from "lucide-react";

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
  const [brandss, setbrandss] = useState<any[]>([]);
  const [availablefilters, setavailablefilters] = useState();
  const [searchquery, setsearchquery] = useState("");
  const [sortOption, setSortOption] = useState("most_popular");

  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [interested, setInterested] = useState(false);
  const [rerender, setrerender] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [brandid, setbrandid] = useState(null);
  const [companyname, setcompanyname] = useState("");
  const observer = useRef<IntersectionObserver>();
  console.log("brandid", brandid);
  const handleSortChange = (option: string) => {
    setSortOption(option);
    if (page !== 1) {
      setPage(1);
    }
  };
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
  const handleSearch = (e: any) => {
    if (page !== 1) {
      setPage(1);
    }
    setsearchquery(e.target.value);
  };

  // Add this useEffect to restore scroll position after updates

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiController.post(
          "/dashboard/creators/discover_brands",
          {
            user_id: user?.uuid,
            is_interested: interested,
            filters: {
              categories: categories,
              size: sizes,
              location: regions,
            },
            search_query: searchquery,
            sort_by: sortOption,
            pagination: {
              page: page,
              limit: 30,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          const newBrands = response.data.brands;
          setbrandss((prev) =>
            page === 1 ? newBrands : [...prev, ...newBrands]
          );
          setHasMore(newBrands.length > 0);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchquery, sortOption, rerender, page]);
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await apiController.get("/unique_filters");
        console.log("filters", response);
        if (response.status === 200) {
          setavailablefilters(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleInterested = async (check: any, id: any, index: any) => {
    try {
      const url =
        check == "add"
          ? "/dashboard/creators/add_brand_to_creator_interest"
          : "/dashboard/creators/remove_brand_from_creator_interest";
      // setLoading(true);
      const response = await apiController.post(url, {
        creator_id: user.uuid,
        brand_id: id,
      });
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        const updatedBrands = brandss.map((brand: any, i: any) => {
          if (i === index) {
            return {
              ...brand,
              Is_Interested: !brand.Is_Interested,
            };
          }
          return brand;
        });
        setbrandss(updatedBrands);
        // setrerender(!rerender);
        // toast.success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
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
                  {sortOption == "most_popular"
                    ? "Most Popular"
                    : sortOption == "largest_first"
                    ? "Largest First"
                    : sortOption == "smallest_first"
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
            {brandss?.map((brand: any, index: any) => (
              <>
                <div
                  key={brand._id}
                  ref={
                    index === brandss.length - 1 ? lastBrandElementRef : null
                  }
                  className="card mb-3"
                >
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-auto">
                        <div className="img-container-lg">
                          <img
                              src={
                              brand.Company_Logo
                                ? brand.Company_Logo
                                : defaultImagePath
                            }
                            />
                        </div>
                      </div>
                      <div className="col">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <h5 className="card-title mb-0">
                            {brand.Company_Name}
                          </h5>
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
                          <span className="status-box">
                            {brand.Size}
                          </span>
                        </div>
                        <p className="card-text text-gray fs-12 mb-3">
                          {brand.Company_Description}
                        </p>
                        <div className="d-flex gap-2">
                        
                          {brand?.Categories?.map((category: any, idx: any) => (
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
                              setcompanyname(brand.Company_Name);
                              setbrandid(brand._id);
                            }}
                            className="btn btn-dark ms-2  w-s"
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
              </>
            ))}
            {/* {loading && <Loader />} */}
            {loading && !searchquery && <Loader />}
          </div>
        </div>
        <BrandFilterOffcanvas
          availablefilters={availablefilters}
          sizes={sizes}
          regions={regions}
          categories={categories}
          interested={interested}
          setSizes={setSizes}
          setRegions={setRegions}
          setCategories={setCategories}
          setInterested={setInterested}
          rerender={rerender}
          setrerender={setrerender}
          setsearchquery={setsearchquery}
          setSortOption={setSortOption}
          page={page}
          setPage={setPage}
        />

        <BrandViewCampaignOffcanvas
          brandid={brandid}
          companyname={companyname}
        />
      </>
    </>
  );
}
