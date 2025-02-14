"use client";

import Image from "next/image";
import { Globe, Linkedin, Undo } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "../EmptyState";
import Link from "next/link";
import { getBrandDiscoverList, toggleBrandInterest } from "@/@api/brandApi";
import { isValidUrl } from "@/utils";
import { SortOptions } from "@/constant/brand";

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

interface BrandsTableProps {
  brands: Brand[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function BrandsTable({
  brands,
  hasMore,
  isLoading,
  onLoadMore,
}: BrandsTableProps) {
  const { user } = useAuth();
  const [interestedBrands, setInterestedBrands] = useState<string[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBrandRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize interestedBrands from props
    setInterestedBrands(brands.filter((b) => b.isInterested).map((b) => b.id));
  }, [brands]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (lastBrandRef.current) {
      observer.current.observe(lastBrandRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  const handleToggleInterest = async (brandId: string) => {
    const addInterest = !interestedBrands.includes(brandId);
    const result = await toggleBrandInterest(user?.uuid, brandId, addInterest);

    if (result) {
      setInterestedBrands((prev) =>
        addInterest ? [...prev, brandId] : prev.filter((id) => id !== brandId)
      );
    }
  };

  if (brands.length === 0 && !hasMore && !isLoading) {
    return (
      <EmptyState
        icon="bi bi-search"
        title="No Brands Found"
        description="We couldn't find any brands matching your search criteria."
        secondaryDescription="Try adjusting your search or filters to find more results."
        buttonText="Clear Search"
        buttonLink={`/discover-brands?sort=${SortOptions.LARGEST_FIRST}`}
      />
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {brands.map((brand, index) => {
        const isInterested = interestedBrands.includes(brand.id);
        const isLast = index === brands.length - 1;

        return (
          <div
            key={brand.id}
            ref={isLast ? lastBrandRef : null}
            className="card"
          >
            <div className="card-body d-flex gap-4">
              <div
                style={{ width: "48px", height: "48px", position: "relative" }}
                className="flex-shrink-0 d-flex align-items-center justify-content-center border rounded"
              >
                {isValidUrl(brand.logo) ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    className="rounded object-fit-cover"
                    width={32}
                    height={32}
                  />
                ) : (
                  <i className="bi bi-buildings fs-3 text-muted"></i>
                )}
              </div>

              <div className="flex-grow-1 min-width-0">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <h3 className="h6 mb-0">{brand.name}</h3>
                  <div className="d-flex gap-1">
                    {isValidUrl(brand.linkedin) && (
                      <a
                        href={brand.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted"
                      >
                        <Linkedin
                          className="icon"
                          style={{ width: "16px", height: "16px" }}
                        />
                      </a>
                    )}
                    {isValidUrl(brand.website) && (
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted"
                      >
                        <Globe
                          className="icon"
                          style={{ width: "16px", height: "16px" }}
                        />
                      </a>
                    )}
                  </div>
                </div>

                <p
                  className="text-muted small mb-3"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {brand.description}
                </p>

                <div className="d-flex align-items-center gap-3">
                  {brand.size && (
                    <span className="text-primary small fw-medium">
                      {brand.size}
                    </span>
                  )}
                  <div className="d-flex flex-wrap gap-2">
                    {brand.categories.map((category, index) => (
                      <span key={index} className="text-muted small">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="d-flex flex-column gap-2"
                style={{ minWidth: "140px" }}
              >
                <Link
                  className="btn btn-primary btn-sm"
                  href={`/creator-discover?brandId=${encodeURIComponent(
                    brand.name
                  )}`}
                >
                  View Campaigns
                </Link>
                {isInterested ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-muted small">Interested</span>
                    <button
                      className="btn btn-link btn-sm text-primary p-0"
                      onClick={() => handleToggleInterest(brand.id)}
                    >
                      <Undo
                        className="me-1"
                        style={{ width: "16px", height: "16px" }}
                      />
                      Undo
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleToggleInterest(brand.id)}
                  >
                    I&apos;m Interested
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {(hasMore || isLoading) && (
        <p className="text-center text-muted">Loading more...</p>
      )}
    </div>
  );
}
