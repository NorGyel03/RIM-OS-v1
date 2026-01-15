import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default StudentLayout;
