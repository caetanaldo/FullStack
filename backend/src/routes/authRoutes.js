import { Router } from "express";
import authController from "../controllers/authController.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/authvalidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.post("/register", authMiddleware, roleMiddleware("admin"), validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;
