import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";

import StudentLayout from "../layouts/StudentLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import AdminLayout from "../layouts/AdminLayout";

import Attendance from "../pages/faculty/Attendance";
import Marks from "../pages/faculty/Marks";
import GPACompute from "../pages/admin/GPACompute";


const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* 👨‍🎓 STUDENT */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<div>Welcome, Student</div>} />
      </Route>

      {/* 👨‍🏫 FACULTY */}
      <Route
        path="/faculty/*"
        element={
          <ProtectedRoute role="faculty">
            <FacultyLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<div>Welcome, Faculty</div>} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="marks" element={<Marks />} />
      </Route>

      {/* 🧑‍💼 ADMIN */}
      <Route
      path="/admin/*"
      element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<div>Welcome, Admin</div>} />
      <Route path="gpa" element={<GPACompute />} />
      </Route>


      {/* 🔁 FALLBACK — ALWAYS LAST */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
