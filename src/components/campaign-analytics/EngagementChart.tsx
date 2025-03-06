import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface EngagementChartProps {
  data: any[];
}

const EngagementChart = ({ data }: EngagementChartProps) => (
  <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-6">
    <h3 className="tw-text-lg tw-font-semibold tw-mb-6">Engagement Trend</h3>
    <div className="tw-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="impressions"
            name="Impressions"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#colorImpressions)"
          />
          <Area
            type="monotone"
            dataKey="engagement"
            name="Engagement"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#colorEngagement)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default EngagementChart;
