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
    return <p className="p-6 text-slate-600">Loading GPA...</p>;
  }

  if (records.length === 0) {
    return <p className="p-6 text-slate-600">No GPA records available.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        GPA Overview
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Score</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Semester</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-800">
                  {r.code}
                </td>
                <td className="p-3 text-slate-700">
                  {r.total_score}
                </td>
                <td className="p-3 font-semibold">
                  {r.grade}
                </td>
                <td className="p-3 text-slate-700">
                  {r.semester}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GPA;
