"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Target,
  ChevronDown,
  Users,
  Calendar,
  DollarSign,
  ChartBar,
  HelpCircle,
} from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import Link from "next/link";
import { getPaymentStatusInfo } from "./utils";
import { PaymentStatus } from "@/types";
interface PaymentBreakdown {
  totalBudget: number;
  earnings: number;
  platformFee: number;
  netAmount: number;
}
interface CampaignHeaderProps {
  onBack: () => void;
  title: string;
  budget: string;
  date: string;
  status: "Public" | "Private";
  objective?: string;
  audience?: string;
  platform?: string;
  website?: string;
  paymentStatus?: PaymentStatus;
  onViewEarnings?: () => void;
  paymentBreakdown?: PaymentBreakdown;
}

export function CampaignHeader({
  title,
  budget,
  date,
  status,
  objective = "To showcase Modern Home as a leading brand in modern and stylish home decor and furniture",
  audience = "Home decor enthusiasts, interior design professionals",
  platform = "Instagram, LinkedIn",
  website = "modernhome.com",
  paymentStatus,
  onViewEarnings,
  paymentBreakdown,
}: CampaignHeaderProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showPaymentBreakdown, setShowPaymentBreakdown] = useState(false);
  const [showPaymentTooltip, setShowPaymentTooltip] = useState(false);

  const statusInfo = getPaymentStatusInfo(
    paymentStatus?.status || "processing"
  );

  const campaignDetails = {
    title: "Campaign Details",
    type: "campaign",
    campaignName: title,
    status: status,
    budget: budget,
    duration: date,
    sections: [
      {
        title: "Overview",
        items: [
          {
            label: "Campaign Brief",
            value: objective,
            type: "text",
          },
          {
            label: "Target Audience",
            value: audience,
            type: "text",
          },
        ],
      },
      {
        title: "Campaign Information",
        items: [
          {
            label: "Platforms",
            value: platform,
            type: "tags",
          },
          {
            label: "Website",
            value: website,
            type: "link",
          },
        ],
      },
    ],
  };

  const PaymentBreakdownModal = () => {
    if (!showPaymentBreakdown) return null;

    return (
      <>
        <div className="modal-backdrop fade show"></div>
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <div className="modal-header border-0 px-0 pt-0">
                <h3 className="modal-title fs-5 fw-semibold">
                  Payment Breakdown
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPaymentBreakdown(false)}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body px-0">
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="text-secondary">
                      Total Campaign Budget
                    </span>
                    <span className="fw-semibold">
                      ${paymentBreakdown?.totalBudget.toLocaleString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="text-secondary">Your Earnings</span>
                    <span className="fw-semibold text-primary">
                      ${paymentBreakdown?.earnings.toLocaleString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="text-secondary">Platform Fee</span>
                    <span className="fw-semibold text-danger">
                      -${paymentBreakdown?.platformFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 mt-3  rounded">
                    <span className="fw-medium">Net Amount</span>
                    <span className="fw-bold fs-5">
                      ${paymentBreakdown?.netAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="small text-secondary">
                  <p className="mb-0">
                    * Payment will be processed within 5-7 business days after
                    content approval
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setShowPaymentBreakdown(false)}
                    className="btn btn-primary w-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-white border-bottom">
      <div className="p-4">
        <div className="d-flex align-items-center mb-4">
          <Link
            href={"/campaigns"}
            className="btn btn-link text-secondary d-flex align-items-center"
          >
            <ArrowLeft
              className="me-2"
              style={{ width: "20px", height: "20px" }}
            />
            <span className="fw-medium">All Campaigns</span>
          </Link>
        </div>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <Target
              className="text-primary me-3"
              style={{ width: "32px", height: "32px" }}
            />
            <div>
              <div className="d-flex align-items-center">
                <h1 className="h4 fw-semibold mb-0 me-3">{title}</h1>
                <span className="badge bg-primary rounded-pill">{status}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsDetailsOpen(true)}
            className="btn btn-link text-primary d-flex align-items-center"
          >
            <span className="me-1">Show More</span>
            <ChevronDown style={{ width: "16px", height: "16px" }} />
          </button>
        </div>

        <div className="d-flex align-items-start justify-content-between">
          <div>
            <div className="d-flex text-secondary small mb-2">
              <div className="d-flex align-items-center me-4">
                <Calendar
                  className="me-1"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{date}</span>
              </div>
              <div className="d-flex align-items-center me-4">
                <DollarSign
                  className="me-1"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Budget: {budget}</span>
              </div>
              <div className="d-flex align-items-center">
                <Users
                  className="me-1"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{audience}</span>
              </div>
            </div>
            <p className="text-secondary small" style={{ maxWidth: "42rem" }}>
              {objective}
            </p>
          </div>
        </div>
      </div>
      <div className=" py-2 border-top">
        <div className="d-flex flex-column gap-4">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex align-items-center gap-2">
                <span className="fs-5 fw-semibold text-dark px-3">
                  {budget}
                </span>
              </div>
              <div className="position-relative">
                <button
                  onClick={() => setShowPaymentBreakdown(true)}
                  className="btn btn-link text-primary p-0 fw-medium"
                >
                  View Breakdown
                </button>
              </div>
            </div>

            <div className="position-relative">
              <div
                className={`d-flex align-items-center gap-2 px-3 py-2 rounded-pill border ${statusInfo.color}`}
                style={{ cursor: "help" }}
                onMouseEnter={() => setShowPaymentTooltip(true)}
                onMouseLeave={() => setShowPaymentTooltip(false)}
              >
                {statusInfo.icon}
                <span className="small fw-medium">{statusInfo.label}</span>
                <HelpCircle
                  style={{ width: "1rem", height: "1rem" }}
                  className="ms-1"
                />
              </div>

              {showPaymentTooltip && (
                <div
                  className="position-absolute top-100 end-0 mt-1 p-3 bg-dark text-white rounded "
                  style={{ width: "18rem", zIndex: 1050 }}
                >
                  <p className="">
                    {statusInfo.tooltip ||
                      "Your payment is processed within 14 days after post approval. For delays, check your payment method settings."}
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onViewEarnings}
            className="btn btn-outline-primary d-flex align-items-center justify-content-center w-100"
          >
            <ChartBar
              style={{ width: "1rem", height: "1rem" }}
              className="me-2"
            />
            View Earnings Dashboard
          </button>
        </div>
      </div>

      <CampaignDrawer
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title="Campaign Details"
        description=""
        dueDate=""
        payout=""
        type="details"
        initialData={campaignDetails}
      />

      <PaymentBreakdownModal />
    </div>
  );
}
