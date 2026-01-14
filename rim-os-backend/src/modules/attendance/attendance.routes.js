import express from "express";
import { mark, myAttendance } from "./attendance.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authenticateUser,authorizeRole("faculty"), mark);
router.get("/me", authenticateUser, authorizeRole("student"), myAttendance);

export default router;
