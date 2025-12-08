import { Router } from "express";
import * as controller from "./analytics.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { auth } from "../../middlewares/authMiddleWare.js";
import { authorizeRole } from "../../middlewares/authorizeRole.js";

const router = Router();

// Sales Analytics
router.get("/sales", auth, authorizeRole("admin"), asyncHandler(controller.getSalesAnalytics));

// Best Sellers
router.get("/bestsellers", auth, authorizeRole("admin"), asyncHandler(controller.getBestSellers));

// Peak Hours
router.get("/peak-hours", auth, authorizeRole("admin"), asyncHandler(controller.getPeakHours));

// AI Insights
router.post("/ai-insights", auth, authorizeRole("admin"), asyncHandler(controller.getAIInsights));

export default router;
