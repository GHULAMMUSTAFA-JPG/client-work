import React from "react";
import { DollarSign, Calendar, Clock, AlertCircle } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  campaignName: string;
  amount: number;
  status: "pending" | "processing" | "completed";
}

interface EarningsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  totalEarnings: number;
  pendingPayments: number;
  nextPayoutDate: string;
  transactions: Transaction[];
}

export function EarningsDrawer({
  isOpen,
  onClose,
  totalEarnings,
  pendingPayments,
  nextPayoutDate,
  transactions,
}: EarningsDrawerProps) {
  if (!isOpen) return null;

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return "draft";
      case "processing":
        return "needs_updates";
      case "completed":
        return "approved";
      default:
        return "draft";
    }
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Clock className="draft" style={{ width: "1rem", height: "1rem" }} />
        );
      case "processing":
        return (
          <AlertCircle
            className="needs_updates"
            style={{ width: "1rem", height: "1rem" }}
          />
        );
      case "completed":
        return (
          <DollarSign
            className="approved"
            style={{ width: "1rem", height: "1rem" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="offcanvas-backdrop show" onClick={onClose}></div>
      <div
        className="offcanvas offcanvas-end show"
        style={{ width: "42rem" }}
        tabIndex={-1}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title">Earnings Dashboard</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        <div className="offcanvas-body">
          {/* Summary Cards */}
          <div className="row g-3 mb-4">
            <div className="col-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <DollarSign
                      className="text-primary"
                      style={{ width: "1.25rem", height: "1.25rem" }}
                    />
                    <span className="small text-secondary">Total Earnings</span>
                  </div>
                  <span className="fs-3 fw-bold">
                    ${totalEarnings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Clock
                      className="text-warning"
                      style={{ width: "1.25rem", height: "1.25rem" }}
                    />
                    <span className="small text-secondary">
                      Pending Payments
                    </span>
                  </div>
                  <span className="fs-3 fw-bold">
                    ${pendingPayments.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Calendar
                      className="text-primary"
                      style={{ width: "1.25rem", height: "1.25rem" }}
                    />
                    <span className="small text-secondary">Next Payout</span>
                  </div>
                  <span className="fs-5 fw-semibold">{nextPayoutDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="h5 mb-0 py-2">Transaction History</h3>

            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Campaign</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.campaignName}</td>
                      <td className="fw-medium">
                        ${transaction.amount.toLocaleString()}
                      </td>
                      <td>
                        <div
                          className={`badge d-inline-flex align-items-center gap-1 ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {getStatusIcon(transaction.status)}
                          <span className="text-capitalize">
                            {transaction.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
