import { Outlet, Link } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      <nav className="mb-4 space-x-4">
        <Link to="/student" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/student/gpa" className="text-blue-600 hover:underline">
          GPA
        </Link>
        <Link
        to="/student/transcript"
        className="text-blue-600 hover:underline"
        >
        Transcript
        </Link>

      </nav>

      <Outlet />
    </div>
  );
};

export default StudentLayout;
