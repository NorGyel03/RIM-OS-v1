import { useEffect, useState } from "react";
import { getMyGPA } from "../../api/student.api";

const GPATable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyGPA()
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading GPA...</p>;

  if (courses.length === 0) {
    return <p>No GPA data available.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">GPA</h2>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Score</th>
            <th className="p-2 border">Grade</th>
            <th className="p-2 border">Semester</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={`${c.code}-${c.semester}`}>
              <td className="p-2 border">{c.title}</td>
              <td className="p-2 border">{c.total_score}</td>
              <td className="p-2 border font-semibold">{c.grade}</td>
              <td className="p-2 border">{c.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GPATable;
