import { useEffect, useState } from "react";
import api from "../../api/axios";
import UserProfileForm from "./UserProfileForm";

const Users = () => {
  /* =========================
     SHARED DATA
  ========================= */
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedProfileUser, setSelectedProfileUser] = useState(null);

  /* =========================
     STUDENT FORM
  ========================= */
  const [studentForm, setStudentForm] = useState({
    programId: "",
    enrollmentNo: "",
    admissionYear: "",
  });

  /* =========================
     FACULTY FORM
  ========================= */
  const [facultyForm, setFacultyForm] = useState({
    departmentId: "",
    designation: "",
  });

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    loadUsers();
    loadDepartments();
    loadPrograms();
  }, []);

  const loadUsers = async () => {
    const res = await api.get("/admin/users?unassigned=true");
    setUsers(res.data);
  };

  const loadDepartments = async () => {
    const res = await api.get("/admin/departments");
    setDepartments(res.data);
  };

  const loadPrograms = async () => {
    const res = await api.get("/admin/programs");
    setPrograms(res.data);
  };

  /* =========================
     CREATE STUDENT PROFILE
  ========================= */
  const handleCreateStudent = async (e) => {
    e.preventDefault();

    const { programId, enrollmentNo, admissionYear } = studentForm;

    if (!selectedUserId || !programId || !enrollmentNo || !admissionYear) {
      alert("All fields are required");
      return;
    }

    try {
      await api.post("/admin/create-student-profile", {
        userId: selectedUserId,
        programId,
        enrollmentNo,
        admissionYear: Number(admissionYear),
      });

      alert("Student profile created successfully");

      setStudentForm({
        programId: "",
        enrollmentNo: "",
        admissionYear: "",
      });
      setSelectedUserId("");
      loadUsers();
    } catch (err) {
      console.error("❌ Create student failed:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to create student");
    }
  };

  /* =========================
     CREATE FACULTY PROFILE
  ========================= */
  const handleCreateFaculty = async (e) => {
    e.preventDefault();

    const { departmentId, designation } = facultyForm;

    if (!selectedUserId || !departmentId) {
      alert("User and department are required");
      return;
    }

    try {
      await api.post("/admin/create-faculty-profile", {
        userId: selectedUserId,
        departmentId,
        designation,
      });

      alert("Faculty profile created successfully");

      setFacultyForm({
        departmentId: "",
        designation: "",
      });
      setSelectedUserId("");
      loadUsers();
    } catch (err) {
      console.error("❌ Create faculty failed:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to create faculty");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <h2 className="text-2xl font-semibold text-white">
        Assign Student / Faculty Profiles
      </h2>

      {/* SELECT USER */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-black font-medium mb-3">Select User</h3>

        <div className="flex gap-3">
          <select
            className="border p-2 w-full"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>

          {selectedUserId && (
            <button
              onClick={() => setSelectedProfileUser(selectedUserId)}
              className="px-8 py-2 bg-slate-500 border rounded text-indigo-950"
            >
              Bio Data
            </button>
          )}
        </div>
      </div>

      {/* STUDENT PROFILE */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-black font-medium mb-4">
          Create Student Profile
        </h3>

        <form onSubmit={handleCreateStudent} className="space-y-3">
          <select
            className="border p-2 w-full"
            value={studentForm.programId}
            onChange={(e) =>
              setStudentForm({ ...studentForm, programId: e.target.value })
            }
          >
            <option value="">Select Program</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            className="border p-2 w-full"
            placeholder="Enrollment Number"
            value={studentForm.enrollmentNo}
            onChange={(e) =>
              setStudentForm({
                ...studentForm,
                enrollmentNo: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Admission Year"
            value={studentForm.admissionYear}
            onChange={(e) =>
              setStudentForm({
                ...studentForm,
                admissionYear: e.target.value,
              })
            }
          />

          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Create Student Profile
          </button>
        </form>
      </div>

      {/* FACULTY PROFILE */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-medium mb-4 text-black">
          Create Faculty Profile
        </h3>

        <form onSubmit={handleCreateFaculty} className="space-y-3">
          <select
            className="border p-2 w-full"
            value={facultyForm.departmentId}
            onChange={(e) =>
              setFacultyForm({
                ...facultyForm,
                departmentId: e.target.value,
              })
            }
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <input
            className="border p-2 w-full"
            placeholder="Designation (optional)"
            value={facultyForm.designation}
            onChange={(e) =>
              setFacultyForm({
                ...facultyForm,
                designation: e.target.value,
              })
            }
          />

          <button className="bg-emerald-600 text-white px-4 py-2 rounded">
            Create Faculty Profile
          </button>
        </form>
      </div>

      {/* BIO DATA MODAL */}
      {selectedProfileUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <UserProfileForm
            userId={selectedProfileUser}
            onClose={() => setSelectedProfileUser(null)}
          />
        </div>
      )}
    
    And modal render:

      {selectedProfileUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <UserProfileForm
            userId={selectedProfileUser}
            onClose={() => setSelectedProfileUser(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
