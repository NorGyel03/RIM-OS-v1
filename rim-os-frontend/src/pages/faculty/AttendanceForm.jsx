import { useEffect, useState } from "react";
import { getMyCourses, markAttendance } from "../../api/faculty.api";

const AttendanceForm = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [status, setStatus] = useState("present");
  const [loading, setLoading] = useState(false);

  // 🔴 TEMPORARY: replace with a REAL student_id from DB
  const TEST_STUDENT_ID = "adb64fc3-e631-478b-9c0e-c22a57d9a026";

  useEffect(() => {
    getMyCourses().then(setCourses);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SUBMIT CLICKED");

    if (!courseId) {
      alert("Course is required");
      return;
    }

    try {
      setLoading(true);

      await markAttendance({
        studentId: TEST_STUDENT_ID, // ✅ correct for your DB
        courseId,
        date: new Date().toISOString().slice(0, 10),
        status,
      });

      alert("Attendance submitted");
    } catch (err) {
      console.error("Attendance submit failed:", err);
      alert("Failed to submit attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-3">Mark Attendance</h2>

      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="border p-2 w-full mb-3"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.code} — {c.title}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-3"
      >
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>

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

export default AttendanceForm;
