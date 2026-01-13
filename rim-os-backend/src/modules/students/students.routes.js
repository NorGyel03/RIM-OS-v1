import express from "express";
import { addStudent, listStudents } from "./students.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

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

export default router;
