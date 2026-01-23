import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../auth/ProtectedRoute";

import StudentLayout from "../layouts/StudentLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import AdminLayout from "../layouts/AdminLayout";

/* STUDENT PAGES */
import StudentDashboard from "../pages/student/Dashboard";
import GPA from "../pages/student/GPA";
import Transcript from "../pages/student/Transcript";
import StudentAttendanceView from "../pages/student/AttendanceView";

/* FACULTY PAGES */
import FacultyDashboard from "../pages/faculty/Dashboard";
import Attendance from "../pages/faculty/Attendance";
import Marks from "../pages/faculty/Marks";

/* ADMIN PAGES */
import AdminDashboard from "../pages/admin/Dashboard";
import GPACompute from "../pages/admin/GPACompute";
import Enrollments from "../pages/admin/Enrollments";
import Programs from "../pages/admin/Programs";
import Courses from "../pages/admin/Courses";
import Users from "../pages/admin/Users";
import Departments from "../pages/admin/Departments";
import FacultyCourseAssign from "../pages/admin/FacultyCourseAssign";
import Approvals from "../pages/admin/Approvals";
import PendingUsers from "../pages/admin/PendingUsers";
import UserList from "../pages/admin/UserList";

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
          <Route path="attendance" element={<StudentAttendanceView />} />
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
          <Route path="faculty-assign" element={<FacultyCourseAssign />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="pending-users" element={<PendingUsers />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user-database" element={<UserList />} />
        </Route>
      </Route>

      {/* 🔁 FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
