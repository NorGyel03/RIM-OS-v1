import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import departmentRoutes from "./modules/departments/departments.routes.js";
import programRoutes from "./modules/programs/programs.routes.js";
import courseRoutes from "./modules/courses/courses.routes.js";
import studentRoutes from "./modules/students/students.routes.js";
import facultyRoutes from "./modules/faculty/faculty.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);



app.get("/", (req, res) => {
  res.send("RIM-OS Backend Running 🚀");
});

export default app;
