import { Router } from "express";
import * as controller from "./menu.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { upload } from "../../middlewares/upload.js";
import { auth } from "../../middlewares/authMiddleWare.js";

const router = Router();

// routes/menu.routes.js
router.get("/", auth , asyncHandler(controller.getMenu));
router.post("/", auth, upload.single("image"), asyncHandler(controller.addMenuItem));
router.get("/:id", auth, asyncHandler(controller.getMenuItemById));
router.patch("/:id", auth, upload.single("image"), asyncHandler(controller.updateMenuItem));
router.delete("/:id", auth, asyncHandler(controller.deleteMenuItem));


export default router;
