import express from "express";
import { addStudent, listStudents } from "./students.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { getMyAttendance } from "./students.controller.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "registrar"),
  addStudent
);

router.get(
  "/",
  authenticateUser,
  authorizeRoles("admin", "registrar", "hod"),
  listStudents
);

router.get(
  "/attendance",
  authenticateUser,
  getMyAttendance
);


export default router;
