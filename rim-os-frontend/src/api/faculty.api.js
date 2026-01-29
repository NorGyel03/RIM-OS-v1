import api from "./axios";

export const getMyCourses = async () => {
  const res = await api.get("/faculty-courses/me");
  return res.data;
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
  const res = await api.get(`/attendance/course/${courseId}/students`);
  return res.data;
};

export const uploadMark = async (data) => {
  const res = await api.post("/marks", data);
  return res.data;
};

