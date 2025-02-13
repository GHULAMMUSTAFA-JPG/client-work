"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { brandRegions, brandsCategories, brandSizes } from "@/constant/brand";

export default function BrandsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedRegions, setSelectedRegions] = useState<string[]>(() => {
    const regions = searchParams.get("regions")?.split(",") || ["all"];
    return regions;
  });

  const [selectedSizes, setSelectedSizes] = useState<string[]>(() => {
    const sizes = searchParams.get("sizes")?.split(",") || ["all"];
    return sizes;
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const categories = searchParams.get("categories")?.split(",") || [];
    return categories;
  });

  const [watching, setWatching] = useState<boolean>(() => {
    return searchParams.get("watching") === "true";
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedRegions.length > 0) {
      params.set("regions", selectedRegions.join(","));
    }

    if (selectedSizes.length > 0) {
      params.set("sizes", selectedSizes.join(","));
    }

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }

    if (watching) {
      params.set("Interested", "true");
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }, [selectedRegions, selectedSizes, selectedCategories, watching, router]);

  return (
    <div className="d-flex flex-column gap-1">
      <div>
        <h3 className="h6 mb-2">Watching</h3>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="watching"
            checked={watching}
            onChange={(e) => setWatching(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="watching">
            Interested
          </label>
        </div>
      </div>
      <div>
        <h3 className="h6 mb-2">Category</h3>
        <div className="d-flex flex-sm-column gap-1">
          {brandsCategories.map((category) => (
            <div key={category.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category.id]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((id) => id !== category.id)
                    );
                  }
                }}
              />
              <label className="form-check-label" htmlFor={category.id}>
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="h6 mb-2">Size</h3>
        <div className="d-flex flex-sm-column gap-1">
          {brandSizes.map((size) => (
            <div key={size.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={size.id}
                checked={selectedSizes.includes(size.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSizes([...selectedSizes, size.id]);
                  } else {
                    setSelectedSizes(
                      selectedSizes.filter((id) => id !== size.id)
                    );
                  }
                }}
              />
              <label className="form-check-label" htmlFor={size.id}>
                {size.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="h6 mb-2">Region</h3>
        <div className="d-flex flex-sm-column gap-1">
          {brandRegions.map((region) => (
            <div key={region.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={region.id}
                checked={selectedRegions.includes(region.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRegions([...selectedRegions, region.id]);
                  } else {
                    setSelectedRegions(
                      selectedRegions.filter((id) => id !== region.id)
                    );
                  }
                }}
              />
              <label className="form-check-label" htmlFor={region.id}>
                {region.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
