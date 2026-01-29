import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    programs: 0,
    courses: 0,
    users: 0,
  });

  useEffect(() => {
    Promise.all([
      api.get("/admin/programs"),
      api.get("/admin/courses"),
      api.get("/admin/users"),
    ]).then(([p, c, u]) => {
      setStats({
        programs: p.data.length,
        courses: c.data.length,
        users: u.data.length,
      });
    });
  }, []);

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Academic system overview & control
        </p>
      </div>

      {/* SYSTEM SNAPSHOT */}
      <section>
        <p className="text-xs uppercase tracking-wide text-slate-500 mb-4">
          System Snapshot
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Programs"
            value={stats.programs}
            gradient="from-indigo-500 to-indigo-600"
          />
          <StatCard
            title="Courses"
            value={stats.courses}
            gradient="from-emerald-500 to-emerald-600"
          />
          <StatCard
            title="Users"
            value={stats.users}
            gradient="from-amber-500 to-amber-600"
          />
        </div>
      </section>

      {/* ACADEMIC SETUP */}
      <DashboardSection title="Academic Setup">
        <ActionCard
          title="Departments"
          subtitle="Organize academic units"
        />
        <ActionCard
          title="Programs"
          subtitle="Degree & diploma structure"
        />
        <ActionCard
          title="Courses"
          subtitle="Course catalog management"
        />
      </DashboardSection>

      {/* ACADEMIC OPERATIONS */}
      <DashboardSection title="Academic Operations">
        <ActionCard
          title="Assign Faculty"
          subtitle="Faculty–course mapping"
        />
        <ActionCard
          title="Enroll Students"
          subtitle="Course enrollment"
        />
        <ActionCard
          title="Compute GPA"
          subtitle="Final grade processing"
        />
      </DashboardSection>

      {/* SYSTEM CONTROL */}
      <DashboardSection title="System Control">
        <ActionCard
          title="Approvals"
          subtitle="New user & access requests"
          highlight
        />
        <ActionCard
          title="User"
          subtitle="Assign users roles and update profile"
          highlight
        />
        <ActionCard
          title="User Database"
          subtitle="View all existing users and update their bio"
          highlight
        />
      </DashboardSection>

    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ title, value, gradient }) => (
  <div
    className={`rounded-xl p-6 text-white bg-gradient-to-br ${gradient} shadow-sm`}
  >
    <p className="text-sm opacity-90">{title}</p>
    <p className="text-4xl font-bold mt-2">{value}</p>
  </div>
);

const DashboardSection = ({ title, children }) => (
  <section>
    <p className="text-xs uppercase tracking-wide text-slate-500 mb-4">
      {title}
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </section>
);

const ActionCard = ({ title, subtitle, highlight }) => (
  <button
    className={`text-left rounded-xl p-6 border bg-white transition
      hover:shadow-md hover:-translate-y-0.5
      ${
        highlight
          ? "border-indigo-300 bg-indigo-50"
          : "border-slate-200"
      }`}
  >
    <p className="font-semibold text-slate-900">{title}</p>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </button>
);

export default AdminDashboard;
