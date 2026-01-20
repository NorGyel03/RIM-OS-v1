import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes.js";
import programRoutes from "./modules/programs/programs.routes.js";
import courseRoutes from "./modules/courses/courses.routes.js";
import studentRoutes from "./modules/students/students.routes.js";
import facultyRoutes from "./modules/faculty/faculty.routes.js";
import enrollmentRoutes from "./modules/enrollments/enrollments.routes.js";
import attendanceRoutes from "./modules/attendance/attendance.routes.js";
import marksRoutes from "./modules/marks/marks.routes.js";
import gpaRoutes from "./modules/gpa/gpa.routes.js";
import transcriptRoutes from "./modules/transcripts/transcripts.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import departmentRoutes from "./modules/departments/departments.routes.js";





dotenv.config();

const app = express();

/* 🔴 THIS MUST BE BEFORE ROUTES */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/gpa", gpaRoutes);
app.use("/api/transcripts", transcriptRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/departments", departmentRoutes);



app.post("/__test", (req, res) => {
  res.json({
    headers: req.headers,
    body: req.body
  });
});


export default app;
