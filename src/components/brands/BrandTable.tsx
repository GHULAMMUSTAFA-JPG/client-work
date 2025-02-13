"use client";

import Image from "next/image";
import { Globe, Linkedin, Undo } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "../EmptyState";
import Link from "next/link";
import { getBrandDiscoverList, toggleBrandInterest } from "@/@api/brandApi";

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
  const { user, rendControl } = useAuth();
  const [interestedBrands, setInterestedBrands] = useState<string[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!user?.email) return;

      const data = await getBrandDiscoverList(user.email);
      if (data?.brands) {
        setBrands(data.brands);
      }
    };

    fetchBrands();
  }, [user?.email, rendControl]);

  const handleToggleInterest = async (brandId: string) => {
    const addInterest = !interestedBrands.includes(brandId);
    const result = await toggleBrandInterest(user?.id, brandId, addInterest);

    if (result) {
      setInterestedBrands((prev) =>
        addInterest ? [...prev, brandId] : prev.filter((id) => id !== brandId)
      );
    }
  };

  if (brands.length === 0) {
    return (
      <EmptyState
        icon="bi bi-search"
        title="No Brands Found"
        description="We couldn’t find any brands matching your search criteria."
        secondaryDescription="Try adjusting your search or filters to find more results."
        buttonText="Clear Search"
        buttonLink="/discover-brands"
      />
    );
  }
  return (
    <div className="d-flex flex-column gap-3">
      {brands.map((brand) => {
        const isInterested = interestedBrands.includes(brand.id);

        return (
          <div key={brand.id} className="card">
            <div className="card-body d-flex gap-4">
              <div
                style={{ width: "48px", height: "48px", position: "relative" }}
                className="flex-shrink-0 d-flex align-items-center justify-content-center border rounded"
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="rounded object-fit-cover"
                  />
                ) : (
                  <i className="bi bi-buildings fs-3 text-muted"></i>
                )}
              </div>

              <div className="flex-grow-1 min-width-0">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <h3 className="h6 mb-0">{brand.name}</h3>
                  <div className="d-flex gap-1">
                    {brand.linkedin && (
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
                    {brand.website && (
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
                style={{ width: "140px" }}
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
    </div>
  );
}
