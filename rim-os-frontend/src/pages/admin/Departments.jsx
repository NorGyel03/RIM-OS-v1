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
    <div>
      <h2 className="text-xl font-bold mb-4">Departments</h2>

      <form onSubmit={submit} className="mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <ul className="list-disc ml-6">
        {departments.map((d) => (
          <li key={d.id}>
            {d.name} ({d.code})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Departments;
