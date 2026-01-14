import express from "express";
import { mark, myAttendance } from "./attendance.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, mark);
router.get("/me", authenticateUser, myAttendance);

export default router;
