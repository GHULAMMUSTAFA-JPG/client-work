"use client";

import Image from "next/image";
import { Globe, Linkedin, Undo } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "../EmptyState";
import Link from "next/link";
import { getBrandDiscoverList, toggleBrandInterest } from "@/@api/brandApi";
import { isValidUrl } from "@/utils";
import { useSearchParams } from "next/navigation";
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
}

export default function BrandsTable() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [interestedBrands, setInterestedBrands] = useState<string[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const sortBy = searchParams.get("sort") || "largest_first";

  const fetchBrands = useCallback(
    async (currentPage: number, shouldAppend: boolean = true) => {
      if (!user?.uuid || isLoading) return;

      try {
        setIsLoading(true);
        const data = await getBrandDiscoverList({
          userId: user.uuid,
          isInterested: false,
          searchQuery: "",
          sortBy,
          page: currentPage,
          limit: 10,
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
          }));

          setBrands((prev) =>
            shouldAppend ? [...prev, ...newBrands] : newBrands
          );

          const newInterested = data.brands
            .filter((brand: any) => brand.Is_Interested)
            .map((brand: any) => brand._id);

          setInterestedBrands((prev) => [
            ...new Set([...prev, ...newInterested]),
          ]);
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
    [user?.uuid, sortBy]
  );

  useEffect(() => {
    setBrands([]);
    setPage(1);
    setHasMore(true);
    fetchBrands(1, false);
  }, [sortBy, fetchBrands]);

  useEffect(() => {
    if (page > 1) {
      fetchBrands(page, true);
    }
  }, [page, fetchBrands]);

  // Intersection Observer setup
  const lastBrandRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
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
  }, [hasMore, isLoading]);

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
