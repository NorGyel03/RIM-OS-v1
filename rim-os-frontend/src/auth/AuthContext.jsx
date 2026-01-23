import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore auth on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
    }

    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setUserRole(role);
  };

  // 🚪 LOGOUT (FINAL)
  const logout = () => {
    localStorage.clear();       // ✅ clears token + role safely
    setToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userRole,
        login,
        logout,
        loading,
        isAuthenticated: !!token, // ✅ useful everywhere
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
