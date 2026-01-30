import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/auth.api";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",

    // BIO DATA
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    nationality: "",
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
      await registerUser({
        username: form.username,
        password: form.password,
        role: form.role,

        profile: {
          firstName: form.firstName,
          middleName: form.middleName,
          lastName: form.lastName,
          gender: form.gender,
          email: form.email,
          phone: form.phone,
          nationality: form.nationality,
        },
      });

      setMessage(
        "Registration successful. Await admin activation."
      );

      setForm({
        username: "",
        password: "",
        role: "student",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        email: "",
        phone: "",
        nationality: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-[420px] space-y-3"
      >
        <h1 className="text-xl font-bold text-center text-slate-700">
          Create Account
        </h1>

        <p className="text-sm text-slate-500 text-center">
          Registration requires admin approval
        </p>

        {message && (
          <div className="text-green-600 text-sm text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* ACCOUNT */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 w-full"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="border p-2 w-full"
          value={form.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <hr />

        {/* BIO */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="border p-2 w-full"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="middleName"
          placeholder="Middle Name (optional)"
          className="border p-2 w-full"
          value={form.middleName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="border p-2 w-full"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          className="border p-2 w-full"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-2 w-full"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="nationality"
          placeholder="Nationality"
          className="border p-2 w-full"
          value={form.nationality}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center text-sm">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
