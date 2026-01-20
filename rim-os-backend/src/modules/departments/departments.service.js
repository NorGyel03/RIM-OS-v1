import { pool } from "../../config/db.js";

export const getDepartments = async () => {
  const { rows } = await pool.query(
    `SELECT id, name FROM departments ORDER BY name`
  );
  return rows;
};
