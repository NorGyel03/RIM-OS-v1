import express from "express";
import { computeFinal } from "./gpa.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";
import { myGPA } from "./gpa.controller.js";

const router = express.Router();

router.post(
  "/compute",
  authenticateUser,
  authorizeRole("faculty"),
  computeFinal
);

export default router;

router.get("/me", authenticateUser, authorizeRole("student"), myGPA);
