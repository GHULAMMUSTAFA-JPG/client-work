import { PaymentStatus } from "@/types";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const getStatusBadge = (status: string) => {
  return (
    <span className={`badge ${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

/* const getStatusInfo = (status: "Public" | "Private"): StatusInfo => {
  const statusBadge = getStatusBadge(status);
  
  switch (status) {
    case "Public":
      return {
        color: "text-green-700 bg-green-50 border-green-200",
        icon: <CheckCircle className="w-4 h-4 text-green-500" />,
        label: statusBadge,
      };
    case "Private":
      return {
        color: "text-gray-700 bg-gray-50 border-gray-200", 
        icon: <Clock className="w-4 h-4 text-gray-500" />,
        label: statusBadge,
      };
  }
}; */

const getPaymentStatusInfo = (
  status: PaymentStatus["status"],
  paymentStatus?: PaymentStatus
) => {
  switch (status) {
    case "completed":
      return {
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
        label: "Payment Received",
        color: "approved",
        indicator: "🟢",
      };
    case "processing":
    case "pending_approval":
      return {
        icon: <Clock className="w-5 h-5 text-warning" />,
        label: `Processing, Estimated Date: ${
          paymentStatus?.expectedDate || "TBD"
        }`,
        color: "pending",
        indicator: "🟠",
      };
    case "issue":
      return {
        icon: <AlertCircle className="w-5 h-5 text-danger" />,
        label: "Action Required",
        color: "rejected",
        indicator: "🔴",
        tooltip:
          paymentStatus?.issueDetails ||
          "Please update payment details or contact support.",
      };
    default:
      return {
        icon: <Clock className="w-5 h-5 text-secondary" />,
        label: "Pending",
        color: "draft",
        indicator: "⚪",
      };
  }
};

export { getStatusBadge, getPaymentStatusInfo };
