import { Router } from "express";
import gradeController from "../controllers/gradeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createGradeSchema, updateGradeSchema } from "../validators/gradeValidator.js";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("admin", "professor"), gradeController.getAll);
router.get("/student/:student_id", authMiddleware, roleMiddleware("admin", "professor", "aluno"), gradeController.getByStudent);
router.get("/:id", authMiddleware, roleMiddleware("admin", "professor"), gradeController.getById);
router.post("/", authMiddleware, roleMiddleware("admin", "professor"), validate(createGradeSchema), gradeController.create);
router.put("/:id", authMiddleware, roleMiddleware("admin", "professor"), validate(updateGradeSchema), gradeController.update);
router.delete("/:id", authMiddleware, roleMiddleware("admin", "professor"), gradeController.delete);

export default router;
