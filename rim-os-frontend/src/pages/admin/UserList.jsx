import { useEffect, useState } from "react";
import api from "../../api/axios";

const UserList = () => {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    api.get("/admin/students").then(res => setStudents(res.data));
    api.get("/admin/faculty").then(res => setFaculty(res.data));
  }, []);

  return (
    <div className="space-y-10">

      <h2 className="text-2xl font-semibold">User Profiles</h2>

      {/* STUDENTS */}
      <div>
        <h3 className="font-medium mb-2">Students</h3>
        <table className="w-full border">
          <thead className="bg-slate-100">
            <tr>
              <th className="border p-2 text-left">Username</th>
              <th className="border p-2 text-left">Program</th>
              <th className="border p-2 text-left">Enrollment No</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td className="border p-2">{s.username}</td>
                <td className="border p-2">{s.program_name}</td>
                <td className="border p-2">{s.enrollment_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FACULTY */}
      <div>
        <h3 className="font-medium mb-2">Faculty</h3>
        <table className="w-full border">
          <thead className="bg-slate-100">
            <tr>
              <th className="border p-2 text-left">Username</th>
              <th className="border p-2 text-left">Department</th>
              <th className="border p-2 text-left">Designation</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map(f => (
              <tr key={f.id}>
                <td className="border p-2">{f.username}</td>
                <td className="border p-2">{f.department_name}</td>
                <td className="border p-2">{f.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UserList;
