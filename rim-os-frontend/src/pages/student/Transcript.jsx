import { useEffect, useState } from "react";
import api from "../../api/axios";

const Transcript = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/transcripts/me")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load transcript");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading transcript...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!data || data.courses.length === 0)
    return <p>No transcript data available.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Academic Transcript</h2>

      {/* Courses Table */}
      <table className="w-full border mb-6">
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
          {data.courses.map((c, i) => (
            <tr key={i}>
              <td className="border p-2">
                {c.code} — {c.title}
              </td>
              <td className="border p-2">{c.semester}</td>
              <td className="border p-2">{c.academic_year}</td>
              <td className="border p-2">{c.total_score}</td>
              <td className="border p-2 font-semibold">{c.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* GPA Summary */}
      <div className="bg-white text-black p-4 rounded border">

        <h3 className="font-semibold mb-2">GPA Summary</h3>

        {Object.entries(data.semesterGPA).map(([key, value]) => (
          <p key={key}>
            {key}: <strong>{value}</strong>
          </p>
        ))}

        <p className="mt-2 text-lg">
          CGPA: <strong>{data.cgpa}</strong>
        </p>
      </div>
    </div>
  );
};

export default Transcript;