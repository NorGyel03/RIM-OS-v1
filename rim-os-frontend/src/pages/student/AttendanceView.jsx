import { useEffect, useState } from "react";
import api from "../../api/axios";

const StudentAttendanceView = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCourse, setOpenCourse] = useState(null);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const res = await api.get("/students/attendance");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load attendance", err);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading attendance...</p>;
  }

  if (!data) {
    return <p className="text-slate-500">No attendance data</p>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Attendance Summary
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Click a course to view daily attendance
        </p>
      </div>

      {/* OVERALL */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Overall Attendance</p>
        <p
          className={`text-4xl font-bold mt-2 ${
            data.overallPercentage >= 75
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {data.overallPercentage}%
        </p>
      </div>

      {/* COURSES */}
      <div className="space-y-4">
        {data.courses.map((c) => {
          const isOpen = openCourse === c.course_id;

          return (
            <div
              key={c.course_id}
              className="bg-white border border-slate-200 rounded-xl"
            >
              {/* COURSE HEADER */}
              <button
                onClick={() =>
                  setOpenCourse(isOpen ? null : c.course_id)
                }
                className="w-full text-left p-5 flex justify-between items-center hover:bg-slate-50 rounded-xl"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {c.code} — {c.title}
                  </p>
                  <p className="text-sm text-slate-500">
                    {c.present} / {c.total} classes attended
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-lg font-semibold ${
                      c.percentage >= 75
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {c.percentage}%
                  </span>
                  <span className="text-slate-400">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>
              </button>

              {/* PROGRESS BAR */}
              <div className="px-5 pb-3">
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      c.percentage >= 75
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
              </div>

              {/* DROPDOWN DETAILS */}
              {isOpen && (
                <div className="border-t px-5 py-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-500">
                        <th className="text-left py-1">Date</th>
                        <th className="text-left py-1">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(c.records) && c.records.map((r, i) => (

                        <tr key={i} className="border-t">
                          <td className="py-2">
                            {new Date(r.date).toLocaleDateString()}
                          </td>
                          <td
                            className={`py-2 font-medium ${
                              r.status === "present"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {r.status === "present"
                              ? "Present"
                              : "Absent"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentAttendanceView;
