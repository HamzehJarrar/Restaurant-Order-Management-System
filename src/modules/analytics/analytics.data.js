import { OrderModel } from "../../../database/models/Order.model.js";

// -----------------------------
//  TODAY SALES
// -----------------------------
export const getTodaySales = async () => {
  const today = new Date();
  const start = new Date(today.setHours(0, 0, 0, 0));
  const end = new Date(today.setHours(23, 59, 59, 999));

  const result = await OrderModel.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
      },
    },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  return result[0]?.total || 0;
};

// -----------------------------
//  WEEK SALES
// -----------------------------
export const getWeekSales = async () => {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  const result = await OrderModel.aggregate([
    {
      $match: {
        createdAt: { $gte: weekStart },
      },
    },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  return result[0]?.total || 0;
};

// -----------------------------
//  MONTH SALES
// -----------------------------
export const getMonthSales = async () => {
  const monthStart = new Date();
  monthStart.setDate(1);

  const result = await OrderModel.aggregate([
    {
      $match: {
        createdAt: { $gte: monthStart },
      },
    },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  return result[0]?.total || 0;
};

// -----------------------------
//  ITEMS PROFIT
// -----------------------------
export const getItemsProfit = async () => {
  return await OrderModel.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.name",
        totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
        totalSold: { $sum: "$items.quantity" },
      },
    },
    { $sort: { totalRevenue: -1 } },
  ]);
};

// -----------------------------
//  BEST SELLERS
// -----------------------------
export const getBestSellers = async () => {
  return await OrderModel.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.name",
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
  ]);
};

// -----------------------------
//  PEAK HOURS
// -----------------------------
export const getPeakHoursData = async () => {
  const peakHours = await OrderModel.aggregate([
    {
      $group: {
        _id: { hour: { $hour: "$createdAt" } },
        orders: { $sum: 1 },
      },
    },
    { $sort: { orders: -1 } },
  ]);

  const dailyPattern = await OrderModel.aggregate([
    {
      $group: {
        _id: { day: { $dayOfWeek: "$createdAt" } },
        orders: { $sum: 1 },
      },
    },
    { $sort: { "_id.day": 1 } },
  ]);

  const weeklyPattern = await OrderModel.aggregate([
    {
      $group: {
        _id: { week: { $week: "$createdAt" } },
        orders: { $sum: 1 },
      },
    },
  ]);

  return { peakHours, dailyPattern, weeklyPattern };
};
