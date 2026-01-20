import { useEffect, useState } from "react";
import api from "../../api/axios";
import UserList from "../pages/admin/UserList";

const UserList = () => {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    api.get("/admin/students").then(res => setStudents(res.data));
    api.get("/admin/faculty").then(res => setFaculty(res.data));
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Users</h2>

      {/* STUDENTS */}
      <div>
        <h3 className="font-semibold mb-2">Students</h3>
        <table className="w-full border">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="border p-2">Username</th>
              <th className="border p-2">Program</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td className="border p-2">{s.username}</td>
                <td className="border p-2">{s.program}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FACULTY */}
      <div>
        <h3 className="font-semibold mb-2">Faculty</h3>
        <table className="w-full border">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="border p-2">Username</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Designation</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map(f => (
              <tr key={f.id}>
                <td className="border p-2">{f.username}</td>
                <td className="border p-2">{f.department}</td>
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
