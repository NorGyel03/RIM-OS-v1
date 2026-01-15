import { useEffect, useState } from "react";
import {
  getMyCourses,
  getStudentsByCourse,
  uploadMark
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

  useEffect(() => {
    getMyCourses().then(setCourses);
  }, []);

  useEffect(() => {
    if (courseId) {
      getStudentsByCourse(courseId).then(setStudents);
    } else {
      setStudents([]);
      setStudentId("");
    }
  }, [courseId]);

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
        maxScore: Number(maxScore)
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
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-3">Upload Marks</h2>

      {/* Course */}
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

      {/* Student */}
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

      {/* Component */}
      <select
        className="border p-2 w-full mb-3"
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

      {/* Score */}
      <input
        type="number"
        placeholder="Score"
        className="border p-2 w-full mb-3"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Score"
        className="border p-2 w-full mb-3"
        value={maxScore}
        onChange={(e) => setMaxScore(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default MarksForm;
