import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import { jwtDecode } from "jwt-decode"; // ✅ FIX

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      console.log("FULL LOGIN RESPONSE:", res.data);

      const token = res.data.token;
      if (!token) {
        throw new Error("Token missing in response");
      }

      // 🔑 Decode JWT to extract role
      const decoded = jwtDecode(token);

      /*
        Expected payload shape:
        {
          id: "...",
          role: "student",
          iat: ...,
          exp: ...
        }
      */
      const role = decoded.role;

      if (!role) {
        throw new Error("Role missing in token");
      }

      // 🔐 Store auth state
      login(token, role);

      // 🚦 Redirect by role
      navigate(`/${role}`);
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data || err.message
      );
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          RIM OS Login
        </h1>

        {error && (
          <div className="text-red-600 text-sm mb-3">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
