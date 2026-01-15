import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard
      </h1>

      <nav className="mb-4 space-x-4">
        <Link to="/admin" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/admin/gpa" className="text-blue-600 hover:underline">
          Compute GPA
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default AdminLayout;
