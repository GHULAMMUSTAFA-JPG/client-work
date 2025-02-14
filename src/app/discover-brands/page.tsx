"use client";
import BrandsFilters from "@/components/brands/BrandFilter";
import BrandsTable from "@/components/brands/BrandTable";
import { SortOptions } from "@/constant/brand";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect,Suspense } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    router.push(`?${params.toString()}`);
  };

  const currentSort = searchParams.get("sort") || SortOptions.POPULAR;

  return (
    <div className="container py-4">
     <Suspense fallback={<div>Loading search...</div>}>
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
                  left: "12px",
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
                style={{ paddingLeft: "35px" }}
              />
            </div>

            <div className="dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
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

          <BrandsTable />
        </main>
      </div>
     </Suspense>
    </div>
  );
}
