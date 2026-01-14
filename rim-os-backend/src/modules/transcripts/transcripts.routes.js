import express from "express";
import { myTranscript } from "./transcripts.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";
import { myTranscriptPDF } from "./transcripts.controller.js";  

const router = express.Router();

router.get(
  "/me",
  authenticateUser,
  authorizeRole("student"),
  myTranscript
);

export default router;

router.get(
  "/me/pdf",
  authenticateUser,
  authorizeRole("student"),
  myTranscriptPDF
);
