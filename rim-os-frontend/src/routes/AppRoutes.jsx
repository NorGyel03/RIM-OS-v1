import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";

import StudentLayout from "../layouts/StudentLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import AdminLayout from "../layouts/AdminLayout";

// Student pages
import GPA from "../pages/student/GPA";
import Transcript from "../pages/student/Transcript";
import StudentDashboard from "../pages/student/Dashboard";

// Faculty pages
import Attendance from "../pages/faculty/Attendance";
import Marks from "../pages/faculty/Marks";

// Admin pages
import GPACompute from "../pages/admin/GPACompute";
import Enrollments from "../pages/admin/Enrollments";
import Programs from "../pages/admin/Programs";
import Courses from "../pages/admin/Courses";
import Users from "../pages/admin/Users";
import AdminDashboard from "../pages/admin/Dashboard";


const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* 👨‍🎓 STUDENT */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="gpa" element={<GPA />} />
          <Route path="transcript" element={<Transcript />} />
        </Route>
      </Route>

      {/* 👨‍🏫 FACULTY */}
      <Route element={<ProtectedRoute allowedRoles={["faculty"]} />}>
        <Route path="/faculty" element={<FacultyLayout />}>
          <Route index element={<div>Welcome, Faculty</div>} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="marks" element={<Marks />} />
        </Route>
      </Route>

      {/* 🧑‍💼 ADMIN */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="gpa" element={<GPACompute />} />
          <Route path="enrollments" element={<Enrollments />} />
          <Route path="programs" element={<Programs />} />
          <Route path="courses" element={<Courses />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      {/* 🔁 FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
