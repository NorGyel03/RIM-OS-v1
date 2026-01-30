import { Outlet, Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-slate-800">
          Admin Portal
        </h1>
        <LogoutButton />
      </header>

      {/* NAV */}
      <nav className="bg-white border-b px-6 py-3 flex flex-wrap gap-4 text-sm text-slate-600">
        <Link className="hover:text-slate-900" to="/admin">Home</Link>
        <Link className="hover:text-slate-900" to="/admin/departments">Departments</Link>
        <Link className="hover:text-slate-900" to="/admin/programs">Programs</Link>
        <Link className="hover:text-slate-900" to="/admin/courses">Courses</Link>
        <Link className="hover:text-slate-900" to="/admin/faculty-assign">Assign Faculty</Link>
        <Link className="hover:text-slate-900" to="/admin/enrollments">Enrollments</Link>
        <Link className="hover:text-slate-900" to="/admin/gpa">Compute GPA</Link>
        <Link className="hover:text-slate-900" to="/admin/approvals">Approvals</Link>
        <Link className="hover:text-slate-900" to="/admin/users">Users</Link>
        <Link className="hover:text-slate-900" to="/admin/user-database">User Database</Link>
      </nav>

      {/* CONTENT */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
