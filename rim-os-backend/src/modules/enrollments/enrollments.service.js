import { pool } from "../../config/db.js";

/* ============================
   MANUAL ENROLL
============================ */
export const enrollStudent = async (student_id, offering_id) => {
  await pool.query(
    `
    INSERT INTO enrollments(student_id, offering_id, status)
    VALUES ($1, $2, 'enrolled')
    ON CONFLICT DO NOTHING
    `,
    [student_id, offering_id]
  );
};

/* ============================
   GET STUDENT ENROLLMENTS
============================ */
export const getStudentEnrollments = async (student_id) => {
  const result = await pool.query(
    `
    SELECT e.id, c.title, co.academic_year, co.semester
    FROM enrollments e
    JOIN course_offerings co ON e.offering_id = co.id
    JOIN courses c ON co.course_id = c.id
    WHERE e.student_id = $1
    `,
    [student_id]
  );
  return result.rows;
};

/* ============================
   AUTO ENROLL (REAL ENGINE)
============================ */
export const autoEnrollStudent = async (
  student_id,
  program_id,
  semester,
  academic_year
) => {
  const offerings = await pool.query(
    `
    SELECT co.id
    FROM course_offerings co
    JOIN courses c ON co.course_id = c.id
    WHERE c.program_id = $1
      AND co.semester = $2
      AND co.academic_year = $3
      AND co.capacity > 0
    `,
    [program_id, semester, academic_year]
  );

  for (const row of offerings.rows) {
    await pool.query(
      `
      INSERT INTO enrollments(student_id, offering_id, status)
      VALUES ($1, $2, 'enrolled')
      ON CONFLICT DO NOTHING
      `,
      [student_id, row.id]
    );

    await pool.query(
      `UPDATE course_offerings SET capacity = capacity - 1 WHERE id = $1`,
      [row.id]
    );
  }
};

export const getStudentsByCourse = async (courseId) => {
  const result = await pool.query(
    `
    SELECT
      s.id AS student_id,
      s.enrollment_no,
      u.username
    FROM enrollments e
    JOIN students s ON e.student_id = s.id
    JOIN users u ON s.user_id = u.id
    WHERE e.course_id = $1
      AND e.status = 'enrolled'
    ORDER BY s.enrollment_no
    `,
    [courseId]
  );

  return result.rows;
};


