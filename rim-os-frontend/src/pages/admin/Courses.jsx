import { useEffect, useState } from "react";
import api from "../../api/axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [programs, setPrograms] = useState([]); // ✅ NEW
  const [form, setForm] = useState({
    programId: "",
    code: "",
    title: "",
    credit: "",
    semester: "",
  });
  const [loading, setLoading] = useState(false);

  const loadCourses = async () => {
    const res = await api.get("/admin/courses");
    setCourses(res.data);
  };

  const loadPrograms = async () => {
    const res = await api.get("/admin/programs");
    setPrograms(res.data);
  };

  useEffect(() => {
    loadCourses();
    loadPrograms(); // ✅ NEW
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.programId ||
      !form.code ||
      !form.title ||
      !form.credit ||
      !form.semester
    ) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/admin/courses", {
        ...form,
        credit: Number(form.credit),
        semester: Number(form.semester),
      });

      setForm({
        programId: "",
        code: "",
        title: "",
        credit: "",
        semester: "",
      });

      await loadCourses();
      alert("Course created");
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      {/* Create Course */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h3 className="font-semibold mb-3">Create Course</h3>

        {/* ✅ PROGRAM DROPDOWN */}
        <select
          name="programId"
          value={form.programId}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Program</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          name="code"
          placeholder="Course Code"
          value={form.code}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          name="credit"
          type="number"
          placeholder="Credit"
          value={form.credit}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          name="semester"
          type="number"
          placeholder="Semester"
          value={form.semester}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>

      {/* Courses List */}
      <table className="w-full border border-gray-300">
        <thead className="bg-slate-700 text-white">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Code</th>
            <th className="border border-gray-300 p-2 text-left">Title</th>
            <th className="border border-gray-300 p-2 text-left">Credit</th>
            <th className="border border-gray-300 p-2 text-left">Semester</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="border p-2">{c.code}</td>
              <td className="border p-2">{c.title}</td>
              <td className="border p-2">{c.credit}</td>
              <td className="border p-2">{c.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
