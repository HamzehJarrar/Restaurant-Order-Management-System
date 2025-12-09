import { Router } from "express";
import * as controller from "./table.controller.js";

const router = Router();

router.get("/", controller.getTables);
router.post("/", controller.createTable);
router.patch("/:number/assign", controller.assignTable);
router.patch("/:number/free", controller.freeTable);

export default router;
