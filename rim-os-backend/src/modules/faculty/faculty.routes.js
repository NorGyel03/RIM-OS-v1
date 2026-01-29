import express from "express";
import { addFaculty, listFaculty, getMyFacultyHeader } from "./faculty.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { getMyCourses } from "./faculty.controller.js";
import { authorizeRole } from "../../middlewares/role.middleware.js"; 
import { getStudentsByCourse } from "./faculty.controller.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "registrar"),
  addFaculty
);

router.get(
  "/",
  authenticateUser,
  authorizeRoles("admin", "registrar", "hod"),
  listFaculty
);

router.get(
  "/courses",
  authenticateUser,
  authorizeRole("faculty", "admin"),
  getMyCourses
);

router.get(
  "/courses/:courseId/students",
  authenticateUser,
  authorizeRole("faculty", "admin"),
  getStudentsByCourse
);


router.get("/me/header", 
  authenticateUser, 
  getMyFacultyHeader
);

export default router;
