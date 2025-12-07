import { Router } from "express";
import * as controller from "./order.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { createOrderValidator } from "../../validation/orderValidation/order.validator.js";
import { updateOrderValidator } from "../../validation/orderValidation/updateOrder.validator.js";
import { updateStatusValidator } from "../../validation/orderValidation/updateStatus.validator.js";
const router = Router();

router.post("/", createOrderValidator, asyncHandler(controller.createOrder));
router.get("/", asyncHandler(controller.getOrders));
router.get("/:id", asyncHandler(controller.getOrder));
router.put("/:id", updateOrderValidator, asyncHandler(controller.updateOrder));
router.delete("/:id", asyncHandler(controller.deleteOrder));
router.patch("/:id/status", updateStatusValidator, asyncHandler(controller.updateOrderStatus));

export default router;
