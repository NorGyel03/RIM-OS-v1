import { createProgram, getPrograms } from "./programs.service.js";

export const addProgram = async (req, res) => {
  await createProgram(req.body);
  res.status(201).json({ message: "Program created" });
};

export const listPrograms = async (req, res) => {
  res.json(await getPrograms());
};
