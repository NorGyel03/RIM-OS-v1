import express from "express";
import { computeFinal, getStudentsForGPA} from "./gpa.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { authorizeRole } from "../../middlewares/role.middleware.js";
import { myGPA } from "./gpa.controller.js";


const router = express.Router();

router.post(
  "/compute",
  authenticateUser,
  authorizeRole("admin"),
  computeFinal
);

router.get(
  "/me",
  authenticateUser,
  authorizeRole("student"),
  myGPA
);

router.get(
  "/course/:courseId/students",
  authenticateUser,
  getStudentsForGPA
);


export default router;
