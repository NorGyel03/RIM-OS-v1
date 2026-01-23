import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, userRole, loading } = useAuth();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  // 🔒 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
