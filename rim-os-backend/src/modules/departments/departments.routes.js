import express from "express";
import { addDepartment, listDepartments } from "./departments.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "registrar"),
  addDepartment
);

router.get(
  "/",
  authenticateUser,
  listDepartments
);

export default router;
