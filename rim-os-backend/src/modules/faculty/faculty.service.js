import { pool } from "../../config/db.js";

export const createFaculty = async (data) => {
  const { user_id, department_id, designation } = data;

  await pool.query(
    `INSERT INTO faculty(user_id, department_id, designation)
     VALUES($1,$2,$3)`,
    [user_id, department_id, designation]
  );
};

export const getFaculty = async () => {
  const result = await pool.query(
    `SELECT f.*, u.username, d.name AS department
     FROM faculty f
     JOIN users u ON f.user_id = u.id
     JOIN departments d ON f.department_id = d.id`
  );
  return result.rows;
};
