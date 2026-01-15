import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboard from "../pages/student/Dashboard";
import FacultyLayout from "../layouts/FacultyLayout";
import FacultyDashboard from "../pages/faculty/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          </ProtectedRoute>

        }
      />

      <Route
        path="/faculty"
        element={
          <ProtectedRoute role="faculty">
            <FacultyLayout>
              <FacultyDashboard />
            </FacultyLayout>
          </ProtectedRoute>
        }
      />
    </Routes>

    
  );
};

export default AppRoutes;
