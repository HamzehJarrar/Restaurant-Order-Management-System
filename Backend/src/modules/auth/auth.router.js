import { Router } from "express";
import * as controller from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { registerValidator } from "../../validation/user/userRegister.validator.js";
import { loginValidator } from "../../validation/user/userLogin.validator.js";

const router = Router();

router.post("/register", registerValidator, asyncHandler(controller.register));

router.post("/login", loginValidator, asyncHandler(controller.login));

export default router;
