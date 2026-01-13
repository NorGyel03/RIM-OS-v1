import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes.js";
import departmentRoutes from "./modules/departments/departments.routes.js";
import programRoutes from "./modules/programs/programs.routes.js";
import courseRoutes from "./modules/courses/courses.routes.js";
import studentRoutes from "./modules/students/students.routes.js";
import facultyRoutes from "./modules/faculty/faculty.routes.js";
import offeringRoutes from "./modules/courseOfferings/courseOfferings.routes.js";
import enrollmentRoutes from "./modules/enrollments/enrollments.routes.js";


dotenv.config();

const app = express();

/* 🔴 THIS MUST BE BEFORE ROUTES */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/course-offerings", offeringRoutes);
app.use("/api/enrollments", enrollmentRoutes);

app.post("/__test", (req, res) => {
  res.json({
    headers: req.headers,
    body: req.body
  });
});


export default app;
