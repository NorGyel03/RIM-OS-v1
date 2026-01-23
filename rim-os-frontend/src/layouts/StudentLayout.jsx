import { Link, Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-slate-700">
          RIM OS
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/student"
            className="block px-3 py-2 rounded hover:bg-slate-700"
          >
            Dashboard
          </Link>
          <Link
            to="/student/gpa"
            className="block px-3 py-2 rounded hover:bg-slate-700"
          >
            GPA
          </Link>
          <Link
            to="/student/transcript"
            className="block px-3 py-2 rounded hover:bg-slate-700"
          >
            Transcript
          </Link>
          <Link
            to="/student/attendance"
            className="block px-3 py-2 rounded hover:bg-slate-700"
          >
            Attendance
          </Link>
        </nav>

         {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <LogoutButton />
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-slate-100 min-h-screen p-8 text-slate-900">
        <Outlet />
      </main>

    </div>
  );
};

export default StudentLayout;
