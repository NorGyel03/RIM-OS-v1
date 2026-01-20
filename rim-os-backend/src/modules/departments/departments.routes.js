import express from "express";
import { listDepartments } from "./departments.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authenticateUser,
  authorizeRole("admin"),
  listDepartments
);

export default router;
