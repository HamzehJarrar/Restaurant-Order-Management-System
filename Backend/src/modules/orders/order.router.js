import { Router } from "express";
import * as controller from "./order.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.post("/", asyncHandler(controller.createOrder));
router.get("/table/:tableId", asyncHandler(controller.getTableOrder));
router.patch("/:id", asyncHandler(controller.updateOrder));
router.patch("/:id/status", asyncHandler(controller.updateStatus));

export default router;
