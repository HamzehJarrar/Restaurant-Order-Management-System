import { Router } from "express";
import * as controller from "./user.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { registerValidator, loginValidator } from "./user.validator.js";

const router = Router();

router.post("/register", registerValidator, asyncHandler(controller.register));

router.post("/login", loginValidator, asyncHandler(controller.login));

export default router;
