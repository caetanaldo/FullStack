import { Router } from "express";
import classController from "../controllers/classController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();
router.use(authMiddleware)

router.get("/", roleMiddleware("admin", "professor", "aluno"), classController.getAll);
router.get("/professores", roleMiddleware("admin"), classController.getProfessores);
router.get("/minhas", authMiddleware, roleMiddleware("professor"), classController.getMyClasses);
router.get("/:id", roleMiddleware("admin", "professor", "aluno"), classController.getById);
router.post("/", roleMiddleware("admin"), classController.create);
router.put("/:id", roleMiddleware("admin"), classController.update);
router.delete("/:id", roleMiddleware("admin"), classController.delete);

export default router;