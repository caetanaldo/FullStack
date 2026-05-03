import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect } from "./src/database/SqlConnection.js";
import authRoutes from "./src/routes/authRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import classRoutes from "./src/routes/classRoutes.js";
import enrollmentRoutes from "./src/routes/enrollmentRoutes.js";
import gradeRoutes from "./src/routes/gradeRoutes.js";
import professorRoutes from "./src/routes/professorRoutes.js";
import { seedAdmin } from "./src/database/Seed.js";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import userRoutes from "./src/routes/userRoutes.js";
import "./src/models/GradeHistory.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);
app.use("/grades", gradeRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/professors", professorRoutes);
app.use("/users", userRoutes);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  await connect();
  await seedAdmin();
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

export default app;
