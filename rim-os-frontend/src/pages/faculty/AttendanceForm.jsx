import { useEffect, useState } from "react";
import {
  getMyCourses,
  getStudentsByCourse,
  markAttendance,
} from "../../api/faculty.api";

const AttendanceForm = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("present");
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD COURSES
  ========================= */
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getMyCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };
    loadCourses();
  }, []);

  /* =========================
     LOAD STUDENTS
  ========================= */
  useEffect(() => {
    if (!courseId) {
      setStudents([]);
      setStudentId("");
      return;
    }

    const loadStudents = async () => {
      try {
        const data = await getStudentsByCourse(courseId);
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students", err);
      }
    };

    loadStudents();
  }, [courseId]);

  /* =========================
     SUBMIT
  ========================= */
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
    <div className="max-w-xl">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black">
          Mark Attendance
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Select a course and student to record attendance
        </p>
      </div>

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-6 space-y-5"
      >
        {/* COURSE */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Course
          </label>
          <select
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        </div>

        {/* STUDENT */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Student
          </label>
          <select
            className="w-full rounded-lg border border-slate-300 p-2.5 disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Attendance Status
          </label>
          <select
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>

        {/* ACTION */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
