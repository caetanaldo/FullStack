import { Router } from "express";
import gradeController from "../controllers/gradeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("admin", "professor"), gradeController.getAll);
router.get("/:id", authMiddleware, roleMiddleware("admin", "professor"), gradeController.getById);
router.get("/student/:student_id", authMiddleware, roleMiddleware("admin", "professor", "aluno"), gradeController.getByStudent);
router.post("/", authMiddleware, roleMiddleware("admin", "professor"), gradeController.create);
router.put("/:id", authMiddleware, roleMiddleware("admin", "professor"), gradeController.update);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), gradeController.delete);

export default router;