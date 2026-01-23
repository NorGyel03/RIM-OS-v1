import { createStudent, getStudents } from "./students.service.js";
import { pool } from "../../config/db.js";

export const addStudent = async (req, res) => {
  await createStudent(req.body);
  res.status(201).json({ message: "Student created" });
};

export const listStudents = async (req, res) => {
  res.json(await getStudents());
};


export const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Find student_id
    const studentResult = await pool.query(
      `SELECT id FROM students WHERE user_id = $1`,
      [userId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const studentId = studentResult.rows[0].id;

    // 2️⃣ Fetch attendance
    const result = await pool.query(
      `
      SELECT
        c.id AS course_id,
        c.code,
        c.title,
        a.date,
        a.status
      FROM attendance a
      JOIN courses c ON c.id = a.course_id
      WHERE a.student_id = $1
      ORDER BY c.code, a.date
      `,
      [studentId]
    );

    const courses = {};
    let totalClasses = 0;
    let totalPresent = 0;

    result.rows.forEach((row) => {
      if (!courses[row.course_id]) {
        courses[row.course_id] = {
          course_id: row.course_id,
          code: row.code,
          title: row.title,
          total: 0,
          present: 0,
          records: []   // ✅ IMPORTANT
        };
      }

      courses[row.course_id].total += 1;
      totalClasses += 1;

      if (row.status === "present") {
        courses[row.course_id].present += 1;
        totalPresent += 1;
      }

      courses[row.course_id].records.push({
        date: row.date,
        status: row.status
      });
    });


    // 3️⃣ Calculate percentages
    const courseStats = Object.values(courses).map((c) => ({
      ...c,
      percentage:
        c.total === 0
          ? 0
          : Math.round((c.present / c.total) * 100),
    }));

    const overallPercentage =
      totalClasses === 0
        ? 0
        : Math.round((totalPresent / totalClasses) * 100);

    res.json({
      overallPercentage,
      courses: courseStats,
    });
  } catch (err) {
    console.error("Failed to load attendance stats", err);
    res.status(500).json({ message: "Failed to load attendance stats" });
  }
};
