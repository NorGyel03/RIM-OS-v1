import { useEffect, useState } from "react";
import api from "../../api/axios";

const Users = () => {
  /* =========================
     SHARED STATE
  ========================= */
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [users, setUsers] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);

  /* =========================
     CREATE STUDENT FORM
  ========================= */
  const [studentForm, setStudentForm] = useState({
    username: "",
    password: "",
    programId: "",
  });

  /* =========================
     CREATE FACULTY FORM
  ========================= */
  const [facultyForm, setFacultyForm] = useState({
    username: "",
    password: "",
    departmentId: "",
    designation: "",
  });

  /* =========================
     LOAD INITIAL DATA
  ========================= */
  useEffect(() => {
    loadDepartments();
    loadPrograms();
    loadUsers();
  }, []);

  const loadDepartments = async () => {
    const res = await api.get("/admin/departments");
    setDepartments(res.data);
  };

  const loadPrograms = async () => {
    const res = await api.get("/admin/programs");
    setPrograms(res.data);
  };

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  /* =========================
     CREATE STUDENT
  ========================= */
  const handleCreateStudent = async (e) => {
    e.preventDefault();

    const { username, password, programId } = studentForm;
    if (!username || !password || !programId) {
      alert("All student fields are required");
      return;
    }

    try {
      await api.post("/admin/students", {
        username,
        password,
        programId,
      });
      alert("Student created");
      setStudentForm({ username: "", password: "", programId: "" });
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to create student");
    }
  };

  /* =========================
     CREATE FACULTY
  ========================= */
  const handleCreateFaculty = async (e) => {
    e.preventDefault();

    const { username, password, departmentId, designation } = facultyForm;
    if (!username || !password || !departmentId) {
      alert("All faculty fields are required");
      return;
    }

    try {
      await api.post("/admin/faculty", {
        username,
        password,
        departmentId,
        designation,
      });
      alert("Faculty created");
      setFacultyForm({
        username: "",
        password: "",
        departmentId: "",
        designation: "",
      });
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to create faculty");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        User Management
      </h2>

      {/* =========================
          CREATE STUDENT
      ========================= */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Create Student</h3>

        <form onSubmit={handleCreateStudent}>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Username"
            value={studentForm.username}
            onChange={(e) =>
              setStudentForm({ ...studentForm, username: e.target.value })
            }
          />

          <input
            type="password"
            className="border p-2 w-full mb-2"
            placeholder="Password"
            value={studentForm.password}
            onChange={(e) =>
              setStudentForm({ ...studentForm, password: e.target.value })
            }
          />

          <select
            className="border p-2 w-full mb-3"
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

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Create Student
          </button>
        </form>
      </div>

      {/* =========================
          CREATE FACULTY
      ========================= */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Create Faculty</h3>

        <form onSubmit={handleCreateFaculty}>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Username"
            value={facultyForm.username}
            onChange={(e) =>
              setFacultyForm({ ...facultyForm, username: e.target.value })
            }
          />

          <input
            type="password"
            className="border p-2 w-full mb-2"
            placeholder="Password"
            value={facultyForm.password}
            onChange={(e) =>
              setFacultyForm({ ...facultyForm, password: e.target.value })
            }
          />

          <select
            className="border p-2 w-full mb-2"
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
            className="border p-2 w-full mb-3"
            placeholder="Designation (optional)"
            value={facultyForm.designation}
            onChange={(e) =>
              setFacultyForm({
                ...facultyForm,
                designation: e.target.value,
              })
            }
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Create Faculty
          </button>
        </form>
      </div>

    </div>
  );
};

export default Users;
