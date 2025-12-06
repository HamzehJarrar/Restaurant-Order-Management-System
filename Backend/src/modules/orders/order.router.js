import { Router } from "express";
import * as controller from "./order.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { createOrderValidator } from "../../validation/order.validator.js";
const router = Router();

router.post("/", createOrderValidator, asyncHandler(controller.createOrder));

router.get("/", asyncHandler(controller.getOrders));
router.get("/:id", asyncHandler(controller.getOrder));

router.put("/:id", asyncHandler(controller.updateOrder));
router.delete("/:id", asyncHandler(controller.deleteOrder));
router.patch("/:id/status", asyncHandler(controller.updateOrderStatus));

export default router;
