import { PaymentStatus } from "@/types";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const getStatusBadge = (status: string) => {
  return (
    <span className={`badge ${status}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

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
