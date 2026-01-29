import { createFaculty, getFaculty } from "./faculty.service.js";
import { pool } from "../../config/db.js";
import * as facultyService from "./faculty.service.js";

export const addFaculty = async (req, res) => {
  await createFaculty(req.body);
  res.status(201).json({ message: "Faculty created" });
};

export const listFaculty = async (req, res) => {
  res.json(await getFaculty());
};

export const getMyCourses = async (req, res) => {
  try {
    // ADMIN → see all courses
    if (req.user.role === "admin") {
      const { rows } = await pool.query(
        `
        SELECT id, code, title, semester
        FROM courses
        ORDER BY code
        `
      );
      return res.json(rows);
    }

    // FACULTY → see only assigned courses
    const { rows } = await pool.query(
      `
      SELECT c.id, c.code, c.title, c.semester
      FROM faculty f
      JOIN programs p ON p.department_id = f.department_id
      JOIN courses c ON c.program_id = p.id
      WHERE f.user_id = $1
      `,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error("getMyCourses error:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};


export const getStudentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const { rows } = await pool.query(
      `
      SELECT DISTINCT
        s.id AS student_id,
        u.username
      FROM enrollments e
      JOIN students s ON s.id = e.student_id
      JOIN users u ON u.id = s.user_id
      JOIN courses c ON c.id = $1
      `,
      [courseId]
    );

    res.json(rows);
  } catch (err) {
    console.error("getStudentsByCourse error:", err);
    res.status(500).json({ message: "Failed to load students" });
  }
};



export const getMyFacultyHeader = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await facultyService.getFacultyHeaderByUserId(userId);
    res.json(data);
  } catch (err) {
    console.error("❌ getMyFacultyHeader:", err);
    res.status(500).json({ message: "Failed to load faculty header" });
  }
};
