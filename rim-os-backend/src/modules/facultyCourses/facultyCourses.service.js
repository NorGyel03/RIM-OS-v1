import { pool } from "../../config/db.js";

export const assignFacultyToCourse = async ({
  facultyId,
  courseId,
}) => {
  const { rows } = await pool.query(
    `
    INSERT INTO faculty_courses (faculty_id, course_id)
    VALUES ($1, $2)
    ON CONFLICT (faculty_id, course_id) DO NOTHING
    RETURNING *
    `,
    [facultyId, courseId]
  );

  return rows[0];
};

export const getFacultyCourses = async (facultyUserId) => {
  const { rows } = await pool.query(
    `
    SELECT
      c.id,
      c.code,
      c.title,
      c.semester
    FROM faculty_courses fc
    JOIN faculty f ON f.id = fc.faculty_id
    JOIN courses c ON c.id = fc.course_id
    WHERE f.user_id = $1
    ORDER BY c.semester, c.code
    `,
    [facultyUserId]
  );

  return rows;
};
