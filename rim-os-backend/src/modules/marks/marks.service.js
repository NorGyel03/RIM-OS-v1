import { pool } from "../../config/db.js";

export const upsertMarks = async ({
  studentId,
  courseId,
  internal,
  final,
  facultyUserId
}) => {
  // Map users → faculty
  const facultyRes = await pool.query(
    `SELECT id FROM faculty WHERE user_id = $1`,
    [facultyUserId]
  );

  if (facultyRes.rowCount === 0) {
    throw new Error("Faculty profile not found");
  }

  const facultyId = facultyRes.rows[0].id;

  const result = await pool.query(
    `
    INSERT INTO marks (student_id, course_id, internal, final, marked_by)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (student_id, course_id)
    DO UPDATE SET
      internal = EXCLUDED.internal,
      final = EXCLUDED.final,
      marked_by = EXCLUDED.marked_by
    RETURNING *
    `,
    [studentId, courseId, internal, final, facultyId]
  );

  return result.rows[0];
};

export const getMarksForStudent = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      c.code,
      c.title,
      m.internal,
      m.final
    FROM marks m
    JOIN students s ON s.id = m.student_id
    JOIN courses c ON c.id = m.course_id
    WHERE s.user_id = $1
    ORDER BY c.code
    `,
    [userId]
  );

  return result.rows;
};
