export const salesAnalytics = {
  todaySales: 4520,
  weekSales: 28740,
  monthSales: 112350,
  itemsProfit: [
    { _id: "Ribeye Steak", totalRevenue: 14250, totalSold: 150 },
    { _id: "Margherita Pizza", totalRevenue: 12150, totalSold: 270 },
    { _id: "Beef Burger", totalRevenue: 10340, totalSold: 210 },
    { _id: "Tiramisu", totalRevenue: 6240, totalSold: 190 }
  ]
};

export const bestSellers = [
  { _id: "Margherita Pizza", totalSold: 270, revenue: 12150 },
  { _id: "Beef Burger", totalSold: 210, revenue: 10340 },
  { _id: "Iced Coffee", totalSold: 205, revenue: 3690 },
  { _id: "Tiramisu", totalSold: 190, revenue: 6240 },
  { _id: "Chicken Alfredo", totalSold: 165, revenue: 9570 }
];

export const peakHours = {
  peakHours: [
    { _id: { hour: 13 }, orders: 48 },
    { _id: { hour: 19 }, orders: 62 },
    { _id: { hour: 20 }, orders: 58 }
  ],
  dailyPattern: [
    { _id: { day: 1 }, orders: 120 },
    { _id: { day: 2 }, orders: 135 },
    { _id: { day: 3 }, orders: 140 },
    { _id: { day: 4 }, orders: 155 },
    { _id: { day: 5 }, orders: 180 },
    { _id: { day: 6 }, orders: 210 },
    { _id: { day: 7 }, orders: 195 }
  ],
  weeklyPattern: [
    { _id: { week: 12 }, orders: 980 },
    { _id: { week: 13 }, orders: 1030 },
    { _id: { week: 14 }, orders: 1110 }
  ]
};

export const aiInsights = `- Peak demand is between 7:00–9:00 PM. Staff accordingly for dinner rush.
- Top sellers: Margherita Pizza and Beef Burger. Keep ingredients stocked.
- Consider bundling Iced Coffee with desserts to increase average ticket size.
- Prep extra Ribeye Steak portions on weekends for higher sales volume.`;
