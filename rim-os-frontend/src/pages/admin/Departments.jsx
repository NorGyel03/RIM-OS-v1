import { useEffect, useState } from "react";
import api from "../../api/axios";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const load = () => {
    api.get("/departments").then(res => setDepartments(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !code) {
      alert("Name and code required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/departments", { name, code });
      setName("");
      setCode("");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-black">
          Departments
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage academic departments
        </p>
      </div>

      {/* CREATE DEPARTMENT */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-slate-900 mb-4">
          Add Department
        </h2>

        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Code (e.g. CS)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Department"}
          </button>
        </form>
      </div>

      {/* DEPARTMENT LIST */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-medium text-slate-900">
            Existing Departments
          </h2>
        </div>

        <ul className="divide-y">
          {departments.length === 0 && (
            <li className="px-6 py-4 text-sm text-slate-500">
              No departments created yet.
            </li>
          )}

          {departments.map((d) => (
            <li
              key={d.id}
              className="px-6 py-3 flex justify-between text-sm"
            >
              <span className="text-slate-800">{d.name}</span>
              <span className="text-slate-500">{d.code}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Departments;
