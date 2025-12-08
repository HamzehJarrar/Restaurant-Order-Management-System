import * as service from "./analytics.service.js";

// -----------------------------
//  SALES ANALYTICS CONTROLLER
// -----------------------------
export const getSalesAnalytics = async (req, res) => {
  const data = await service.salesAnalytics();

  res.json({
    success: true,
    message: "Sales analytics fetched successfully",
    data,
  });
};

// -----------------------------
//  BEST SELLERS CONTROLLER
// -----------------------------
export const getBestSellers = async (req, res) => {
  const data = await service.bestSellers();

  res.json({
    success: true,
    message: "Best sellers fetched successfully",
    data,
  });
};

// -----------------------------
//  PEAK HOURS CONTROLLER
// -----------------------------
export const getPeakHours = async (req, res) => {
  const data = await service.peakHours();

  res.json({
    success: true,
    message: "Peak hours data fetched successfully",
    data,
  });
};

// -----------------------------
//  AI INSIGHTS CONTROLLER
// -----------------------------
export const getAIInsights = async (req, res) => {
  
  const analyticsData = await service.collectAnalyticsData();

  const insights = await service.generateAIInsights(analyticsData);

  res.json({
    success: true,
    message: "AI insights generated successfully",
    data: insights,
  });
};
