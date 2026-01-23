import { pool } from "../../config/db.js";

/* =========================
   CREATE PROFILE
========================= */
export const createUserProfile = async (profile) => {
  const {
    userId,
    firstName,
    middleName,
    lastName,
    gender,
    dateOfBirth,
    email,
    phone,
    address,
    nationality,
  } = profile;

  await pool.query(
    `
    INSERT INTO user_profiles (
      user_id,
      first_name,
      middle_name,
      last_name,
      gender,
      date_of_birth,
      email,
      phone,
      address,
      nationality
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `,
    [
      userId,
      firstName,
      middleName || null,
      lastName,
      gender || null,
      dateOfBirth || null,
      email || null,
      phone || null,
      address || null,
      nationality || null,
    ]
  );
};

/* =========================
   GET PROFILE BY USER
========================= */
export const getUserProfileByUserId = async (userId) => {
  const res = await pool.query(
    `SELECT * FROM user_profiles WHERE user_id = $1`,
    [userId]
  );
  return res.rows[0];
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateUserProfile = async (userId, profile) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    dateOfBirth,
    email,
    phone,
    address,
    nationality,
  } = profile;

  await pool.query(
    `
    UPDATE user_profiles
    SET
      first_name = $2,
      middle_name = $3,
      last_name = $4,
      gender = $5,
      date_of_birth = $6,
      email = $7,
      phone = $8,
      address = $9,
      nationality = $10
    WHERE user_id = $1
    `,
    [
      userId,
      firstName,
      middleName || null,
      lastName,
      gender || null,
      dateOfBirth || null,
      email || null,
      phone || null,
      address || null,
      nationality || null,
    ]
  );
};
