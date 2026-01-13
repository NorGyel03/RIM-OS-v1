import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db.js";

export const createUser = async (username, password, role) => {
  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users(username,password,role) VALUES($1,$2,$3)",
    [username, hash, role]
  );
};

export const authenticate = async (username, password) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  if (!result.rows.length) return null;

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};
