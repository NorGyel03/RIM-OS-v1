import api from "./axios";

export const getMyCourses = async () => {
  const res = await api.get("/faculty/courses");

  console.log("RAW courses response:", res.data);

  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.rows)) return res.data.rows;
  if (Array.isArray(res.data.data)) return res.data.data;

  return [];
};

export const markAttendance = async (payload) => {
  const res = await api.post("/attendance", payload);
  return res.data;
};

export const uploadMarks = async (payload) => {
  const res = await api.post("/marks", payload);
  return res.data;
};

export const getStudentsByCourse = async (courseId) => {
  const res = await api.get(`/faculty/courses/${courseId}/students`);
  return res.data;
};

export const uploadMark = async (data) => {
  const res = await api.post("/marks", data);
  return res.data;
};

