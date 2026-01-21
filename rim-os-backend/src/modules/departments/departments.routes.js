import express from "express";
import { create, list } from "./departments.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(authenticateUser);
router.use(authorizeRole("admin"));

router.post("/", create);
router.get("/", list);

export default router;
