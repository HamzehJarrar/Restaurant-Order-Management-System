import { Router } from "express";
import * as controller from "./order.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.post("/", controller.createOrder);
router.get("/table/:tableId", controller.getTableOrder);
router.patch("/:id", controller.updateOrder);
router.patch("/:id/status", controller.updateStatus);

export default router;
