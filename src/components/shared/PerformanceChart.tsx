"use client";

import { TimeSeriesData } from "@/@api/analytics";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";

interface ChartDataPoint {
  date: string;
  [key: string]: any;
}

interface DateRange {
  start: Date;
  end: Date;
}

interface TimeframeOption {
  value: string;
  label: string;
}

interface PerformanceChartProps {
  series: {
    dataKey: string;
    name: string;
    color: string;
    yAxisId: string;
    showDot?: boolean;
  }[];
  chartData: TimeSeriesData[];
  title?: string;
  subtitle?: string;
  height?: string | number;
}

const PerformanceChart = ({
  chartData,
  title = "Performance Trends",
  subtitle = "Campaign metrics over time",
  series,
  height = "300px",
}: PerformanceChartProps) => (
  <div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-100 tw-p-6 tw-mb-8">
    <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
      <div>
        <h2 className="tw-text-lg tw-font-semibold">{title}</h2>
        <p className="tw-text-gray-500 tw-text-sm">{subtitle}</p>
      </div>
    </div>
    <div
      className={`tw-h-[${
        typeof height === "number" ? `${height}px` : height
      }]`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis
            yAxisId="left"
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, "auto"]}
            tickFormatter={(value) => `${value.toFixed(2)}%`}
          />
          <RechartsTooltip
            formatter={(value: number, name: string) => {
              if (name.toLowerCase().includes("rate")) {
                return [`${value.toFixed(2)}%`, name];
              }
              return [value.toLocaleString(), name];
            }}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
            labelStyle={{ color: "#666" }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{
              paddingBottom: "20px",
            }}
          />
          {series.map((item) => (
            <Area
              key={item.dataKey.toString()}
              yAxisId={item.yAxisId}
              type="monotone"
              dataKey={item.dataKey.toString()}
              stroke={item.color}
              fill={`${item.color}20`}
              name={item.name}
              dot={item.showDot}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PerformanceChart;
