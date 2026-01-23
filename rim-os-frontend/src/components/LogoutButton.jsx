import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 hover:text-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
