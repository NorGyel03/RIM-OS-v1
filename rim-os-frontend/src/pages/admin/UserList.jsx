import { useEffect, useState } from "react";
import api from "../../api/axios";
import UserProfileView from "./UserProfileView";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [viewUserId, setViewUserId] = useState(null);

  /* LOAD DATA */
  useEffect(() => {
    api.get("/admin/user-status").then(res => setUsers(res.data));
    api.get("/admin/students").then(res => setStudents(res.data));
    api.get("/admin/faculty").then(res => setFaculty(res.data));
  }, []);

  /* HELPERS */
  const getStudent = (userId) =>
    students.find(s => s.user_id === userId);

  const getFaculty = (userId) =>
    faculty.find(f => f.user_id === userId);

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-2xl font-semibold">User Database</h2>

      <table className="w-full border">
        <thead className="bg-slate-100">
          <tr>
            <th className="border p-2 text-left">Username</th>
            <th className="border p-2 text-left">Details</th>
            <th className="border p-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => {
            const student = getStudent(u.id);
            const facultyMember = getFaculty(u.id);

            return (
              <tr key={u.id} className="hover:bg-slate-50">
                {/* USERNAME (CLICKABLE) */}
                <td
                  className="border p-2 text-indigo-600 cursor-pointer underline"
                  onClick={() => setViewUserId(u.id)}
                >
                  {u.username}
                </td>

                {/* DETAILS */}
                <td className="border p-2 text-sm">
                  {student && (
                    <div>
                      🎓 {student.program_name} — {student.enrollment_no}
                    </div>
                  )}

                  {facultyMember && (
                    <div>
                      👨‍🏫 {facultyMember.department_name}
                      {facultyMember.designation
                        ? ` (${facultyMember.designation})`
                        : ""}
                    </div>
                  )}

                  {!student && !facultyMember && (
                    <span className="text-slate-400">—</span>
                  )}
                </td>

                {/* STATUS BADGES */}
                <td className="border p-2 space-x-2">
                  {u.has_profile && (
                    <span className="text-xs bg-green-100 px-2 py-1 rounded">
                      Bio
                    </span>
                  )}
                  {u.is_student && (
                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                      Student
                    </span>
                  )}
                  {u.is_faculty && (
                    <span className="text-xs bg-purple-100 px-2 py-1 rounded">
                      Faculty
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* BIO DATA MODAL */}
      {viewUserId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <UserProfileView
            userId={viewUserId}
            onClose={() => setViewUserId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;
