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



/* =========================
   USERS WITHOUT PROFILE
========================= */
export const getUnassignedUsers = async () => {
  const result = await pool.query(`
    SELECT id, username
    FROM users
    WHERE id NOT IN (SELECT user_id FROM students)
      AND id NOT IN (SELECT user_id FROM faculty)
  `);

  return result.rows;
};

/* =========================
   CREATE STUDENT PROFILE
========================= */
export const createStudentProfile = async ({
  userId,
  programId,
  enrollmentNo,
  admissionYear,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Insert student profile
    await client.query(
      `
      INSERT INTO students (user_id, program_id, enrollment_no, admission_year)
      VALUES ($1, $2, $3, $4)
      `,
      [userId, programId, enrollmentNo, admissionYear]
    );

    // 2️⃣ Update user role + activate (ENUM SAFE)
    await client.query(
      `
      UPDATE users
      SET role = $2::user_role,
          is_active = true
      WHERE id = $1
      `,
      [userId, "student"]
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err; // VERY IMPORTANT
  } finally {
    client.release();
  }
};

/* =========================
   CREATE FACULTY PROFILE
========================= */
export const createFacultyProfile = async ({
  userId,
  departmentId,
  designation,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
      INSERT INTO faculty (user_id, department_id, designation)
      VALUES ($1, $2, $3)
      `,
      [userId, departmentId, designation || null]
    );

    await client.query(
      `
      UPDATE users
      SET role = $2::user_role,
          is_active = true
      WHERE id = $1
      `,
      [userId, "faculty"]
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const getAdminStudents = async () => {
  const res = await pool.query(`
    SELECT
      s.id,
      u.id AS user_id,
      u.username,
      s.enrollment_no,
      p.name AS program_name
    FROM students s
    JOIN users u ON u.id = s.user_id
    JOIN programs p ON p.id = s.program_id
    ORDER BY u.username
  `);

  return res.rows;
};

export const getAdminFaculty = async () => {
  const res = await pool.query(`
    SELECT
      f.id,
      u.id AS user_id,
      u.username,
      d.name AS department_name,
      f.designation
    FROM faculty f
    JOIN users u ON u.id = f.user_id
    JOIN departments d ON d.id = f.department_id
    ORDER BY u.username
  `);

  return res.rows;
};

export const getUserProfileStatus = async () => {
  const res = await pool.query(`
    SELECT
      u.id,
      u.username,
      u.role,

      CASE WHEN up.id IS NOT NULL THEN true ELSE false END AS has_profile,
      CASE WHEN s.id IS NOT NULL THEN true ELSE false END AS is_student,
      CASE WHEN f.id IS NOT NULL THEN true ELSE false END AS is_faculty

    FROM users u
    LEFT JOIN user_profiles up ON up.user_id = u.id
    LEFT JOIN students s ON s.user_id = u.id
    LEFT JOIN faculty f ON f.user_id = u.id

    ORDER BY u.username
  `);

  return res.rows;
};
