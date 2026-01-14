import express from "express";
import { uploadMarks, myMarks } from "./marks.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRole("faculty"),
  uploadMarks
);

router.get(
  "/me",
  authenticateUser,
  authorizeRole("student"),
  myMarks
);

export default router;
