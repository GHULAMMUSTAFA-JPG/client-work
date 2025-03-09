export interface TimeSeriesData {
  date: string;
  impressions: number;
  engagements: number;
  engagement_rate: number;
  clicks?: number;
  comments?: number;
  shares?: number;
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatTimeSeriesData = (data: TimeSeriesData[]) => {
  return data
    .map((item) => ({
      ...item,
      date: formatDate(item.date),
      engagement_rate: Number((item.engagement_rate * 100).toFixed(2)),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
