import { Outlet, Link } from "react-router-dom";

const FacultyLayout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Faculty Dashboard</h1>

      <nav className="mb-4 space-x-4">
        <Link
          to="/faculty"
          className="text-blue-600 hover:underline"
        >
          Home
        </Link>

        <Link
          to="/faculty/attendance"
          className="text-blue-600 hover:underline"
        >
          Attendance
        </Link>

        <Link to="/faculty/marks" className="text-blue-600 hover:underline">
          Marks
        </Link>



      </nav>

      <Outlet />
    </div>
  );
};

export default FacultyLayout;
