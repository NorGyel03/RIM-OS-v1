import { markAttendance, getAttendanceForStudent } from "./attendance.service.js";
import * as attendanceService from "./attendance.service.js";

export const mark = async (req, res) => {
  try {
    const { studentId, courseId, date, status } = req.body;

    if (!studentId || !courseId || !date || !status) {
      return res.status(400).json({
        message: "studentId, courseId, date, status are required"
      });
    }

    const record = await markAttendance({
      studentId,
      courseId,
      date,
      status,
      facultyUserId: req.user.id // ✅ correct
    });

    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};



export const myAttendance = async (req, res) => {
  const data = await getAttendanceForStudent(req.user.id);
  res.json(data);
};


export const getStudentsForAttendance = async (req, res) => {
  try {
    const { courseId } = req.params;

    const students =
      await attendanceService.getStudentsForCourseAttendance(courseId);

    res.json(students);
  } catch (err) {
    console.error(" Attendance student load error:", err);
    res.status(500).json({ message: "Failed to load students" });
  }
};

export const getStudentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const students = await service.getStudentsByCourse(courseId);
    res.json(students);
  } catch (err) {
    console.error(" Attendance students error:", err);
    res.status(500).json({ message: "Failed to load students" });
  }
};