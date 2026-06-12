import { Router } from "express";
import * as controller from "./analytics.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { auth } from "../../middlewares/authMiddleWare.js";
import { authorizeRole } from "../../middlewares/authorizeRole.js";

const router = Router();

router.get("/sales", asyncHandler(controller.getSalesAnalytics));

router.get("/bestsellers", asyncHandler(controller.getBestSellers));

router.get("/peak-hours", asyncHandler(controller.getPeakHours));

router.post("/ai-insights", asyncHandler(controller.getAIInsights));

export default router;
