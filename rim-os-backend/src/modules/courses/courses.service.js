import { pool } from "../../config/db.js";

export const createCourse = async (data) => {
  const { program_id, code, title, credit, semester } = data;
  await pool.query(
    `INSERT INTO courses(program_id,code,title,credit,semester)
     VALUES($1,$2,$3,$4,$5)`,
    [program_id, code, title, credit, semester]
  );
};

export const getCourses = async () => {
  const result = await pool.query(
    `SELECT c.*, p.name as program
     FROM courses c
     JOIN programs p ON c.program_id = p.id`
  );
  return result.rows;
};
