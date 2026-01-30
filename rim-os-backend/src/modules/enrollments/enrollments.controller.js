import { pool } from "../../config/db.js";
import { enrollStudent, getStudentEnrollments} from "./enrollments.service.js";

import * as service from "./enrollments.service.js";


export const getStudentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const students = await service.getStudentsByCourse(courseId);

    res.json(students);
  } catch (err) {
    console.error(" Get students by course failed:", err);
    res.status(500).json({ message: "Failed to load students" });
  }
};





export const enroll = async (req, res) => {
  const userId = req.user.id;

  const student = await pool.query(
    "SELECT id FROM students WHERE user_id = $1",
    [userId]
  );

  if (!student.rows.length) {
    return res.status(400).json({ message: "Student profile not found" });
  }

  const student_id = student.rows[0].id;
  const { offering_id } = req.body;

  await enrollStudent(student_id, offering_id);
  res.status(201).json({ message: "Enrollment successful" });
};

export const myEnrollments = async (req, res) => {
  const student = await pool.query(
    "SELECT id FROM students WHERE user_id = $1",
    [req.user.id]
  );

  res.json(await getStudentEnrollments(student.rows[0].id));
};
