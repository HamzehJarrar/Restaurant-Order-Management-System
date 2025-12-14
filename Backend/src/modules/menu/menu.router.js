import { Router } from "express";
import * as controller from "./menu.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { addMenuItemValidator } from "../../validation/menuValidation/addItem.validator.js";
import { updateMenuItemValidator } from "../../validation/menuValidation/updateItem.validator.js";
import { auth } from "../../middlewares/authMiddleWare.js";
import { authorizeRole } from "../../middlewares/authorizeRole.js";

const router = Router();

router.post(
  "/add",
  addMenuItemValidator,
  asyncHandler(controller.addMenuItem)
);

router.get("/", asyncHandler(controller.getAllMenuItems));

router.patch(
  "/:id",
  auth,
  authorizeRole("admin"),
  updateMenuItemValidator,
  asyncHandler(controller.updateMenuItem)
);

router.delete(
  "/:id",
  auth,
  authorizeRole("admin"),
  asyncHandler(controller.deleteMenuItem)
);

export default router;
