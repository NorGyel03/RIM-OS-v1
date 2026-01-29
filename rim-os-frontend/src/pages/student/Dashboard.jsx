import { useEffect, useState } from "react";
import api from "../../api/axios";
import StudentGreeting from "../../components/StudentGreeting";

const StudentDashboard = () => {
  const [summary, setSummary] = useState({
    gpa: "—",
    courses: 0,
    semester: "—",
    attendance: "—",
  });

  useEffect(() => {
    const loadSummary = async () => {
      try {
        /* GPA SUMMARY */
        const gpaRes = await api.get("/gpa/me");
        if (gpaRes.data.length > 0) {
          const latest = gpaRes.data[gpaRes.data.length - 1];
          setSummary((prev) => ({
            ...prev,
            gpa: latest.grade ?? "—",
            courses: gpaRes.data.length,
            semester: latest.semester,
          }));
        }

        /* ATTENDANCE SUMMARY */
        const attendanceRes = await api.get("/students/attendance");
        setSummary((prev) => ({
          ...prev,
          attendance: `${attendanceRes.data.overallPercentage}%`,
        }));
      } catch (err) {
        console.error("Failed to load dashboard summary", err);
      }
    };

    loadSummary();
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          <StudentGreeting />

          Student Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Your academic overview at a glance
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Current GPA" value={summary.gpa} />
        <StatCard title="Courses Enrolled" value={summary.courses} />
        <StatCard title="Current Semester" value={summary.semester} />
        <AttendanceCard value={summary.attendance} />
      </div>

      {/* QUICK INFO */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          What you can do
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
          <li>📊 View GPA and grades</li>
          <li>📄 Download transcript</li>
          <li>📅 Track daily attendance</li>
          <li>📈 Monitor academic progress</li>
        </ul>
      </div>
    </div>
  );
};

/* ===================== COMPONENTS ===================== */

const StatCard = ({ title, value }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-3xl font-semibold text-slate-900 mt-2">
      {value}
    </p>
  </div>
);

const AttendanceCard = ({ value }) => {
  const numeric = parseInt(value);

  const color =
    numeric >= 75
      ? "text-green-600"
      : numeric >= 50
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <p className="text-sm text-slate-500">Overall Attendance</p>
      <p className={`text-3xl font-semibold mt-2 ${color}`}>
        {value}
      </p>
      <p className="text-xs text-slate-400 mt-1">
        Minimum required: 75%
      </p>
    </div>
  );
};

export default StudentDashboard;
