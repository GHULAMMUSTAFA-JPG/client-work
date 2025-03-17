import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Target,
  ChevronDown,
  Users,
  Calendar,
  DollarSign,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import { getStripeLoginLink } from "@/@api/campaign";
import { toast } from "react-toastify";
import { apiController } from "@/@api/baseUrl";
import { useAuth } from "@/contexts/AuthContext";

interface CampaignHeaderProps {
  onBack: () => void;
  title: string;
  budget: string;
  date: string;
  status: "Public" | "Draft";
  objective?: string;
  audience?: string[];
  platform?: string[];
  website?: string;
  userId: string;
  onViewEarnings?: () => void;
}

export function CampaignHeader({
  onBack,
  title,
  budget,
  date,
  status,
  objective,
  audience,
  platform,
  website,
  userId,
}: CampaignHeaderProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loadingEarnings, setLoadingEarnings] = useState(false);
  const [charges_enabled, setcharges_enabled] = useState(null);
  const [onboarding_status, setonboarding_status] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchAccountStatus = async () => {
      try {
        // setchecksloading(true);
        const response = await apiController.get(
          `/payments/${user?.uuid}/account-status`
        );
        console.log("status", response);
        if (response.status === 200) {
          setcharges_enabled(response.data.charges_enabled);
          setonboarding_status(response.data.onboarding_status);
          // setchecksloading(false);
        }
      } catch (error) {
        // setchecksloading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchAccountStatus();
  }, []);

  const handleViewEarnings = async () => {
    if (!userId) return alert("Stripe account ID is missing.");

    setLoadingEarnings(true);
    const response = await getStripeLoginLink(userId);
    setLoadingEarnings(false);

    if (response?.success && response.data?.url) {
      window.open(response.data.url, "_blank", "noopener noreferrer");
    } else {
      toast.error("Missing Stripe account");
    }
  };

  return (
    <div className="tw-bg-white tw-border-b tw-border-gray-200">
      <div className="tw-px-6 tw-py-4">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
          <div className="tw-flex tw-items-center tw-space-x-4">
            <button
              onClick={onBack}
              className="tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-900"
            >
              <ArrowLeft className="tw-w-5 tw-h-5 tw-mr-2" />
              <span className="tw-font-medium">All Campaigns</span>
            </button>
          </div>

          <div className="tw-flex tw-items-center tw-space-x-6">
            <div className="tw-flex tw-items-center tw-space-x-2">
              <DollarSign className="tw-w-5 tw-h-5 tw-text-green-600" />
              <span className="tw-text-lg tw-font-semibold tw-text-gray-900">
                {budget}
              </span>
            </div>

            <button
              onClick={handleViewEarnings}
              className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-text-sm tw-text-primary hover:tw-text-primary-dark tw-border tw-border-primary hover:tw-bg-primary/5 tw-rounded-md ${
                onboarding_status === false || charges_enabled === false
                  ? "tw-opacity-50 tw-pointer-events-none"
                  : ""
              }`}
              disabled={loadingEarnings}
              title="View your earnings in Stripe Dashboard"
            >
              <CreditCard className="tw-w-4 tw-h-4 tw-mr-2" />
              {loadingEarnings ? "Loading..." : "View Earnings"}
              <ExternalLink className="tw-w-3 tw-h-3 tw-ml-1" />
            </button>
          </div>
        </div>
        {(onboarding_status == false || charges_enabled == false) && (
          <div className=" tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-4 tw-mb-6 tw-border-l-4 tw-border-green-500 tw-mt-6">
            <div className="tw-flex tw-items-center tw-gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-info tw-w-5 tw-h-5 tw-text-blue-500 tw-flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              <div className="tw-text-sm tw-text-gray-600">
                <span>
                  Your stripe account is not connected to collect
                  payments.&nbsp;
                  <a
                    href="#"
                    className="tw-text-blue-600 hover:tw-text-blue-800 tw-font-medium"
                  >
                    Click to Connect!
                  </a>{" "}
                </span>
              </div>
            </div>
          </div>
        )}
        <div>
          <div className="tw-flex tw-items-center tw-space-x-4">
            <Target className="tw-w-8 tw-h-8 tw-text-primary" />
            <div>
              <div className="tw-flex tw-items-center tw-space-x-3">
                <h1 className="tw-text-2xl tw-font-semibold tw-text-gray-900">
                  {title}
                </h1>
                <span
                  className={`tw-px-2.5 tw-py-0.5 tw-text-sm tw-font-medium tw-rounded-full ${
                    status === "Draft"
                      ? "tw-bg-gray-100 tw-text-gray-800"
                      : "tw-bg-green-100 tw-text-green-800"
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="tw-mt-2 tw-space-y-2">
            <div className="tw-flex tw-items-center tw-space-x-6 tw-text-sm tw-text-gray-500">
              <div className="tw-flex tw-items-center">
                <Calendar className="tw-w-4 tw-h-4 tw-mr-1" />
                <span>{date}</span>
              </div>
              <div className="tw-flex tw-items-center">
                <Users className="tw-w-4 tw-h-4 tw-mr-1" />
                <span>{audience?.join(", ")}</span>
              </div>
            </div>
            <div className="tw-flex tw-items-start tw-justify-between ">
              <p className="tw-text-sm tw-text-gray-600 tw-max-w-2xl">
                {objective}
              </p>
              <button
                onClick={() => setIsDetailsOpen(true)}
                className="tw-mb-3 tw-flex tw-items-center tw-px-2 tw-py-1 tw-text-sm tw-text-primary hover:tw-text-primary-dark"
              >
                <span className="tw-mr-1">Show More</span>
                <ChevronDown className="tw-w-4 tw-h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <CampaignDrawer
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title="Campaign Details"
        description={objective || ""}
        dueDate=""
        type="details"
        initialData={{
          title: "Campaign Details",
          type: "campaign",
          campaignName: title,
          status: status,
          budget: budget,
          createdAt: date,
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
                  value: platform?.join(", "),
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
        }}
      />
    </div>
  );
}
