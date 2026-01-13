import express from "express";
import { addOffering, listOfferings } from "./courseOfferings.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "registrar", "hod"),
  addOffering
);

router.get(
  "/",
  authenticateUser,
  listOfferings
);

export default router;
