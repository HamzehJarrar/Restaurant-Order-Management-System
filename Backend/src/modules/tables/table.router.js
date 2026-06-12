import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { validate } from "../../middlewares/validate.js";
import * as V from "../../validation/table.validation.js";
import * as controller from "./table.controller.js";
import { auth } from "../../middlewares/authMiddleWare.js";
import { authorizeRole } from "../../middlewares/authorizeRole.js";

const router = Router();

router.get("/", auth, asyncHandler(controller.getAllTables));

router.post(
  "/",
  auth, authorizeRole("admin"),
  validate(V.createTableSchema),
  asyncHandler(controller.createTable)
);

router.patch(
  "/:id/free",
  auth,
  validate(V.freeTableSchema),
  asyncHandler(controller.freeTable)
);

export default router;
