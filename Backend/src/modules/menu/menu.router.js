import { Router } from "express";
import * as controller from "./menu.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { upload } from "../../middlewares/upload.js";

const router = Router();

// routes/menu.routes.js
router.get("/", asyncHandler(controller.getMenu));
router.post("/", upload.single("image"), asyncHandler(controller.addMenuItem));
router.patch("/:id", upload.single("image"), asyncHandler(controller.updateMenuItem));
router.delete("/:id", asyncHandler(controller.deleteMenuItem));

export default router;
