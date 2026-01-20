import { useEffect, useState } from "react";
import {
  getAdminStudents,
  getAdminCourses,
  enrollStudent,
} from "../../api/admin.api";

const Enrollments = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAdminStudents().then(setStudents);
    getAdminCourses().then(setCourses);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!studentId || !courseId) {
      setMessage("Student and course are required");
      return;
    }

    try {
      setLoading(true);
      await enrollStudent({ studentId, courseId });
      setMessage("Student enrolled successfully ✅");
      setStudentId("");
      setCourseId("");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to enroll student";
      setMessage(msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Enroll Student</h2>

      {message && (
        <div className="mb-3 text-sm text-blue-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        {/* Student */}
        <select
          className="border p-2 w-full"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.username}
            </option>
          ))}
        </select>

        {/* Course */}
        <select
          className="border p-2 w-full"
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Enrolling..." : "Enroll"}
        </button>
      </form>
    </div>
  );
};

export default Enrollments;
