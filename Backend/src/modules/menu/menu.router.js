import { Router } from "express";
import * as controller from "./menu.controller.js";
const router = Router();

// routes/menu.routes.js
router.get("/", controller.getMenu);
router.post("/", controller.addMenuItem);
router.patch("/:id", controller.updateMenuItem);
router.delete("/:id", controller.deleteMenuItem);

export default router;
