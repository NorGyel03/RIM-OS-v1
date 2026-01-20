import { useEffect, useState } from "react";
import api from "../../api/axios";

const GPA = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/gpa/me")
      .then((res) => setRecords(res.data))
      .catch((err) => {
        console.error("Failed to load GPA:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading GPA...</p>;
  }

  if (records.length === 0) {
    return <p>No GPA records available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My GPA</h2>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Course</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Academic Year</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td className="border p-2">
                {r.code} — {r.title}
              </td>
              <td className="border p-2">{r.semester}</td>
              <td className="border p-2">{r.academic_year}</td>
              <td className="border p-2">{r.total_score}</td>
              <td className="border p-2 font-semibold">{r.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GPA;
