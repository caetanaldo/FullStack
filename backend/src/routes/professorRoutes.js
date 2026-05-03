import { Router } from "express";
import professorController from "../controllers/professorController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.put("/:id", authMiddleware, roleMiddleware("admin"), professorController.update);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), professorController.delete);

export default router;