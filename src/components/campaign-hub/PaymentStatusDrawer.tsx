import React, { useEffect, useState } from "react";
import {
  X,
  DollarSign,
  Calendar,
  CreditCard,
  Clock,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Download,
} from "lucide-react";
import { apiController } from "@/@api/baseUrl";
import { useAuth } from "@/contexts/AuthContext";

interface PaymentStatus {
  status: "pending" | "processing" | "completed" | "failed";
  amount: number;
  dueDate: string;
  paymentMethod: string;
  transactionId: string;
  failureReason?: string;
}

interface PaymentStatusDrawerProps {
  onClose: () => void;
  postId: string;
  campaignId: string;
  creatorId: string;
  status: PaymentStatus;
}

export function PaymentStatusDrawer({
  onClose,
  postId,
  campaignId,
  creatorId,
  status,
}: PaymentStatusDrawerProps) {
  const { user } = useAuth();
  const [charges_enabled, setcharges_enabled] = useState(null);
  const [onboarding_status, setonboarding_status] = useState(null);
  const [checksloading, setchecksloading] = useState(false);
  const [campaignstatus, setcampaignstatus] = useState<any>(null);
  console.log("campaignId", campaignId);
  const handleViewStripeDashboard = async () => {
    try {
      const response = await apiController.get(
        `/payments/${user?.uuid}/generate-customer-portal`
      );
      console.log("responsevd", response);
      if (response.status === 200) {
        window.open(response.data.url, "_blank");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchAccountStatus = async () => {
      try {
        setchecksloading(true);
        const response = await apiController.get(
          `/payments/${user?.uuid}/account-status`
        );
        console.log("status", response);
        if (response.status === 200) {
          setcharges_enabled(response.data.charges_enabled);
          setonboarding_status(response.data.onboarding_status);
          setchecksloading(false);
        }
      } catch (error) {
        setchecksloading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchAccountStatus();
  }, []);
  useEffect(() => {
    const fetchPostPaymentStatus = async () => {
      try {
        setchecksloading(true);
        const response = await apiController.get(
          `/creators/campaigns/campaign-post-payment-status?creator_id=${creatorId}&campaign_id=${campaignId}&post_id=${postId}`
        );
        console.log("statusreeeee", response);
        if (response.status === 200) {
          setcampaignstatus(response.data);
          setchecksloading(false);
        }
      } catch (error) {
        setchecksloading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchPostPaymentStatus();
  }, []);
  const getStatusInfo = () => {
    switch (status.status) {
      case "completed":
        return {
          icon: <CheckCircle className="tw-w-5 tw-h-5 tw-text-green-500" />,
          label: "Payment Completed",
          color: "tw-text-green-700 tw-bg-green-50 tw-border-green-200",
          description: "Payment has been processed and confirmed",
        };
      case "processing":
        return {
          icon: <Clock className="tw-w-5 tw-h-5 tw-text-blue-500" />,
          label: "Payment Processing",
          color: "tw-text-blue-700 tw-bg-blue-50 tw-border-blue-200",
          description: "Payment is being processed and will be completed soon",
        };
      case "pending":
        return {
          icon: <Clock className="tw-w-5 tw-h-5 tw-text-yellow-500" />,
          label: "Payment Pending",
          color: "tw-text-yellow-700 tw-bg-yellow-50 tw-border-yellow-200",
          description: "Payment is scheduled and waiting to be processed",
        };
      case "failed":
        return {
          icon: <AlertCircle className="tw-w-5 tw-h-5 tw-text-red-500" />,
          label: "Payment Failed",
          color: "tw-text-red-700 tw-bg-red-50 tw-border-red-200",
          description:
            status.failureReason || "There was an issue processing the payment",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-overflow-hidden">
      <div
        className="tw-absolute tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity"
        onClick={onClose}
      />

      <div className="tw-fixed tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full tw-pl-10">
        <div className="tw-w-screen tw-max-w-md">
          <div className="tw-flex tw-h-full tw-flex-col tw-bg-white tw-shadow-xl">
            <div className="tw-px-6 tw-py-6 tw-border-b tw-border-gray-200">
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-flex tw-items-center tw-space-x-3">
                  <DollarSign className="tw-w-6 tw-h-6 tw-text-green-600" />
                  <h2 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                    Payment Status
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="tw-rounded-md tw-text-gray-400 hover:tw-text-gray-500"
                >
                  <X className="tw-h-6 tw-w-6" />
                </button>
              </div>
            </div>

            <div className="tw-flex-1 tw-overflow-y-auto">
              <div className="tw-p-6 tw-space-y-6">
                {/* Status Card */}
                {campaignstatus?.Payment_Status == 10 ? (
                  <div
                    className={`tw-p-4 tw-rounded-lg tw-text-green-700 tw-bg-green-50 tw-border-green-200`}
                  >
                    <div className="tw-flex tw-items-start">
                      <CheckCircle className="tw-w-5 tw-h-5 tw-text-green-500" />
                      <div className="tw-ml-3">
                        <h3 className="tw-text-sm tw-font-medium">
                          Payment Completed
                        </h3>
                        <p className="tw-mt-1 tw-text-sm">
                          Payment has been processed and confirmed
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`tw-p-4 tw-rounded-lg ${statusInfo.color}`}>
                    <div className="tw-flex tw-items-start">
                      {statusInfo.icon}
                      <div className="tw-ml-3">
                        <h3 className="tw-text-sm tw-font-medium">
                          {statusInfo.label}
                        </h3>
                        <p className="tw-mt-1 tw-text-sm">
                          {statusInfo.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {charges_enabled === false && onboarding_status === false && (
                  <div
                    className={`tw-p-4 tw-rounded-lg tw-text-red-700 tw-bg-red-50 tw-border-red-200`}
                  >
                    <div className="tw-flex tw-items-start">
                      {statusInfo.icon}
                      <div className="tw-ml-3">
                        <h3 className="tw-text-sm tw-font-medium">
                          Stripe needs to be connected
                        </h3>
                        <p className="tw-mt-1 tw-text-sm">
                          Visit settings to connect your Stripe account
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* Payment Details */}
                <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-space-y-4">
                  <h3 className="tw-text-sm tw-font-medium tw-text-gray-900">
                    Payment Details
                  </h3>

                  <div className="tw-space-y-3">
                    <div className="tw-flex tw-justify-between tw-items-center">
                      <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                        <DollarSign className="tw-w-4 tw-h-4 tw-mr-2" />
                        Amount
                      </div>
                      <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                        ${campaignstatus?.Budget}
                      </span>
                    </div>

                    <div className="tw-flex tw-justify-between tw-items-center">
                      <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                        <Calendar className="tw-w-4 tw-h-4 tw-mr-2" />
                        Due Date
                      </div>
                      <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                        {campaignstatus?.Due_Date}
                      </span>
                    </div>

                    <div className="tw-flex tw-justify-between tw-items-center">
                      <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                        <CreditCard className="tw-w-4 tw-h-4 tw-mr-2" />
                        Payment Method
                      </div>
                      <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                        Stripe Account
                      </span>
                    </div>

                    <div className="tw-flex tw-justify-between tw-items-center">
                      <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                        <Clock className="tw-w-4 tw-h-4 tw-mr-2" />
                        Transaction ID
                      </div>
                      <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                        {campaignstatus?.Transaction_ID
                          ? campaignstatus?.Transaction_ID
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="tw-space-y-3">
                  <a
                    href="#"
                    className="tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                  >
                    <Download className="tw-w-4 tw-h-4 tw-mr-2" />
                    Download Invoice
                  </a>

                  <div
                    style={{ cursor: "pointer" }}
                    // href="https://stripe.com/dashboard"
                    // target="_blank"
                    onClick={handleViewStripeDashboard}
                    rel="noopener noreferrer"
                    className="tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                  >
                    <ExternalLink className="tw-w-4 tw-h-4 tw-mr-2" />
                    View in Stripe Dashboard
                  </div>
                </div>

                {/* Support Note */}
                <div className="tw-bg-blue-50 tw-rounded-lg tw-p-4">
                  <div className="tw-flex">
                    <AlertCircle className="tw-h-5 tw-w-5 tw-text-blue-400 tw-mt-0.5 tw-mr-2" />
                    <div>
                      <h4 className="tw-text-sm tw-font-medium tw-text-blue-800">
                        Need Help?
                      </h4>
                      <p className="tw-mt-1 tw-text-sm tw-text-blue-700">
                        If you have any questions about your payment, please
                        contact our support team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tw-px-6 tw-py-4 tw-border-t tw-border-gray-200">
              <button
                onClick={onClose}
                className="tw-w-full tw-flex tw-justify-center tw-items-center tw-px-4 tw-py-2 tw-border tw-border-transparent tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium tw-text-white tw-bg-primary hover:tw-bg-primary-dark focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
