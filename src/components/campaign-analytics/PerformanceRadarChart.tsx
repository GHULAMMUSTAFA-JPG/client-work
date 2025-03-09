import {
  PolarAngleAxis,
  RadarChart,
  Radar,
  PolarGrid,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarDataPoint {
  subject: string;
  Current: number;
  Target: number;
  Average: number;
}

interface PerformanceRadarChartProps {
  data: RadarDataPoint[];
}

const PerformanceRadarChart = ({ data }: PerformanceRadarChartProps) => (
  <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-6">
    <h3 className="tw-text-lg tw-font-semibold tw-mb-6">
      Campaign Performance Analysis
    </h3>
    <div className="tw-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#4B5563", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, "auto"]}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Radar
            name="Current"
            dataKey="Current"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
          />
          <Radar
            name="Target"
            dataKey="Target"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.6}
          />
          <Radar
            name="Average"
            dataKey="Average"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.6}
          />
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PerformanceRadarChart;
