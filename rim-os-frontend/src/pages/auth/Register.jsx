import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/auth.api";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await registerUser(form);
      setMessage(
        "Registration successful. Your account will be activated after admin approval."
      );
      setForm({ username: "", password: "", role: "student" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h1 className="text-xl text-gray-600 font-bold mb-1 text-center">
          Create Account
        </h1>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Registration requires admin approval
        </p>

        {message && (
          <div className="text-green-600 text-sm mb-3 text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm mb-3 text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 w-full mb-3"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="border p-2 w-full mb-4"
          value={form.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-blue-600 hover:underline text-sm"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
