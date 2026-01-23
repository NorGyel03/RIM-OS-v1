import api from "./axios";

export const getUserProfile = (userId) =>
  api.get(`/user-profiles/${userId}`);

export const createUserProfile = (data) =>
  api.post("/user-profiles", data);

export const updateUserProfile = (userId, data) =>
  api.put(`/user-profiles/${userId}`, data);
