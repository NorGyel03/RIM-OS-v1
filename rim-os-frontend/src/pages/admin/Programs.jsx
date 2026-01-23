import { useEffect, useState } from "react";
import { getPrograms } from "../../api/admin.api";
import api from "../../api/axios";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [level, setLevel] = useState("");
  const [durationYears, setDurationYears] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPrograms().then(setPrograms);

    api.get("/departments")
      .then(res => setDepartments(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !departmentId || !level || !durationYears) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/admin/programs", {
        name,
        departmentId,
        level,
        durationYears: Number(durationYears),
      });

      setName("");
      setDepartmentId("");
      setLevel("");
      setDurationYears("");

      getPrograms().then(setPrograms);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create program");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Programs
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage academic programs
        </p>
      </div>

      {/* CREATE PROGRAM */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-slate-900 mb-4">
          Add Program
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          <input
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Program Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option value="">Department</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Level</option>
            <option value="Diploma">Diploma</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>

          <input
            type="number"
            min="1"
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Duration (years)"
            value={durationYears}
            onChange={(e) => setDurationYears(e.target.value)}
          />

          <button
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Program"}
          </button>
        </form>
      </div>

      {/* EXISTING PROGRAMS */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-medium text-slate-900">
            Existing Programs
          </h2>
        </div>

        <ul className="divide-y">
          {programs.length === 0 && (
            <li className="px-6 py-4 text-sm text-slate-500">
              No programs created yet.
            </li>
          )}

          {programs.map((p) => (
            <li
              key={p.id}
              className="px-6 py-3 grid grid-cols-4 text-sm"
            >
              <span className="text-slate-900">{p.name}</span>
              <span className="text-slate-600">{p.level}</span>
              <span className="text-slate-600">
                {p.duration_years} yrs
              </span>
              <span className="text-slate-500 text-right">
                {p.department_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Programs;
