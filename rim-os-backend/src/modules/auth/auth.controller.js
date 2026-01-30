import { authenticateUser, registerUser } from "./auth.service.js";
import { pool } from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


/**
 * REGISTER (PENDING USER)
 */


export const register = async (req, res) => {
  const client = await pool.connect();

  try {
    console.log("REGISTER PAYLOAD:", req.body);

    await client.query("BEGIN");

    /* 1️⃣ DESTRUCTURE FIRST */
    const { username, password, role, profile } = req.body;

    const {
      firstName,
      middleName,
      lastName,
      gender,
      email,
      phone,
      nationality,
    } = profile;

    if (!firstName || !lastName) {
      throw new Error("First name and last name are required");
    }

    /* 2️⃣ CREATE USER */
    const hashed = await bcrypt.hash(password, 10);

    const userRes = await client.query(
      `
      INSERT INTO users (username, password, role, is_active)
      VALUES ($1, $2, $3, false)
      RETURNING id
      `,
      [username, hashed, role]
    );

    const userId = userRes.rows[0].id;

    /* 3️⃣ CREATE USER PROFILE */
    await client.query(
      `
      INSERT INTO user_profiles (
        user_id,
        first_name,
        middle_name,
        last_name,
        gender,
        email,
        phone,
        nationality
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
      [
        userId,
        firstName,
        middleName || null,
        lastName,
        gender || null,
        email || null,
        phone || null,
        nationality || null,
      ]
    );

    /* ❌ DO NOT create student/faculty rows here */

    await client.query("COMMIT");

    res.status(201).json({
      message: "Registration successful. Await admin activation.",
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("REGISTER ERROR:", err);
    res.status(400).json({ message: err.message });
  } finally {
    client.release();
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    /* 1️⃣ FIND USER */
    const userRes = await pool.query(
      `
      SELECT id, username, password, role, is_active
      FROM users
      WHERE username = $1
      `,
      [username]
    );

    if (userRes.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userRes.rows[0];

    /* 2️⃣ CHECK PASSWORD */
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    /* 3️⃣ CHECK ACTIVATION */
    if (!user.is_active) {
      return res.status(403).json({
        message: "Account not activated by admin",
      });
    }

    /* 4️⃣ ISSUE TOKEN */
    const token = jwt.sign(
      {
        id: user.id,        // ✅ THIS replaces userId
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
