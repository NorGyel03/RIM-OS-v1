import { useEffect, useState } from "react";
import api from "../../api/axios";

const FacultyCourseAssign = () => {
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    api.get("/admin/faculty").then(res => setFaculty(res.data));
    api.get("/courses").then(res => setCourses(res.data));
  }, []);

  const assign = async () => {
    if (!facultyId || !courseId) {
      alert("Select faculty and course");
      return;
    }

    await api.post("/faculty-courses/assign", {
      facultyId,
      courseId,
    });

    alert("Faculty assigned");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Assign Faculty to Course
      </h2>

      <select
        className="border p-2 mb-3 w-full"
        value={facultyId}
        onChange={(e) => setFacultyId(e.target.value)}
      >
        <option value="">Select Faculty</option>
        {faculty.map(f => (
          <option key={f.id} value={f.id}>
            {f.username} {f.designation ? `(${f.designation})` : ""}
          </option>
        ))}

      </select>

      <select
        className="border p-2 mb-3 w-full"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses.map(c => (
          <option key={c.id} value={c.id}>
            {c.code} — {c.title}
          </option>
        ))}
      </select>

      <button
        onClick={assign}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Assign
      </button>
    </div>
  );
};

export default FacultyCourseAssign;
