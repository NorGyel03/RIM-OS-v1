import express from "express";
import { addCourse, listCourses } from "./courses.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "registrar"),
  addCourse
);

router.get(
  "/",
  authenticateUser,
  listCourses
);

export default router;
