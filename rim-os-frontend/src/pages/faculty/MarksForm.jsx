import { useEffect, useState } from "react";
import {
  getMyCourses,
  getStudentsByCourse,
  uploadMark,
} from "../../api/faculty.api";

const MarksForm = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [component, setComponent] = useState("");
  const [score, setScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD COURSES
  ========================= */
  useEffect(() => {
    getMyCourses().then(setCourses);
  }, []);

  /* =========================
     LOAD STUDENTS
  ========================= */
  useEffect(() => {
    if (courseId) {
      getStudentsByCourse(courseId).then(setStudents);
    } else {
      setStudents([]);
      setStudentId("");
    }
  }, [courseId]);

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId || !studentId || !component || !score || !maxScore) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await uploadMark({
        studentId,
        courseId,
        component,
        score: Number(score),
        maxScore: Number(maxScore),
      });

      alert("Marks uploaded");
      setScore("");
      setMaxScore("");
    } catch (err) {
      console.error("Marks upload failed:", err);
      alert("Failed to upload marks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Upload Marks
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Record assessment scores for enrolled students
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

        {/* COMPONENT */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Assessment Component
          </label>
          <select
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={component}
            onChange={(e) => setComponent(e.target.value)}
          >
            <option value="">Select Component</option>
            <option value="mid1">Midterm 1</option>
            <option value="mid2">Midterm 2</option>
            <option value="digital1">Digital 1</option>
            <option value="digital2">Digital 2</option>
            <option value="digital3">Digital 3</option>
            <option value="final">Final Exam</option>
          </select>
        </div>

        {/* SCORES */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Score
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Max Score
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={maxScore}
              onChange={(e) => setMaxScore(e.target.value)}
            />
          </div>
        </div>

        {/* ACTION */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Marks"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarksForm;
