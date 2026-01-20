import * as adminService from "./admin.service.js";
import { createProgram as createProgramService } from "./admin.service.js";



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

