import { useEffect, useState } from "react";
import { getPrograms, createProgram } from "../../api/admin.api";
import api from "../../api/axios";



const Programs = () => {
  
  console.log("✅ Programs.jsx is rendering");


  const [programs, setPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("");
  const [durationYears, setDurationYears] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    getPrograms().then(setPrograms);

    // departments already exist
    api.get("/departments")
    .then(res => setDepartments(res.data))
    .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("🧪 SUBMIT PAYLOAD:", {
    name,
    departmentId,
    level,
    durationYears,
  });

  if (!name || !departmentId || !level || !durationYears) {
    alert("All fields are required");
    return;
  }

  try {
    await api.post("/admin/programs", {
      name,
      departmentId,
      level,
      durationYears: Number(durationYears),
    });

    alert("Program created successfully");
  } catch (err) {
    console.error("❌ CREATE PROGRAM ERROR:", err.response?.data || err);
  }
};



  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Programs</h2>

      {message && (
        <div className="mb-3 text-sm text-blue-700">
          {message}
        </div>
      )}

      {/* Create Program */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-full max-w-md">

        <h2 className="text-lg font-semibold mb-4">Create Program</h2>

        {/* Program Name */}
        <input
          type="text"
          placeholder="Program Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />

        {/* Department */}
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Level */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        >
          <option value="">Select Level</option>
          <option value="Diploma">Diploma</option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
        </select>

        {/* Duration */}
        <input
          type="number"
          min="1"
          placeholder="Duration (years)"
          value={durationYears}
          onChange={(e) => setDurationYears(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Program
        </button>
    </form>


      {/* List Programs */}
      <ul className="list-disc pl-5">
        {programs.map((p) => (
          <li key={p.id}>
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Programs;
