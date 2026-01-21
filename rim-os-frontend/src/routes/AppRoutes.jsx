import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";

import StudentLayout from "../layouts/StudentLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import AdminLayout from "../layouts/AdminLayout";


import Register from "../pages/auth/Register";
import PendingUsers from "../pages/admin/PendingUsers";

import Approvals from "../pages/admin/Approvals";



// Student pages
import GPA from "../pages/student/GPA";
import Transcript from "../pages/student/Transcript";
import StudentDashboard from "../pages/student/Dashboard";

// Faculty pages
import Attendance from "../pages/faculty/Attendance";
import Marks from "../pages/faculty/Marks";
import FacultyDashboard from "../pages/faculty/Dashboard";

// Admin pages
import GPACompute from "../pages/admin/GPACompute";
import Enrollments from "../pages/admin/Enrollments";
import Programs from "../pages/admin/Programs";
import Courses from "../pages/admin/Courses";
import Users from "../pages/admin/Users";
import AdminDashboard from "../pages/admin/Dashboard";
import Departments from "../pages/admin/Departments";
import FacultyCourseAssign from "../pages/admin/FacultyCourseAssign";


const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
          <Route index element={<FacultyDashboard />} />
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
          <Route path="departments" element={<Departments />} />
          <Route path="faculty-course-assign" element={<FacultyCourseAssign />} />  
          <Route path="faculty-assign" element={<FacultyCourseAssign />} />
          <Route path="/admin/approvals" element={<Approvals />} />
          <Route path="/admin/pending-users" element={
              <ProtectedRoute role="admin">
              <PendingUsers />
              </ProtectedRoute>
          }
/>


        </Route>
      </Route>

      {/* 🔁 FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>
  );
};

export default AppRoutes;
