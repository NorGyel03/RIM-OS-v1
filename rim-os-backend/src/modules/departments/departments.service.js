import { pool } from "../../config/db.js";

export const createDepartment = async (name, code) => {
  await pool.query(
    "INSERT INTO departments(name, code) VALUES($1,$2)",
    [name, code]
  );
};

export const getDepartments = async () => {
  const result = await pool.query("SELECT * FROM departments ORDER BY name");
  return result.rows;
};
