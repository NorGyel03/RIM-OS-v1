import { pool } from "../../config/db.js";

export const createOffering = async (data) => {
  const { course_id, faculty_id, academic_year, semester } = data;

  await pool.query(
    `INSERT INTO course_offerings
     (course_id, faculty_id, academic_year, semester)
     VALUES ($1,$2,$3,$4)`,
    [course_id, faculty_id, academic_year, semester]
  );
};

export const getOfferings = async () => {
  const result = await pool.query(
    `SELECT co.*, c.title AS course, u.username AS faculty
     FROM course_offerings co
     JOIN courses c ON co.course_id = c.id
     JOIN faculty f ON co.faculty_id = f.id
     JOIN users u ON f.user_id = u.id
     ORDER BY academic_year, semester`
  );
  return result.rows;
};
