import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard
      </h1>

      <nav className="mb-4 space-x-4">
      <Link to="/admin">Home</Link>
      <Link to="/admin/gpa">Compute GPA</Link>
      <Link to="/admin/enrollments">Enroll Students</Link>
      <Link to="/admin/programs">Programs</Link>
      <Link to="/admin/courses">Courses</Link>
      </nav>


      <Outlet />
    </div>
  );
};

export default AdminLayout;
