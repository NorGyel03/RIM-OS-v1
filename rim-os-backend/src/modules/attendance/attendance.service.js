import { pool } from "../../config/db.js";



export const markAttendance = async ({
  studentId,
  courseId,
  date,
  status,
  facultyUserId
}) => {
  // 1️⃣ Resolve faculty.id from user_id
  const facultyRes = await pool.query(
    `
    SELECT id
    FROM faculty
    WHERE user_id = $1
    `,
    [facultyUserId]
  );

  if (facultyRes.rows.length === 0) {
    throw new Error("Faculty record not found");
  }

  const facultyId = facultyRes.rows[0].id;

  // 2️⃣ Insert / update attendance
  const result = await pool.query(
    `
    INSERT INTO attendance (
      student_id,
      course_id,
      date,
      status,
      marked_by
    )
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (student_id, course_id, date)
    DO UPDATE SET
      status = EXCLUDED.status,
      marked_by = EXCLUDED.marked_by
    RETURNING *
    `,
    [studentId, courseId, date, status, facultyId]
  );

  return result.rows[0];
};


export const getAttendanceForStudent = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      c.code,
      c.title,
      a.date,
      a.status
    FROM attendance a
    JOIN students s ON s.id = a.student_id
    JOIN courses c ON c.id = a.course_id
    WHERE s.user_id = $1
    ORDER BY a.date
    `,
    [userId]
  );

  return result.rows;
};

