import { getDepartments } from "./departments.service.js";

export const listDepartments = async (req, res) => {
  try {
    const departments = await getDepartments();
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};
