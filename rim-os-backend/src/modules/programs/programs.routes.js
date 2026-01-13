import express from "express";
import { addProgram, listPrograms } from "./programs.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "registrar"),
  addProgram
);

router.get(
  "/",
  authenticateUser,
  listPrograms
);

export default router;
