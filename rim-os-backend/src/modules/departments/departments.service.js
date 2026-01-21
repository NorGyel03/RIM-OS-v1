import { pool } from "../../config/db.js";

export const createDepartment = async ({ name, code }) => {
  const { rows } = await pool.query(
    `
    INSERT INTO departments (name, code)
    VALUES ($1, $2)
    RETURNING id, name, code
    `,
    [name, code]
  );

  return rows[0];
};

export const getAllDepartments = async () => {
  const { rows } = await pool.query(
    `
    SELECT id, name, code
    FROM departments
    ORDER BY name
    `
  );

  return rows;
};
