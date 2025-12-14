import { Router } from "express";
import * as controller from "./order.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  createOrderValidator,
  addItemValidator,
} from "../../validation/orderValidation/order.validator.js";
import { updateOrderValidator } from "../../validation/orderValidation/updateOrder.validator.js";
import { updateStatusValidator } from "../../validation/orderValidation/updateStatus.validator.js";

const router = Router();

router.post("/",  asyncHandler(controller.createOrder));

router.patch(
  "/:id/add-item",

  asyncHandler(controller.addItemToOrder)
);

router.get("/", asyncHandler(controller.getOrders));
router.get("/:id", asyncHandler(controller.getOrder));
router.put("/:id", updateOrderValidator, asyncHandler(controller.updateOrder));
router.delete("/:id", asyncHandler(controller.deleteOrder));
router.patch(
  "/:id/status",
  updateStatusValidator,
  asyncHandler(controller.updateOrderStatus)
);
router.patch("/:id/pay", asyncHandler(controller.payOrder));

export default router;
