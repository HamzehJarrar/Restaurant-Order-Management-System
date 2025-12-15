import { Router } from "express";
import * as controller from "./table.controller.js";

const router = Router();

router.get("/", controller.getAllTables);
router.post("/", controller.createTable);
router.get("/:id", controller.getTableById);

export default router;
