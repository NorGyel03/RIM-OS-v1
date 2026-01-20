import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";

import StudentLayout from "../layouts/StudentLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import AdminLayout from "../layouts/AdminLayout";

// Student pages
import GPA from "../pages/student/GPA";
import Transcript from "../pages/student/Transcript";

// Faculty pages
import Attendance from "../pages/faculty/Attendance";
import Marks from "../pages/faculty/Marks";

// Admin pages
import GPACompute from "../pages/admin/GPACompute";
import Enrollments from "../pages/admin/Enrollments";
import Programs from "../pages/admin/Programs";
import Courses from "../pages/admin/Courses";


const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* 👨‍🎓 STUDENT */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<div>Welcome, Student</div>} />
        <Route path="gpa" element={<GPA />} />
        <Route path="transcript" element={<Transcript />} />
      </Route>

      {/* 👨‍🏫 FACULTY */}
      <Route
        path="/faculty"
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
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<div>Welcome, Admin</div>} />
        <Route path="gpa" element={<GPACompute />} />
        <Route path="enrollments" element={<Enrollments />} />
        <Route path="programs" element={<Programs />} />
        <Route path="courses" element={<Courses />} />

      </Route>

      {/* 🔁 FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;