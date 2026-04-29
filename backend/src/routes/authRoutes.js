import { Router } from "express";
import authController from "../controllers/authController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

// Aberto: qualquer um pode fazer login
router.post("/login", validate(loginSchema), authController.login);

// Protegido: só admin pode criar contas
router.post(
  "/register",
  authMiddleware,
  roleMiddleware("admin"),
  validate(registerSchema),
  authController.register
);

export default router;