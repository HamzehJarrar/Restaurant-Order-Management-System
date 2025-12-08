// analytics.service.js
import {
  getTodaySales,
  getWeekSales,
  getMonthSales,
  getItemsProfit,
  getBestSellers,
  getPeakHoursData
} from "./analytics.data.js";

import OpenAI from "openai";

// -----------------------------
// 1) SALES ANALYTICS SERVICE
// -----------------------------
export const salesAnalytics = async () => {
  const todaySales = await getTodaySales();
  const weekSales = await getWeekSales();
  const monthSales = await getMonthSales();
  const itemsProfit = await getItemsProfit();

  return {
    todaySales,
    weekSales,
    monthSales,
    itemsProfit,
  };
};

// -----------------------------
// 2) BEST SELLERS SERVICE
// -----------------------------
export const bestSellers = async () => {
  return await getBestSellers();
};

// -----------------------------
// 3) PEAK HOURS SERVICE
// -----------------------------
export const peakHours = async () => {
  return await getPeakHoursData();
};

// -----------------------------
// 4) COLLECT ALL ANALYTICS FOR AI
// -----------------------------
export const collectAnalyticsData = async () => {
  const sales = await salesAnalytics();
  const bestsellers = await bestSellers();
  const peaks = await peakHours();

  return {
    sales,
    bestsellers,
    peaks,
    inventory: [],
  };
};

// -----------------------------
// 5) AI INSIGHTS SERVICE
// -----------------------------
export const generateAIInsights = async (data) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
        Analyze the following restaurant analytics data:

        ${JSON.stringify(data, null, 2)}

        Provide:
        - operational improvement tips
        - prediction for tomorrow's demand
        - best time to add staff
        - items that require increased production
        `,
      },
    ],
  });

  return response.choices[0].message.content;
};
