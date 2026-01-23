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

  useEffect(() => {
    api.get("/faculty/courses")
      .then(res => setCourses(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!courseId) {
      setStudents([]);
      setStudentId("");
      return;
    }

    api.get(`/faculty/courses/${courseId}/students`)
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
      setStudentId("");
      setSemester("");
      setAcademicYear("");
    } catch (err) {
      alert("Failed to compute GPA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Compute GPA
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Final GPA computation for enrolled students
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-slate-900 mb-4">
          GPA Parameters
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* COURSE */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Course
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select course</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* STUDENT */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Student
            </label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={!courseId}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100"
            >
              <option value="">Select student</option>
              {students.map(s => (
                <option key={s.student_id} value={s.student_id}>
                  {s.username}
                </option>
              ))}
            </select>
          </div>

          {/* SEMESTER */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Semester
            </label>
            <input
              type="number"
              min="1"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 3"
            />
          </div>

          {/* ACADEMIC YEAR */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Academic Year
            </label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 2025–2026"
            />
          </div>

          {/* ACTION */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Computing..." : "Compute GPA"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GPACompute;
