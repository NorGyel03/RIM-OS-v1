import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db.js";

export const registerUser = async (username, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (username, password, role)
    VALUES ($1, $2, $3)
    RETURNING id, username, role
    `,
    [username, hashedPassword, role]
  );

  return result.rows[0];
};

export const authenticateUser = async (username, password) => {
  const result = await pool.query(
    "SELECT id, username, password, role FROM users WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};
