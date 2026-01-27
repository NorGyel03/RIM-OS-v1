import { useEffect, useState } from "react";
import api from "../../api/axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [programs, setPrograms] = useState([]);
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
    loadPrograms();
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
    } catch (err) {
      alert("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-black">
          Courses
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage program courses
        </p>
      </div>

      {/* ADD COURSE */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-slate-900 mb-4">
          Add Course
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-6 gap-4"
        >
          <select
            name="programId"
            value={form.programId}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Program</option>
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
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 col-span-2"
          />

          <input
            name="credit"
            type="number"
            min="1"
            placeholder="Credit"
            value={form.credit}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="semester"
            type="number"
            min="1"
            placeholder="Semester"
            value={form.semester}
            onChange={handleChange}
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />

          <button
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 text-sm font-medium disabled:opacity-60 md:col-span-6"
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>

      {/* COURSE LIST */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-medium text-slate-900">
            Existing Courses
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-3 text-left">Code</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Credit</th>
              <th className="px-6 py-3 text-left">Semester</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {courses.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-slate-500"
                >
                  No courses created yet.
                </td>
              </tr>
            )}

            {courses.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-6 py-3 text-slate-900">{c.code}</td>
                <td className="px-6 py-3 text-slate-700">{c.title}</td>
                <td className="px-6 py-3 text-slate-700">{c.credit}</td>
                <td className="px-6 py-3 text-slate-700">{c.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
