import { createStudent, getStudents } from "./students.service.js";

export const addStudent = async (req, res) => {
  await createStudent(req.body);
  res.status(201).json({ message: "Student created" });
};

export const listStudents = async (req, res) => {
  res.json(await getStudents());
};
