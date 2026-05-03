import { Router } from "express";
import enrollmentController from "../controllers/enrollmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("admin", "professor"), enrollmentController.getAll);
router.get("/minhas", authMiddleware, roleMiddleware("professor"), enrollmentController.getMyEnrollments);
router.get("/aluno", authMiddleware, roleMiddleware("aluno"), enrollmentController.getMyEnrollmentsAluno);
router.get(
  "/class/:classId",
  authMiddleware,
  roleMiddleware("professor"),
  enrollmentController.getStudentsByClass
);
router.get("/:id", authMiddleware, roleMiddleware("admin", "professor"), enrollmentController.getById);
router.post("/", authMiddleware, roleMiddleware("admin"), enrollmentController.create);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), enrollmentController.delete);

export default router;