import express from "express";
import {
  assign,
  myCourses,
} from "./facultyCourses.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Admin assigns faculty
router.post(
  "/assign",
  authenticateUser,
  authorizeRole("admin"),
  assign
);

// Faculty sees own courses
router.get(
  "/me",
  authenticateUser,
  authorizeRole("faculty"),
  myCourses
);

export default router;
