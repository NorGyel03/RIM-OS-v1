import express from "express";
import {
  createProgram,
  listPrograms,
  createCourse,
  listStudents,
  enrollStudent,
  getCourses
  
} from "./admin.controller.js";

import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";

import {
  createStudent,
  createFaculty,
} from "./admin.controller.js";

import { getDepartments } from "./admin.controller.js";




const router = express.Router();

router.use(authenticateUser, authorizeRole("admin"));

/* Programs */
router.post("/programs", createProgram);
router.get("/programs", listPrograms);

/* Courses */
router.post("/courses", authenticateUser, createCourse);

router.get(
  "/courses", authenticateUser, getCourses);

/* Students */
router.get("/students", listStudents);

/* Enrollments */
router.post("/enroll", enrollStudent);


router.post(
  "/students",
  authenticateUser,
  authorizeRole("admin"),
  createStudent
);

router.post(
  "/faculty",
  authenticateUser,
  authorizeRole("admin"),
  createFaculty
);

router.get(
  "/departments",
  authenticateUser,
  authorizeRole("admin"),
  getDepartments
);

import { getAllUsers } from "./admin.controller.js";

router.get(
  "/users",
  authenticateUser,
  authorizeRole("admin"),
  getAllUsers
);

export default router;
