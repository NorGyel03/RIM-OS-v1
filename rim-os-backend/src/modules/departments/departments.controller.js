import {
  createDepartment,
  getAllDepartments,
} from "./departments.service.js";

export const create = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res
        .status(400)
        .json({ message: "Name and code are required" });
    }

    const dept = await createDepartment({
      name: name.trim(),
      code: code.trim().toUpperCase(),
    });

    res.status(201).json(dept);
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ message: "Department code already exists" });
    }

    console.error(err);
    res.status(500).json({ message: "Failed to create department" });
  }
};

export const list = async (_req, res) => {
  try {
    const data = await getAllDepartments();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};
