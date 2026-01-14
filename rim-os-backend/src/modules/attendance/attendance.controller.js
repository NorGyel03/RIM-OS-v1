import { markAttendance, getAttendanceForStudent } from "./attendance.service.js";

export const mark = async (req, res) => {
  try {
    const { studentId, courseId, date, status } = req.body;
    const facultyUserId = req.user.id;

    const record = await markAttendance({
      studentId,
      courseId,
      date,
      status,
      facultyUserId
    });

    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};


export const myAttendance = async (req, res) => {
  const data = await getAttendanceForStudent(req.user.id);
  res.json(data);
};
