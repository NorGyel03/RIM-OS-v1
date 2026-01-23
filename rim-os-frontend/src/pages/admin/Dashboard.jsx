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
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Academic system overview & control
          </p>
        </div>

        {/* SYSTEM SNAPSHOT */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
            System Snapshot
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatTile title="Programs" value={stats.programs} />
            <StatTile title="Courses" value={stats.courses} />
            <StatTile title="Users" value={stats.users} />
          </div>
        </section>

        {/* PRIMARY SETUP */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
            Academic Setup
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ActionTile title="Departments" subtitle="Organize academic units" />
            <ActionTile title="Programs" subtitle="Degree & diploma structure" />
            <ActionTile title="Courses" subtitle="Course catalog management" />
          </div>
        </section>

        {/* OPERATIONS */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
            Academic Operations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ActionTile title="Assign Faculty" subtitle="Faculty-course mapping" />
            <ActionTile title="Enroll Students" subtitle="Course enrollment" />
            <ActionTile title="Compute GPA" subtitle="Final grade processing" />
          </div>
        </section>

        {/* SYSTEM CONTROL */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
            System Control
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ActionTile
              title="Approvals"
              subtitle="New user & access requests"
              emphasis
            />
          </div>
        </section>

      </div>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const StatTile = ({ title, value }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-4xl font-semibold text-slate-900 mt-2">
      {value}
    </p>
  </div>
);

const ActionTile = ({ title, subtitle, emphasis }) => (
  <button
    className={`text-left rounded-xl p-6 transition border
      ${
        emphasis
          ? "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
          : "bg-white border-slate-200 hover:border-indigo-300"
      }`}
  >
    <p className="font-medium text-slate-900">{title}</p>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </button>
);

export default AdminDashboard;
