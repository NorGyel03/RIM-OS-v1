import express from "express";
import { enroll, myEnrollments } from "./enrollments.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("student"),
  enroll
);

router.get(
  "/my",
  authenticateUser,
  authorizeRoles("student"),
  myEnrollments
);

export default router;
