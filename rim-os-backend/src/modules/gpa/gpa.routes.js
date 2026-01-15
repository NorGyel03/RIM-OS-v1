import express from "express";
import { computeFinal } from "./gpa.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/compute",
  authenticateUser,
  authorizeRole("admin"),
  computeFinal
);

export default router;
