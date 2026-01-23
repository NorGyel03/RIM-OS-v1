import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "./userProfiles.controller.js";

const router = express.Router();

/* ADMIN-ONLY */
router.post("/", createProfile);
router.get("/:userId", getProfile);
router.put("/:userId", updateProfile);

export default router;
