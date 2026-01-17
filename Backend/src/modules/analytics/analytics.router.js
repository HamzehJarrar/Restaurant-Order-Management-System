import { Router } from "express";
import * as controller from "./analytics.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { auth } from "../../middlewares/authMiddleWare.js";
import { authorizeRole } from "../../middlewares/authorizeRole.js";

const router = Router();

// Sales Analytics
router.get("/sales", asyncHandler(controller.getSalesAnalytics));

// Best Sellers
router.get("/bestsellers", asyncHandler(controller.getBestSellers));

// Peak Hours
router.get("/peak-hours", asyncHandler(controller.getPeakHours));

// AI Insights
router.post("/ai-insights", asyncHandler(controller.getAIInsights));

export default router;
