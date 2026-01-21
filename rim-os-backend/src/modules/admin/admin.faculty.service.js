import { pool } from "../../config/db.js";

export const getAllFaculty = async () => {
  const { rows } = await pool.query(
    `
    SELECT
      f.id,
      u.username,
      f.designation
    FROM faculty f
    JOIN users u ON u.id = f.user_id
    ORDER BY u.username
    `
  );

  return rows;
};
