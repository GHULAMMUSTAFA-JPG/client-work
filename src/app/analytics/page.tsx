import EmptyState from "@/components/EmptyState";
import React from "react";

const AnalyticsPage = () => {
  return (
    <div className="container-fluid my-5">
      <div className="d-flex justify-content-between  mb-3">
        <div>
          <h1 className="h4 mb-0">Analytics</h1>
          <span className="text-danger">● Status: Needs Connection</span>
        </div>
        <button className="btn btn-outline-primary btn-sm">
          <i className="bi bi-download me-2"></i>Install Limelight Chrome
          Extension
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Content</th>
                <th>Tracked Metrics</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center py-5" colSpan={100}>
                  <EmptyState
                    icon="bi bi-bar-chart-line"
                    title="No Analytics Data Available"
                    description="We couldn't find any data to display at the moment."
                    buttonLink="/analytics"
                    iconSize={64}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
