import { useEffect, useState } from "react";
import api from "../../api/axios";

const StudentDashboard = () => {
  const [summary, setSummary] = useState({
    gpa: null,
    courses: 0,
    semester: "-"
  });

  useEffect(() => {
    // lightweight summary from GPA API
    api.get("/gpa/me").then((res) => {
      if (res.data.length > 0) {
        const latest = res.data[res.data.length - 1];
        setSummary({
          gpa: latest.grade ?? "—",
          courses: res.data.length,
          semester: latest.semester
        });
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, Student 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Here’s your academic overview
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Current GPA"
          value={summary.gpa ?? "—"}
        />
        <StatCard
          title="Courses Taken"
          value={summary.courses}
        />
        <StatCard
          title="Current Semester"
          value={summary.semester}
        />
      </div>

      {/* Info section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          What you can do here
        </h2>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>View GPA and grades</li>
          <li>Check your academic transcript</li>
          <li>Track your academic progress</li>
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-slate-500 text-sm">{title}</p>
    <p className="text-3xl font-bold text-slate-800 mt-2">
      {value}
    </p>
  </div>
);

export default StudentDashboard;
