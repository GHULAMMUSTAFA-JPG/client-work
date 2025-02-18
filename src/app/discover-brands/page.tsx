"use client";
import BrandsFilters from "@/components/brands/BrandFilter";
import BrandsTable from "@/components/brands/BrandTable";
import { SortOptions } from "@/constant/brand";
import { SearchIcon, ArrowDownWideNarrow } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useCallback } from "react";
import { getBrandDiscoverList } from "@/@api/brandApi";
import { useAuth } from "@/contexts/AuthContext";
import { withAuthRole } from "@/utils/withAuthRole";

interface Brand {
  id: string;
  name: string;
  logo: string;
  linkedin?: string;
  website?: string;
  description?: string;
  size?: string;
  categories: string[];
  isInterested: boolean;
}

function DiscoverBrandsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [brands, setBrands] = useState<Brand[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBrands = useCallback(
    async (currentPage: number, shouldAppend: boolean = true) => {
      console.log(user);
      if (!user?.uuid || isLoading) return;

      try {
        setIsLoading(true);
        const categoryParam = searchParams.get("categories");
        const sizeParam = searchParams.get("sizes");
        const regionsParam = searchParams.get("regions");
        const interestedParam = searchParams.get("interested");

        const data = await getBrandDiscoverList({
          userId: user.uuid,
          isInterested: interestedParam === "true",
          searchQuery: searchParams.get("query") || "",
          sortBy: searchParams.get("sort") || SortOptions.LARGEST_FIRST,
          page: currentPage,
          limit: 10,
          sales: categoryParam ? categoryParam.split(",") : undefined,
          size: sizeParam ? sizeParam.split(",") : undefined,
          regions: regionsParam ? regionsParam.split(",") : undefined,
        });

        if (data?.brands) {
          const newBrands = data.brands.map((brand: any) => ({
            id: brand._id,
            name: brand.Company_Name,
            logo: brand.Company_Logo,
            linkedin: brand.Company_Linkedin,
            website: brand.Company_Website,
            description: brand.Company_Description,
            size: brand.Size,
            categories: brand.Categories,
            isInterested: brand.Is_Interested,
          }));

          setBrands((prev) =>
            shouldAppend ? [...prev, ...newBrands] : newBrands
          );

          setHasMore(
            data.pagination.current_page < data.pagination.total_pages
          );
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [user?.uuid, searchParams]
  );

  useEffect(() => {
    setBrands([]);
    setPage(1);
    setHasMore(true);
    fetchBrands(1, false);
  }, [searchParams, fetchBrands]);

  useEffect(() => {
    if (page > 1) {
      fetchBrands(page, true);
    }
  }, [page, fetchBrands]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has("sort")) {
      params.set("sort", SortOptions.LARGEST_FIRST);
      router.replace(`?${params.toString()}`);
    }
  }, [searchParams, router]);

  const handleSortChange = (sortOption: SortOptions) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortOption);
    if (searchQuery) params.set("query", searchQuery);
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams);
      if (searchQuery) {
        params.set("query", searchQuery);
      } else {
        params.delete("query");
      }
      router.push(`?${params.toString()}`);
    }
  };

  const handleFilterComplete = () => {
    setBrands([]);
    setPage(1);
    setHasMore(true);
    fetchBrands(1, false);
  };

  const currentSort = searchParams.get("sort") || SortOptions.POPULAR;

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-2">Discover Brands</h1>
        <p className="text-muted">
          Explore brands looking to collaborate and sponsor you in endless ways.
        </p>
      </header>

      <div className="row g-4">
        <aside className="col-lg-3">
          <BrandsFilters />
        </aside>

        <main className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div
              className="position-relative flex-grow-1 me-3"
              style={{ maxWidth: "400px" }}
            >
              <SearchIcon
                className="position-absolute"
                style={{
                  left: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "#6c757d",
                }}
              />
              <input
                type="search"
                placeholder="Search brands and keywords"
                className="form-control ps-4"
                style={{ padding: "7px" }}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
              />
            </div>
            <div className="dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <ArrowDownWideNarrow size={16} />
                {currentSort.replace(/_/g, " ")}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {Object.entries(SortOptions).map(([key, value]) => (
                  <li key={key}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSortChange(value)}
                    >
                      {key.replace(/_/g, " ")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <BrandsTable
            brands={brands}
            hasMore={hasMore}
            isLoading={isLoading}
            onLoadMore={() => setPage((prev) => prev + 1)}
          />
        </main>
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiscoverBrandsContent />
    </Suspense>
  );
}

export default withAuthRole({
  Component: Page,
  allowedRoles: ["creator"],
});
