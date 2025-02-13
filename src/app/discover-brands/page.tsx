import BrandsFilters from "@/components/brands/BrandFilter";
import BrandsTable from "@/components/brands/BrandTable";
import { SearchIcon } from "lucide-react";
import { Suspense } from "react";

export default async function DiscoverBrandsPage() {
  return (
    <div className="container py-4">
      <Suspense fallback={<div>Loading search...</div>}>
        <div className="mb-4">
          <h1 className="h3 mb-2">Discover Brands</h1>
          <p className="text-muted">
            Explore brands looking to collaborate and sponsor you in endless
            ways.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-3">
            <BrandsFilters />
          </div>

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
                  Most Popular
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item">Most Popular</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Top Rating</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Largest</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Smallest</button>
                  </li>
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
