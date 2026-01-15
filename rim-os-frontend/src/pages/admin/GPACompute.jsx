import { useEffect, useState } from "react";
import api from "../../api/axios";

const GPACompute = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [loading, setLoading] = useState(false);

  // Load courses (reuse an admin-safe endpoint you already have,
  // or temporarily reuse faculty course list if admin endpoint isn’t ready)
  useEffect(() => {
    api.get("/faculty/courses") // TEMP SAFE REUSE
      .then(res => setCourses(res.data))
      .catch(console.error);
  }, []);

  // Load students for selected course
  useEffect(() => {
    if (!courseId) {
      setStudents([]);
      setStudentId("");
      return;
    }

    api.get(`/faculty/courses/${courseId}/students`) // TEMP SAFE REUSE
      .then(res => setStudents(res.data))
      .catch(console.error);
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId || !studentId || !semester || !academicYear) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/gpa/compute", {
        studentId,
        courseId,
        semester: Number(semester),
        academicYear,
      });

      alert("GPA computed successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to compute GPA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Compute GPA</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          className="border p-2 w-full"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>
              {c.code} — {c.title}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          disabled={!courseId}
        >
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.student_id} value={s.student_id}>
              {s.username}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Semester"
          className="border p-2 w-full"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />

        <input
          type="text"
          placeholder="Academic Year (e.g. 2025-2026)"
          className="border p-2 w-full"
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Computing..." : "Compute GPA"}
        </button>
      </form>
    </div>
  );
};

export default GPACompute;
