import api from "./axios";

/* Programs & courses already exist if you need later */
export const getAdminStudents = async () => {
  const res = await api.get("/admin/students");
  return res.data;
};

export const getAdminCourses = async () => {
  const res = await api.get("/admin/courses");
  return res.data;
};

export const enrollStudent = async ({ studentId, courseId }) => {
  const res = await api.post("/admin/enroll", {
    studentId,
    courseId,
  });
  return res.data;
};

export const getPrograms = async () => {
  const res = await api.get("/admin/programs");
  return res.data;
};

export const createProgram = async ({ name, departmentId }) => {
  const res = await api.post("/admin/programs", {
    name,
    departmentId,
  });
  return res.data;
};


export const getPendingUsers = () =>
  api.get("/admin/pending-users");

export const approveUser = (userId) =>
  api.post(`/admin/approve-user/${userId}`);

export const rejectUser = (userId) =>
  api.delete(`/admin/reject-user/${userId}`);

export const getStudentsForGPA = async (courseId) => {
  const res = await api.get(
    `/gpa/course/${courseId}/students`
  );
  return res.data;
};