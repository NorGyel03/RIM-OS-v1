import { useState } from "react";
import { registerUser } from "../../api/auth.api";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
  });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await registerUser(form);
      setMsg("Registration submitted. Await admin approval.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Register</h2>

      <input
        placeholder="Username"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </select>

      <button className="bg-blue-600 text-white w-full p-2">
        Register
      </button>

      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </form>
  );
};

export default Register;
