import { pool } from "../../config/db.js";

/* ---------- PROGRAMS ---------- */
export const createProgram = async (data) => {
  const { name, departmentId, level, durationYears } = data;

  if (!name || !departmentId || !level || !durationYears) {
    throw new Error("Missing required fields");
  }

  const { rows } = await pool.query(
    `
    INSERT INTO programs (name, department_id, level, duration_years)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [name, departmentId, level, durationYears]
  );

  return rows[0];
};

export const getPrograms = async () => {
  const { rows } = await pool.query(
    `SELECT id, name FROM programs ORDER BY name`
  );
  return rows;
};

/* ---------- COURSES ---------- */

export const createCourse = async ({
  programId,
  code,
  title,
  credit,
  semester
}) => {
  if (!programId || !code || !title || !credit || !semester) {
    throw new Error("All fields are required");
  }

  const existing = await pool.query(
    `
    SELECT id FROM courses
    WHERE program_id = $1 AND code = $2
    `,
    [programId, code]
  );

  if (existing.rowCount > 0) {
    throw new Error("Course already exists in this program");
  }

  const { rows } = await pool.query(
    `
    INSERT INTO courses (program_id, code, title, credit, semester)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [programId, code, title, credit, semester]
  );

  return rows[0];
};

export const getAllCourses = async () => {
  const { rows } = await pool.query(
    `
    SELECT
      c.id,
      c.code,
      c.title,
      c.credit,
      c.semester,
      p.name AS program_name,
      p.level
    FROM courses c
    JOIN programs p ON p.id = c.program_id
    ORDER BY p.name, c.semester
    `
  );

  return rows;
};


/* ---------- STUDENTS ---------- */
export const getStudents = async () => {
  const { rows } = await pool.query(
    `
    SELECT s.id, u.username
    FROM students s
    JOIN users u ON u.id = s.user_id
    ORDER BY u.username
    `
  );
  return rows;
};

/* ---------- ENROLLMENTS ---------- */
export const enrollStudent = async (studentId, courseId) => {
  const { rows } = await pool.query(
    `
    INSERT INTO enrollments (student_id, course_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [studentId, courseId]
  );
  return rows[0];
};
