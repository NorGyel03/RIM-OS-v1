import express from "express";

/* Controllers */
import {
  createProgram,
  listPrograms,
  createCourse,
  getCourses,
  listStudents,
  enrollStudent,
  createStudent,
  createFaculty,
  getDepartments,
  listFaculty,
  getAllUsers,
  listPendingUsers,
  approveUser,
  deleteUser
} from "./admin.controller.js";


/* Middleware */
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";

const router = express.Router();

/**
 * 🔐 GLOBAL ADMIN PROTECTION
 * All routes below require:
 * - authenticated user
 * - admin role
 */
router.use(authenticateUser, authorizeRole("admin"));

/* =========================
   PROGRAMS
========================= */
router.post("/programs", createProgram);
router.get("/programs", listPrograms);

/* =========================
   COURSES
========================= */
router.post("/courses", createCourse);
router.get("/courses", getCourses);

/* =========================
   STUDENTS
========================= */
router.get("/students", listStudents);
router.post("/students", createStudent);

/* =========================
   FACULTY
========================= */
router.get("/faculty", listFaculty);
router.post("/faculty", createFaculty);

/* =========================
   ENROLLMENTS
========================= */
router.post("/enroll", enrollStudent);

/* =========================
   DEPARTMENTS
========================= */
router.get("/departments", getDepartments);

/* =========================
   USERS & APPROVALS
========================= */
router.get("/users", getAllUsers);
router.get("/pending-users", listPendingUsers);
router.post("/approve-user/:userId", approveUser);
router.delete("/reject-user/:userId",authenticateUser,authorizeRole("admin"),deleteUser
);

export default router;