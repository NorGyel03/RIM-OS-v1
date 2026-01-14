import { pool } from "../../config/db.js";
import { autoEnrollStudent } from "../enrollments/enrollments.service.js";

/* ===========================
   CREATE STUDENT
=========================== */
export const createStudent = async (data) => {
  const {
    user_id,
    program_id,
    enrollment_no,
    admission_year
  } = data;

  // Insert student and RETURN id
  const result = await pool.query(
    `INSERT INTO students(user_id, program_id, enrollment_no, admission_year)
     VALUES($1,$2,$3,$4)
     RETURNING *`,
    [user_id, program_id, enrollment_no, admission_year]
  );

  const student = result.rows[0];

  // 🔥 AUTO ENROLL INTO SEMESTER 1 OFFERINGS
  await autoEnrollStudent(
    student.id,
    student.program_id,
    1,        // semester 1
    2025      // academic year
  );

  return student;
};


/* ===========================
   GET STUDENTS
=========================== */
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
