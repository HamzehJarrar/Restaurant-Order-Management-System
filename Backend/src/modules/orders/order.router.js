import { Router } from "express";
import * as controller from "./order.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { auth } from "../../middlewares/authMiddleWare.js";

const router = Router();

router.use(auth);

router.get("/",                    asyncHandler(controller.getAllOrders));
router.get("/table/:tableId",      asyncHandler(controller.getTableOrder));
router.post("/add-items",          asyncHandler(controller.addItemsToOrder));
router.patch("/:id",               asyncHandler(controller.updateOrder));
router.patch("/:id/status",        asyncHandler(controller.updateStatus));
router.delete("/:id",              asyncHandler(controller.deleteOrder));

export default router;
