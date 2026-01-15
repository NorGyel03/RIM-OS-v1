import { createFaculty, getFaculty } from "./faculty.service.js";
import { pool } from "../../config/db.js";

export const addFaculty = async (req, res) => {
  await createFaculty(req.body);
  res.status(201).json({ message: "Faculty created" });
};

export const listFaculty = async (req, res) => {
  res.json(await getFaculty());
};

export const getMyCourses = async (req, res) => {
  try {
    const facultyUserId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        c.id,
        c.code,
        c.title,
        c.semester
      FROM courses c
      JOIN programs p ON p.id = c.program_id
      JOIN faculty f ON f.department_id = p.department_id
      WHERE f.user_id = $1
      ORDER BY c.semester, c.code
      `,
      [facultyUserId]
    );

    console.log("FACULTY COURSES FROM DB:", result.rows);

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error("getMyCourses failed:", err);
    return res.status(500).json({ message: "Failed to load courses" });
  }
};