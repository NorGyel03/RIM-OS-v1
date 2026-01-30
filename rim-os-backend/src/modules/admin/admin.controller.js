import * as adminService from "./admin.service.js";
import { createProgram as createProgramService } from "./admin.service.js";
import { pool } from "../../config/db.js";


/* ---------- PROGRAMS ---------- */


export const createProgram = async (req, res) => {
  try {
    const program = await createProgramService(req.body);
    res.status(201).json(program);
  } catch (err) {
    console.error("CREATE PROGRAM ERROR:", err.message);
    res.status(400).json({ message: err.message });
  }
};


export const listPrograms = async (req, res) => {
  const programs = await adminService.getPrograms();
  res.json(programs);
};

/* ---------- COURSES ---------- */

export const createCourse = async (req, res) => {
  try {
    const course = await adminService.createCourse(req.body);
    res.status(201).json(course);
  } catch (err) {
    console.error("CREATE COURSE ERROR:", err.message);
    res.status(400).json({ message: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await adminService.getAllCourses();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};



export const listCourses = async (req, res) => {
  const courses = await adminService.getCourses();
  res.json(courses);
};

/* ---------- STUDENTS ---------- */
export const listStudents = async (req, res) => {
  const students = await adminService.getStudents();
  res.json(students);
};

/* ---------- ENROLLMENTS ---------- */
export const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const enrollment = await adminService.enrollStudent(studentId, courseId);
    res.status(201).json(enrollment);
  } catch (err) {
    // 🔑 UNIQUE constraint violation
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ message: "Student is already enrolled in this course" });
    }

    console.error(err);
    res.status(500).json({ message: "Failed to enroll student" });
  }
};

/*------------CREATE STUDENT USERS------------*/
import bcrypt from "bcrypt";

export const createStudent = async (req, res) => {
  const { username, password, programId, admissionYear } = req.body;

  if (!username || !password || !programId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const userRes = await pool.query(
      `
      INSERT INTO users (username, password, role)
      VALUES ($1, $2, 'student')
      RETURNING id
      `,
      [username, hashed]
    );

    const userId = userRes.rows[0].id;

    await pool.query(
      `
      INSERT INTO students (
        user_id,
        program_id,
        enrollment_no,
        admission_year,
        status
      )
      VALUES ($1, $2, $3, $4, 'active')
      `,
      [
        userId,
        programId,
        `RIM${admissionYear || 2025}-${userId.slice(0, 4)}`,
        admissionYear || 2025
      ]
    );

    res.status(201).json({ message: "Student created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create student" });
  }
};



/*----------------CREATE FACULTY USERS ----------------*/
export const createFaculty = async (req, res) => {
  const { username, password, departmentId, designation } = req.body;

  if (!username || !password || !departmentId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const hashed = await bcrypt.hash(password, 10);

    const userRes = await client.query(
      `
      INSERT INTO users (username, password, role)
      VALUES ($1, $2, 'faculty')
      RETURNING id
      `,
      [username, hashed]
    );

    const userId = userRes.rows[0].id;

    await client.query(
      `
      INSERT INTO faculty (user_id, department_id, designation)
      VALUES ($1, $2, $3)
      `,
      [userId, departmentId, designation || null]
    );

    await client.query("COMMIT");

    res.status(201).json({ message: "Faculty created successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);

    if (err.code === "23505") {
      return res
        .status(409)
        .json({ message: "Username already exists" });
    }

    res.status(500).json({ message: "Failed to create faculty" });
  } finally {
    client.release();
  }
};


export const getDepartments = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name FROM departments ORDER BY name"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, username, role FROM users ORDER BY username`
    );
    res.json(rows);
  } catch (err) {
    console.error("Get users failed:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


export const listFaculty = async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        f.id,
        u.username,
        f.designation
      FROM faculty f
      JOIN users u ON u.id = f.user_id
      ORDER BY u.username
      `
    );

    res.json(rows);
  } catch (err) {
    console.error("List faculty failed:", err);
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
};

export const listPendingUsers = async (req, res) => {
  const { rows } = await pool.query(
    `
    SELECT id, username, role, created_at
    FROM users
    WHERE is_active = false
    ORDER BY created_at
    `
  );
  res.json(rows);
};


export const approveUser = async (req, res) => {
  const { userId } = req.params;

  await pool.query(
    `
    UPDATE users
    SET is_active = true
    WHERE id = $1
    `,
    [userId]
  );

  res.json({ message: "User approved" });
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Safety: only delete inactive users
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1 AND is_active = false
      RETURNING id
      `,
      [userId]
    );

    if (result.rowCount === 0) {
      return res
        .status(400)
        .json({ message: "User not found or already active" });
    }

    res.json({ message: "User rejected and deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};


/* =========================
   GET USERS WITHOUT PROFILE
========================= */
export const getUnassignedUsers = async (req, res) => {
  try {
    const users = await adminService.getUnassignedUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load users" });
  }
};

/* =========================
   CREATE STUDENT PROFILE
========================= */
export const createStudentProfile = async (req, res) => {
  console.log("🔥 createStudentProfile CONTROLLER HIT");

  const { userId, programId, enrollmentNo, admissionYear } = req.body;

  if (!userId || !programId || !enrollmentNo || !admissionYear) {
    return res.status(400).json({
      message: "Missing fields",
      received: req.body,
    });
  }

  try {
    await adminService.createStudentProfile({
      userId,
      programId,
      enrollmentNo,
      admissionYear,
    });

    res.json({ message: "Student profile created" });
  } catch (err) {
  console.error("❌ FULL DB ERROR:", err);

  return res.status(500).json({
    message: err.message,
    code: err.code,
    detail: err.detail,
    constraint: err.constraint,
  });
}

};


/* =========================
   CREATE FACULTY PROFILE
========================= */
export const createFacultyProfile = async (req, res) => {
  try {
    const { userId, departmentId, designation } = req.body;

    if (!userId || !departmentId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await adminService.createFacultyProfile({
      userId,
      departmentId,
      designation,
    });

    res.json({ message: "Faculty profile created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create faculty profile" });
  }
};


export const getAdminStudents = async (req, res) => {
  const students = await adminService.getStudents();
  res.json(students);
};

export const getStudents = async (req, res) => {
  const students = await adminService.getAdminStudents();
  res.json(students);
};

export const getUserStatuses = async (req, res) => {
  const users = await adminService.getUserProfileStatus();
  res.json(users);
};


export const activateUser = async (req, res) => {
  const { userId } = req.params;

  await pool.query(
    `UPDATE users SET is_active = true WHERE id = $1`,
    [userId]
  );

  res.json({ message: "User activated successfully" });
};

export const listUsersForAdmin = async (req, res) => {
  const result = await pool.query(`
    SELECT id, username, role, is_active
    FROM users
    ORDER BY created_at DESC
  `);

  res.json(result.rows);
};

