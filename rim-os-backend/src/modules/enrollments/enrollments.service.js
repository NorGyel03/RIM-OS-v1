import { pool } from "../../config/db.js";

export const enrollStudent = async (student_id, offering_id) => {
  await pool.query(
    `INSERT INTO enrollments(student_id, offering_id)
     VALUES ($1,$2)`,
    [student_id, offering_id]
  );
};

export const getStudentEnrollments = async (student_id) => {
  const result = await pool.query(
    `SELECT e.id, c.title, co.academic_year, co.semester
     FROM enrollments e
     JOIN course_offerings co ON e.offering_id = co.id
     JOIN courses c ON co.course_id = c.id
     WHERE e.student_id = $1`,
    [student_id]
  );
  return result.rows;
};
