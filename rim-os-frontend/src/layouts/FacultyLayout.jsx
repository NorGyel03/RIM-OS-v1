import { Outlet, Link, Navigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../auth/AuthContext";

const FacultyLayout = () => {
  const { isAuthenticated, userRole, loading } = useAuth();

  /* ⏳ WAIT FOR AUTH */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  /* 🔐 GUARD */
  if (!isAuthenticated || userRole !== "faculty") {
    return <Navigate to="/login" replace />;
  }

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
        <NavItem to="/faculty">Dashboard</NavItem>
        <NavItem to="/faculty/attendance">Attendance</NavItem>
        <NavItem to="/faculty/marks">Marks</NavItem>
        <NavItem to="/faculty/profile">My Profile</NavItem>
      </nav>

      {/* Content */}
      <main className="text-gray-500">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, children }) => (
  <Link
    to={to}
    className="text-slate-600 hover:text-slate-900 font-medium transition"
  >
    {children}
  </Link>
);

export default FacultyLayout;
