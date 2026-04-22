import { Router } from "express";
import studentController from "../controllers/studentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.use(authMiddleware)

router.get("/", roleMiddleware("admin", "professor"), studentController.getAll);
router.get("/:id", roleMiddleware("admin", "professor"), studentController.getById);
router.put("/:id", roleMiddleware("admin"), studentController.update);
router.delete("/:id", roleMiddleware("admin"), studentController.delete);

export default router;