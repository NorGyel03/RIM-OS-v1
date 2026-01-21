import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db.js";

export const registerUser = async (username, password, role) => {
  if (!password) {
    throw new Error("Password is missing");
  }

  const hashedPassword = await bcrypt.hash(password, 10); // ✅ salt added

  const { rows } = await pool.query(
    `
    INSERT INTO users (username, password, role, is_active)
    VALUES ($1, $2, $3, false)
    RETURNING id, username, role, is_active
    `,
    [username, hashedPassword, role]
  );

  return rows[0];
};


export const authenticateUser = async (username, password) => {
  const { rows } = await pool.query(
    `
    SELECT id, password, role, is_active
    FROM users
    WHERE username = $1
    `,
    [username]
  );

  if (rows.length === 0) {
    return null;
  }

  const user = rows[0];

  if (!user.is_active) {
    return null;
  }

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
