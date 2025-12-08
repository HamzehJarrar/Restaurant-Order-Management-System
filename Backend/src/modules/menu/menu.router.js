import { Router } from "express";
import * as controller from "./menu.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import {addMenuItemValidator} from "../../validation/menuValidation/addItem.validator.js";
import {updateMenuItemValidator} from "../../validation/menuValidation/updateItem.validator.js";

const router = Router();

router.post("/add", addMenuItemValidator, asyncHandler(controller.addMenuItem));

router.get("/", asyncHandler(controller.getAllMenuItems));

router.patch("/:id", updateMenuItemValidator, asyncHandler(controller.updateMenuItem));

router.delete("/:id", asyncHandler(controller.deleteMenuItem));

export default router;
