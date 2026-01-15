import { useEffect, useState } from "react";
import {
  getMyCourses,
  getStudentsByCourse,
  markAttendance,
} from "../../api/faculty.api";

const AttendanceForm = () => {
  console.log("AttendanceForm rendered");

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("present");
  const [loading, setLoading] = useState(false);

  // 🔹 Load faculty courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getMyCourses();
        console.log("FACULTY COURSES:", data);
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };

    loadCourses();
  }, []);

  // 🔹 Load students when course changes
  useEffect(() => {
    if (!courseId) {
      setStudents([]);
      setStudentId("");
      return;
    }

    const loadStudents = async () => {
      try {
        const data = await getStudentsByCourse(courseId);
        console.log("STUDENTS:", data);
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students", err);
      }
    };

    loadStudents();
  }, [courseId]);

  // 🔹 Submit attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId || !studentId) {
      alert("Course and student are required");
      return;
    }

    try {
      setLoading(true);

      await markAttendance({
        studentId,
        courseId,
        date: new Date().toISOString().slice(0, 10),
        status,
      });

      alert("Attendance submitted");

      // optional reset
      setStudentId("");
      setStatus("present");
    } catch (err) {
      console.error("Attendance submit failed:", err);
      alert("Failed to submit attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <h2 className="text-lg font-semibold mb-4">Mark Attendance</h2>

      {/* Course Select */}
      <select
        className="border p-2 w-full mb-3"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.code} — {c.title}
          </option>
        ))}
      </select>

      {/* Student Select */}
      <select
        className="border p-2 w-full mb-3"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        disabled={!courseId}
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s.student_id} value={s.student_id}>
            {s.username}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        className="border p-2 w-full mb-4"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AttendanceForm;
