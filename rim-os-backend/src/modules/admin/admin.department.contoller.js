import { pool } from "../../config/db.js";

export const getDepartments = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name FROM departments ORDER BY name"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};
