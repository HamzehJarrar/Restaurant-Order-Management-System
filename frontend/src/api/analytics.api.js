import {
  salesAnalytics,
  bestSellers,
  peakHours,
  aiInsights,
} from "../data/analytics.data";

export const getSalesAnalytics = async () => ({
  data: { data: salesAnalytics },
});

export const getBestSellers = async () => ({
  data: { data: bestSellers },
});

export const getPeakHours = async () => ({
  data: { data: peakHours },
});

export const getAIInsights = async () => ({
  data: { data: aiInsights },
});
