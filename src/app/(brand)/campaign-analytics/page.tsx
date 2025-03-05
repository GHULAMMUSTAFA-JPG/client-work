"use client";
import React, { Suspense, useState } from "react";
import { Search, Filter, Plus, TrendingUp, TrendingDown } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Link from "next/link";
import { campaignsData, performanceData } from "./mockupData";
import Loader from "@/components/loader";
import { withAuthRole } from "@/utils/withAuthRole";

function AllCampaigns() {
  const [timeframe, setTimeframe] = useState("This Year");

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <header className="tw-bg-white tw-border-b tw-border-gray-200 tw-px-6 tw-py-4">
        <div className=" tw-mx-auto">
          <h1 className="tw-text-2xl tw-font-bold">Campaign Management</h1>
        </div>
      </header>

      <main className=" tw-mx-auto tw-px-6 tw-py-8">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-8">
          <div className="tw-relative">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="tw-pl-10 tw-pr-4 tw-py-2 tw-border tw-border-gray-200 tw-rounded-lg tw-w-64"
            />
            <Search className="tw-w-5 tw-h-5 tw-text-gray-400 tw-absolute tw-left-3 tw-top-2.5" />
          </div>
          <div className="tw-flex tw-items-center tw-gap-4">
            <button className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-text-gray-600 hover:tw-bg-gray-50 tw-rounded-lg tw-border tw-border-gray-200">
              <Filter className="tw-w-4 tw-h-4 tw-mr-2" />
              Filters
            </button>
            <button className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-bg-gray-900 tw-text-white tw-rounded-lg hover:tw-bg-gray-800">
              <Plus className="tw-w-4 tw-h-4 tw-mr-2" />
              New Campaign
            </button>
          </div>
        </div>

        {/* Overall Performance Chart */}
        <div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-100 tw-p-6 tw-mb-8">
          <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
            <div>
              <h2 className="tw-text-lg tw-font-semibold">
                Overall Performance
              </h2>
              <p className="tw-text-gray-500 tw-text-sm">
                Campaign metrics across all active campaigns
              </p>
            </div>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="tw-border tw-border-gray-200 tw-rounded-lg tw-px-3 tw-py-2"
            >
              <option>This Year</option>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <div className="tw-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="impressions"
                  stroke="#3b82f6"
                  fill="#3b82f620"
                  name="Impressions"
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#10b981"
                  fill="#10b98120"
                  name="Engagement"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-100 tw-overflow-hidden">
          <table className="tw-w-full">
            <thead>
              <tr className="tw-bg-gray-50">
                <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                  Campaign Name
                </th>
                <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                  Status
                </th>
                <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                  Budget
                </th>
                <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                  Spent
                </th>
                <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                  Impressions
                </th>
                <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                  Engagement
                </th>
                <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {campaignsData.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="tw-border-t tw-border-gray-100 hover:tw-bg-gray-50"
                >
                  <td className="tw-px-6 tw-py-4">
                    <Link
                      href={`/campaign-analytics/${campaign.id}`}
                      className="tw-text-blue-600 hover:tw-text-blue-800"
                    >
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="tw-px-6 tw-py-4">
                    <span
                      className={`tw-inline-flex tw-items-center tw-px-2.5 tw-py-0.5 tw-rounded-full tw-text-xs tw-font-medium ${
                        campaign.status === "Active"
                          ? "tw-bg-green-100 tw-text-green-800"
                          : "tw-bg-yellow-100 tw-text-yellow-800"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="tw-px-6 tw-py-4">
                    ${campaign.budget.toLocaleString()}
                  </td>
                  <td className="tw-px-6 tw-py-4">
                    ${campaign.spent.toLocaleString()}
                  </td>
                  <td className="tw-px-6 tw-py-4">
                    {campaign.impressions.toLocaleString()}
                  </td>
                  <td className="tw-px-6 tw-py-4">{campaign.engagement}</td>
                  <td className="tw-px-6 tw-py-4">
                    <div className="tw-flex tw-items-center tw-text-sm">
                      {parseFloat(campaign.trend) > 0 ? (
                        <TrendingUp className="tw-w-4 tw-h-4 tw-text-green-500 tw-mr-1" />
                      ) : (
                        <TrendingDown className="tw-w-4 tw-h-4 tw-text-gray-400 tw-mr-1" />
                      )}
                      {campaign.trend}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function AuthPageWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <AllCampaigns />
    </Suspense>
  );
}

export default withAuthRole({
  Component: AuthPageWrapper,
  allowedRoles: ["buyer"],
});
