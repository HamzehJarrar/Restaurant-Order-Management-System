import { Router } from "express";
import * as controller from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { auth } from "../../middlewares/authMiddleWare.js";
import { authorizeRole } from "../../middlewares/authorizeRole.js";
import { loginSchema, registerSchema } from "../../validation/auth.validation.js";
import { validate } from "../../middlewares/validate.js";

const router = Router();

// First registration creates admin; subsequent ones require admin auth
router.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { countUsers } = await import("./auth.data.js");
    const count = await countUsers();
    if (count === 0) return next(); // first user — allow without auth
    return auth(req, res, () => authorizeRole("admin")(req, res, next));
  }),
  validate(registerSchema),
  asyncHandler(controller.register)
);

router.post("/login", validate(loginSchema), asyncHandler(controller.login));

router.post("/refresh", asyncHandler(controller.refresh));

router.post("/logout", auth, asyncHandler(controller.logout));

export default router;
