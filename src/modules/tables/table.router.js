import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { validate } from "../../middlewares/validate.js";
import * as V from "../../validation/table.validation.js";
import * as controller from "./table.controller.js";

const router = Router();

router.post(
  "/",
  validate(V.createTableSchema),
  asyncHandler(controller.createTable)
);

router.get("/", asyncHandler(controller.getAllTables));

router.patch(
  "/:id/free",
  validate(V.freeTableSchema),
  asyncHandler(controller.freeTable)
);

export default router;
