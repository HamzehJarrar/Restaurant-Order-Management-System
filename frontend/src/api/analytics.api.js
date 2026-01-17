import { api } from "./axios";

export const getSalesAnalytics = async () => {
  return await api.get("/analytics/sales");
};
export const getBestSellers = async () => {
  return await api.get("/analytics/bestsellers");
};
export const getPeakHours = async () => {
  return await api.get("/analytics/peak-hours");
};
export const getAIInsights = async () => {
  return await api.post("/analytics/ai-insights");
};
