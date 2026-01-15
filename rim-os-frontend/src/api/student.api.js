import api from "./axios";

export const getMyGPA = async () => {
  const res = await api.get("/gpa/me");
  return res.data;
};

export const getMyAttendance = async () => {
  const res = await api.get("/attendance/me");
  return res.data;
};

export const getMyTranscript = async () => {
  const res = await api.get("/transcripts/me");
  return res.data;
};
