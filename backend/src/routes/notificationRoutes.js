import { Router } from "express";
import notificationController from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, notificationController.getMyNotifications);
router.put("/read", authMiddleware, notificationController.markAsRead);
router.put("/:id/read", authMiddleware, notificationController.markOneAsRead);

export default router;