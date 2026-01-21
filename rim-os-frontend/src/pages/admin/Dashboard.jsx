import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    programs: 0,
    courses: 0,
    users: 0
  });

  useEffect(() => {
    // Load lightweight stats (safe calls)
    Promise.all([
      api.get("/admin/programs"),
      api.get("/admin/courses"),
      api.get("/admin/users")
    ])
      .then(([p, c, u]) => {
        setStats({
          programs: p.data.length,
          courses: c.data.length,
          users: u.data.length
        });
      })
      .catch((err) => {
        console.error("Failed to load admin stats", err);
      });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-700">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          System overview & management
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Programs" value={stats.programs} />
        <StatCard title="Courses" value={stats.courses} />
        <StatCard title="Users" value={stats.users} />
      </div>

      {/* Admin Actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Administrative Actions
        </h2>

        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Create & manage programs</li>
          <li>Create courses and assign semesters</li>
          <li>Enroll students into courses</li>
          <li>Compute final GPA</li>
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

export default AdminDashboard;
