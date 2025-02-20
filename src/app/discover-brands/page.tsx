"use client";

import { useState } from "react";
import { Search, Globe, Building, Linkedin } from "lucide-react";
import Image from "next/image";
import BrandFilterOffcanvas from "@/components/BrandFilterOffcanvas";
import BrandViewCampaignOffcanvas from "@/components/BrandViewCampaignOffcanvas";

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
  // Static brands data
  const brands: Brand[] = [
    {
      id: 1,
      name: "Fathom",
      description: "Fathom records, transcribes, highlights, and summarizes your meetings so you can focus on the conversation.",
      categories: ["Sales Acceleration", "Conversation Intelligence"],
      size: "Small",
      campaigns: [
        {
          title: "Early Access Program",
          description: "Join our early access program and get exclusive benefits",
          budgetRange: "$5,000 - $10,000",
          duration: "3 months",
          requirements: [
            "Minimum 5,000 followers",
            "Experience with SaaS products",
            "Active content creation"
          ]
        },
        {
          title: "Product Review Campaign",
          description: "Create in-depth review content about our platform",
          budgetRange: "$2,000 - $4,000",
          duration: "1 month",
          requirements: [
            "Tech-focused audience",
            "Previous review experience",
            "Video content capabilities"
          ]
        }
      ]
    },
    {
      id: 2,
      name: "BookYourData",
      description: "BookYourData is an email lead list builder for accurate business-to-business (B2B) email lists.",
      categories: ["Sales", "Sales Intelligence"],
      size: "Small",
      campaigns: []
    },
    {
      id: 3,
      name: "AVADA",
      description: "AVADA is The Top Rated Marketing Automation Platform specialized for Shopify, Magento, WooCommerce, SMBs",
      categories: ["Marketing", "Marketing Automation"],
      size: "Small",
      campaigns: []
    },
    // Add more brands as needed
  ];

  return (
    <>
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
                <Search className="h-4 w-4 text-gray fs-12" width={16} height={16} />
              </span>
              <input
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
                Sort: Best match
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item">Best match</button></li>
                <li><button className="dropdown-item">Most Popular</button></li>
                <li><button className="dropdown-item">Top Rating</button></li>
                <li><button className="dropdown-item">Newest</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Brands List */}
        <div className="brands-list">
          {brands.map((brand) => (
            <div key={brand.id} className="card mb-3">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-auto">
                    <div className="wrapper-img-brand">
                      <Image src="/assets/images/apollo.png" alt={`${brand.name} logo`} width={60} height={60} className="rounded" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h5 className="card-title mb-0">{brand.name}</h5>
                      <div className="d-flex gap-1">
                        <Linkedin className="h-4 w-4 text-gray" width={16} height={16} />
                        <Globe className="h-4 w-4 text-gray" width={16} height={16} />
                      </div>
                    </div>
                    <p className="card-text text-gray fs-12 mb-3">{brand.description}</p>
                    <div className="d-flex gap-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {brand.size}
                      </span>
                      {brand.categories.map((category, idx) => (
                        <span key={idx} className="badge bg-secondary bg-opacity-10 text-secondary">
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
                      <button className="btn btn-outline-secondary">I'm Interested</button>
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
