import { pool } from "../../config/db.js";

export const createStudent = async (data) => {
  const {
    user_id,
    program_id,
    enrollment_no,
    admission_year
  } = data;

  await pool.query(
    `INSERT INTO students(user_id, program_id, enrollment_no, admission_year)
     VALUES($1,$2,$3,$4)`,
    [user_id, program_id, enrollment_no, admission_year]
  );
};

export const getStudents = async () => {
  const result = await pool.query(
    `SELECT s.*, u.username, p.name AS program
     FROM students s
     JOIN users u ON s.user_id = u.id
     JOIN programs p ON s.program_id = p.id
     ORDER BY enrollment_no`
  );
  return result.rows;
};
