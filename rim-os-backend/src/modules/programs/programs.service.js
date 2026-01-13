import { pool } from "../../config/db.js";

export const createProgram = async (data) => {
  const { department_id, name, level, duration_years } = data;
  await pool.query(
    `INSERT INTO programs(department_id,name,level,duration_years)
     VALUES($1,$2,$3,$4)`,
    [department_id, name, level, duration_years]
  );
};

export const getPrograms = async () => {
  const result = await pool.query(
    `SELECT p.*, d.name as department
     FROM programs p
     JOIN departments d ON p.department_id = d.id`
  );
  return result.rows;
};
