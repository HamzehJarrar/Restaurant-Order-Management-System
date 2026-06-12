import { Router } from "express";
import * as controller from "./menu.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { upload } from "../../middlewares/upload.js";
import { auth } from "../../middlewares/authMiddleWare.js";
import { authorizeRole } from "../../middlewares/authorizeRole.js";

const router = Router();

const adminOnly = [auth, authorizeRole("admin")];

router.get("/",    auth, asyncHandler(controller.getMenu));
router.get("/:id", auth, asyncHandler(controller.getMenuItemById));

router.post("/",   ...adminOnly, upload.single("image"), asyncHandler(controller.addMenuItem));
router.patch("/:id", ...adminOnly, upload.single("image"), asyncHandler(controller.updateMenuItem));
router.delete("/:id", ...adminOnly, asyncHandler(controller.deleteMenuItem));

export default router;
