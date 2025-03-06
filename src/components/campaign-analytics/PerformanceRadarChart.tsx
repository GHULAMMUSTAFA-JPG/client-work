import {
  PolarAngleAxis,
  RadarChart,
  Radar,
  PolarGrid,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RadarDataPoint {
  subject: string;
  A: number;
  B: number;
}

interface PerformanceRadarChartProps {
  data: RadarDataPoint[];
}

const PerformanceRadarChart = ({ data }: PerformanceRadarChartProps) => (
  <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-6">
    <h3 className="tw-text-lg tw-font-semibold tw-mb-6">
      Performance Analysis
    </h3>
    <div className="tw-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="Creator A"
            dataKey="A"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
          />
          <Radar
            name="Creator B"
            dataKey="B"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PerformanceRadarChart;
