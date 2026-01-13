import { createDepartment, getDepartments } from "./departments.service.js";

export const addDepartment = async (req, res) => {
  const { name, code } = req.body;
  await createDepartment(name, code);
  res.status(201).json({ message: "Department created" });
};

export const listDepartments = async (req, res) => {
  const data = await getDepartments();
  res.json(data);
};
