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

console.log(
  "STUDENTS FOR ENROLL:",
  students.map(s => ({
    student_id: s.student_id,
    enrollment_no: s.enrollment_no,
    username: s.username
  }))
);




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
      setMessage("Student enrolled successfully");
      setStudentId("");
      setCourseId("");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to enroll student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-black">
          Enroll Student
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enroll students into courses
        </p>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="text-sm text-indigo-700">
          {message}
        </div>
      )}

      {/* ENROLLMENT FORM */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-slate-900 mb-4">
          Enrollment Details
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* STUDENT */}
          <div>
            <label
              htmlFor="studentSelect"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Student
            </label>

            <select
              id="studentSelect"
              name="studentSelect"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select student</option>

              {students.map((s, index) => (
                <option
                  key={s.student_id ?? `fallback-${index}`}   // ✅ NEVER undefined
                  value={s.student_id}
                >
                  {s.enrollment_no} — {s.username}
                </option>
              ))}
            </select>

          </div>





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
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* ACTION */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Enrolling..." : "Enroll Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default Enrollments;
