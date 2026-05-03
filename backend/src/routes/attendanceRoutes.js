import { Router } from "express";
import attendanceController from "../controllers/attendanceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("admin", "professor"), attendanceController.getByClass);
router.post("/", authMiddleware, roleMiddleware("admin", "professor"), attendanceController.save);
router.get("/student", authMiddleware, roleMiddleware("admin", "professor", "aluno"), attendanceController.getByStudent);

export default router;