import { Outlet, Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const FacultyLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Bar */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-slate-800">
          Faculty Portal
        </h1>
        <LogoutButton />
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b px-6 py-3 flex gap-6 text-sm">
        <NavLink to="/faculty">Dashboard</NavLink>
        <NavLink to="/faculty/attendance">Attendance</NavLink>
        <NavLink to="/faculty/marks">Marks</NavLink>
      </nav>

      {/* Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-slate-600 hover:text-slate-900 font-medium transition"
  >
    {children}
  </Link>
);

export default FacultyLayout;
