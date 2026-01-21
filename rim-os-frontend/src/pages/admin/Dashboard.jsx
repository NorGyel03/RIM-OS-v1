import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    programs: 0,
    courses: 0,
    users: 0
  });

  useEffect(() => {
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
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Academic system administration
          </p>
        </div>

        {/* STATS TILES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatTile title="Programs" value={stats.programs} />
          <StatTile title="Courses" value={stats.courses} />
          <StatTile title="Users" value={stats.users} />
        </div>

        {/* ACTION TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          <ActionTile title="Departments" subtitle="Manage departments" />
          <ActionTile title="Programs" subtitle="Create & edit programs" />
          <ActionTile title="Courses" subtitle="Course catalog" />
          <ActionTile title="Assign Faculty" subtitle="Faculty allocation" />
          <ActionTile title="Enroll Students" subtitle="Course enrollment" />
          <ActionTile title="Compute GPA" subtitle="Final GPA processing" />
          <ActionTile title="Approvals" subtitle="New user requests" />
        </div>

      </div>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const StatTile = ({ title, value }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-5">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-3xl font-semibold text-slate-900 mt-2">
      {value}
    </p>
  </div>
);

const ActionTile = ({ title, subtitle }) => (
  <button className="text-left bg-white border border-slate-200 rounded-lg p-5 hover:border-indigo-300 transition">
    <p className="font-medium text-slate-900">{title}</p>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </button>
);

export default AdminDashboard;
