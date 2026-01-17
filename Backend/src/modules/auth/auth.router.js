import { Router } from "express";
import * as controller from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { auth } from "../../middlewares/authMiddleWare.js";
import { loginSchema } from "../../validation/auth.validation.js";
import { validate } from "../../middlewares/validate.js";

const router = Router();

router.post("/register", asyncHandler(controller.register));

router.post("/login", validate(loginSchema), asyncHandler(controller.login));

router.post("/refresh", asyncHandler(controller.refresh));

export default router;
