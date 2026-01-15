import express from "express";
import { addFaculty, listFaculty } from "./faculty.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { getMyCourses } from "./faculty.controller.js";
import { authorizeRole } from "../../middlewares/role.middleware.js"; 

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
  authorizeRole("faculty"),
  getMyCourses
);

export default router;
