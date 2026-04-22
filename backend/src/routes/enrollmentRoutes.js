import { Router } from "express";
import enrollmentController from "../controllers/enrollmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("admin", "professor"), enrollmentController.getAll);
router.get("/:id", authMiddleware, roleMiddleware("admin", "professor"), enrollmentController.getById);
router.post("/", authMiddleware, roleMiddleware("admin"), enrollmentController.create);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), enrollmentController.delete);

export default router;