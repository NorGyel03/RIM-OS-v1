import { useEffect, useState } from "react";
import api from "../../api/axios";

const FacultyCourseAssign = () => {
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/admin/faculty").then(res => setFaculty(res.data));
    api.get("/courses").then(res => setCourses(res.data));
  }, []);

  const assign = async () => {
    if (!facultyId || !courseId) {
      alert("Select faculty and course");
      return;
    }

    try {
      setLoading(true);
      await api.post("/faculty-courses/assign", {
        facultyId,
        courseId,
      });

      setFacultyId("");
      setCourseId("");
      alert("Faculty assigned successfully");
    } catch (err) {
      alert("Failed to assign faculty");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-black">
          Assign Faculty
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Assign faculty members to courses
        </p>
      </div>

      {/* ASSIGN CARD */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">

        <div>
          <h2 className="text-lg font-medium text-slate-900">
            Faculty–Course Assignment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* FACULTY */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Faculty
            </label>
            <select
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select faculty</option>
              {faculty.map(f => (
                <option key={f.id} value={f.id}>
                  {f.username}
                  {f.designation ? ` (${f.designation})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* COURSE */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Course
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select course</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.title}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* ACTION */}
        <div className="pt-2">
          <button
            onClick={assign}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Assigning..." : "Assign Faculty"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FacultyCourseAssign;
