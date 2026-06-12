import {
  getTodaySales,
  getWeekSales,
  getMonthSales,
  getItemsProfit,
  getBestSellers,
  getPeakHoursData
} from "./analytics.data.js";

import OpenAI from "openai";

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

export const bestSellers = async () => {
  return await getBestSellers();
};

export const peakHours = async () => {
  return await getPeakHoursData();
};

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
