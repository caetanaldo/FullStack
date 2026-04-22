import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect } from "./src/database/SqlConnection.js";
import authRoutes from "./src/routes/authRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import classRoutes from "./src/routes/classRoutes.js";
import enrollmentRoutes from "./src/routes/enrollmentRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;


app.use("/enrollments", enrollmentRoutes);
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);

app.listen(PORT, async () => {
  await connect();
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

export default app;
