import express from "express";
import {
  getUserProfile,
  getMyProfile,
  createUserProfile,
  updateUserProfile,
} from "./userProfiles.controller.js";

import { authenticateUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/* 🔐 CURRENT USER */
router.get("/me", authenticateUser, getMyProfile);
router.post("/me", authenticateUser, createUserProfile);
router.put("/me", authenticateUser, updateUserProfile);

/* 👨‍💼 ADMIN / SHARED */
router.get("/:userId", authenticateUser, getUserProfile);

export default router;
