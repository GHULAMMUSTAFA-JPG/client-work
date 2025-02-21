import React, { useState } from "react";
import {
  X,
  DollarSign,
  Calendar,
  Clock,
  AlertCircle,
  Download,
  Filter,
  ChevronDown,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  campaignName: string;
  amount: number;
  status: "pending" | "processing" | "completed";
  postDetails?: {
    title: string;
    type: string;
    agreedAmount: number;
    paidAmount: number;
    status: string;
  };
}

interface EarningsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName: string;
  totalEarnings: number;
  pendingPayments: number;
  receivedPayments: number;
  nextPayoutDate: string;
  transactions: Transaction[];
}

export function EarningsDrawer({
  isOpen,
  onClose,
  campaignName,
  totalEarnings,
  pendingPayments,
  receivedPayments,
  nextPayoutDate,
  transactions,
}: EarningsDrawerProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    Transaction["status"] | "all"
  >("all");
  if (!isOpen) return null;
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return "tw-text-yellow-700 tw-bg-yellow-50 tw-border-yellow-200";
      case "processing":
        return "tw-text-blue-700 tw-bg-blue-50 tw-border-blue-200";
      case "completed":
        return "tw-text-green-700 tw-bg-green-50 tw-border-green-200";
    }
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="tw-w-4 tw-h-4 tw-text-yellow-500" />;
      case "processing":
        return <AlertCircle className="tw-w-4 tw-h-4 tw-text-blue-500" />;
      case "completed":
        return <DollarSign className="tw-w-4 tw-h-4 tw-text-green-500" />;
    }
  };

  const PaymentBreakdownModal = () => {
    if (!showBreakdown || !selectedTransaction) return null;

    return (
      <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-50">
        <div className="tw-bg-white tw-rounded-lg tw-p-6 tw-max-w-md tw-w-full tw-mx-4">
          <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
            <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">
              Payment Breakdown
            </h3>
            <button
              onClick={() => {
                setShowBreakdown(false);
                setSelectedTransaction(null);
              }}
              className="tw-text-gray-400 hover:tw-text-gray-500"
            >
              <span className="tw-sr-only">Close</span>×
            </button>
          </div>

          <div className="tw-space-y-4">
            <div className="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
              <h4 className="tw-font-medium tw-text-gray-900 tw-mb-2">
                {selectedTransaction.postDetails?.title}
              </h4>
              <div className="tw-space-y-2">
                <div className="tw-flex tw-justify-between tw-text-sm">
                  <span className="tw-text-gray-600">Agreed Amount:</span>
                  <span className="tw-font-medium tw-text-gray-900">
                    $
                    {selectedTransaction.postDetails?.agreedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="tw-flex tw-justify-between tw-text-sm">
                  <span className="tw-text-gray-600">Paid Amount:</span>
                  <span className="tw-font-medium tw-text-green-600">
                    $
                    {selectedTransaction.postDetails?.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div className="tw-flex tw-justify-between tw-text-sm">
                  <span className="tw-text-gray-600">Status:</span>
                  <span
                    className={`tw-font-medium ${getStatusColor(
                      selectedTransaction.status
                    )}`}
                  >
                    {selectedTransaction.postDetails?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setShowBreakdown(false);
              setSelectedTransaction(null);
            }}
            className="tw-mt-4 tw-w-full tw-inline-flex tw-justify-center tw-items-center tw-px-4 tw-py-2 tw-border tw-border-transparent tw-text-sm tw-font-medium tw-rounded-md tw-text-white tw-bg-primary hover:tw-bg-primary-dark focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      statusFilter === "all" || transaction.status === statusFilter
  );

  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-overflow-hidden">
      <div
        className="tw-absolute tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity"
        onClick={onClose}
      />

      <div className="tw-fixed tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full tw-pl-10">
        <div className="tw-w-screen tw-max-w-2xl">
          <div className="tw-flex tw-h-full tw-flex-col tw-bg-white tw-shadow-xl">
            <div className="tw-px-6 tw-py-6 tw-border-b tw-border-gray-200">
              <div className="tw-flex tw-items-center tw-justify-between">
                <h2 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                  Earnings Dashboard for {campaignName}
                </h2>
                <button
                  onClick={onClose}
                  className="tw-rounded-md tw-text-gray-400 hover:tw-text-gray-500"
                >
                  <X className="tw-h-6 tw-w-6" />
                </button>
              </div>
            </div>

            <div className="tw-flex-1 tw-overflow-y-auto">
              <div className="tw-p-6">
                {/* Summary Cards */}
                <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-8">
                  <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-gray-200">
                    <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-2">
                      <DollarSign className="tw-w-5 tw-h-5 tw-text-green-500" />
                      <span className="tw-text-sm tw-text-gray-600">
                        Total Campaign Budget
                      </span>
                    </div>
                    <span className="tw-text-2xl tw-font-bold tw-text-gray-900">
                      ${totalEarnings.toLocaleString()}
                    </span>
                  </div>

                  <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-gray-200">
                    <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-2">
                      <DollarSign className="tw-w-5 tw-h-5 tw-text-blue-500" />
                      <span className="tw-text-sm tw-text-gray-600">
                        Received Payments
                      </span>
                    </div>
                    <span className="tw-text-2xl tw-font-bold tw-text-gray-900">
                      ${receivedPayments.toLocaleString()}
                    </span>
                  </div>

                  <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-gray-200">
                    <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-2">
                      <Clock className="tw-w-5 tw-h-5 tw-text-yellow-500" />
                      <span className="tw-text-sm tw-text-gray-600">
                        Pending Payments
                      </span>
                    </div>
                    <span className="tw-text-2xl tw-font-bold tw-text-gray-900">
                      ${pendingPayments.toLocaleString()}
                    </span>
                  </div>

                  <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-gray-200">
                    <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-2">
                      <Calendar className="tw-w-5 tw-h-5 tw-text-blue-500" />
                      <span className="tw-text-sm tw-text-gray-600">
                        Next Payout
                      </span>
                    </div>
                    <span className="tw-text-lg tw-font-semibold tw-text-gray-900">
                      {nextPayoutDate}
                    </span>
                  </div>
                </div>

                {/* Transactions Section */}
                <div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-200">
                  <div className="tw-p-4 tw-border-b tw-border-gray-200">
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <h3 className="tw-text-lg tw-font-medium tw-text-gray-900">
                        Transaction History
                      </h3>
                      <div className="tw-flex tw-items-center tw-space-x-2">
                        <select
                          value={statusFilter}
                          onChange={(e) =>
                            setStatusFilter(
                              e.target.value as Transaction["status"] | "all"
                            )
                          }
                          className="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-text-sm tw-font-medium tw-rounded-md tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                        >
                          <option value="all">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button className="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-text-sm tw-font-medium tw-rounded-md tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50">
                          <Download className="tw-w-4 tw-h-4 tw-mr-1" />
                          Export
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="tw-overflow-x-auto">
                    <table className="tw-min-w-full tw-divide-y tw-divide-gray-200">
                      <thead className="tw-bg-gray-50">
                        <tr>
                          <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
                            Date
                          </th>
                          <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
                            Post
                          </th>
                          <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
                            Amount
                          </th>
                          <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
                            Status
                          </th>
                          <th className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="tw-bg-white tw-divide-y tw-divide-gray-200">
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-900">
                              {transaction.date}
                            </td>
                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-900">
                              {transaction.postDetails?.title ||
                                transaction.campaignName}
                            </td>
                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900">
                              ${transaction.amount.toLocaleString()}
                            </td>
                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                              <div
                                className={`tw-inline-flex tw-items-center tw-px-2.5 tw-py-0.5 tw-rounded-full tw-text-xs tw-font-medium tw-border ${getStatusColor(
                                  transaction.status
                                )}`}
                              >
                                {getStatusIcon(transaction.status)}
                                <span className="tw-ml-1 tw-capitalize">
                                  {transaction.status}
                                </span>
                              </div>
                            </td>
                            <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-500">
                              <button
                                onClick={() => {
                                  setSelectedTransaction(transaction);
                                  setShowBreakdown(true);
                                }}
                                className="tw-text-primary hover:tw-text-primary-dark tw-font-medium"
                              >
                                View Breakdown
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentBreakdownModal />
    </div>
  );
}
