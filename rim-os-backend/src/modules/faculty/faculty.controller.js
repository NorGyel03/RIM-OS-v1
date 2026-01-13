import { createFaculty, getFaculty } from "./faculty.service.js";

export const addFaculty = async (req, res) => {
  await createFaculty(req.body);
  res.status(201).json({ message: "Faculty created" });
};

export const listFaculty = async (req, res) => {
  res.json(await getFaculty());
};
