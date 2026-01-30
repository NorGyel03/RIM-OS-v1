import * as userProfileService from "./userProfiles.service.js";

/* =========================
   ADMIN / SHARED VIEW
========================= */
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const profile =
      await userProfileService.getUserProfileByUserId(userId);

    res.json(profile || null);
  } catch (err) {
    console.error("❌ Get user profile error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};


/* =========================
   CURRENT USER PROFILE
========================= */
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile =
      await userProfileService.getUserProfileByUserId(userId);

    res.json(profile || null);
  } catch (err) {
    console.error("❌ Get my profile error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* =========================
   CREATE PROFILE
========================= */
import { pool } from "../../config/db.js";

export const createUserProfile = async (req, res) => {
  try {
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
    } = req.body;

    if (!userId || !firstName || !lastName) {
      return res.status(400).json({
        message: "User, first name and last name are required",
      });
    }

    await pool.query(
      `
      INSERT INTO user_profiles (
        user_id, first_name, middle_name, last_name,
        gender, date_of_birth, email, phone, address, nationality
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      ON CONFLICT (user_id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        middle_name = EXCLUDED.middle_name,
        last_name = EXCLUDED.last_name,
        gender = EXCLUDED.gender,
        date_of_birth = EXCLUDED.date_of_birth,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        address = EXCLUDED.address,
        nationality = EXCLUDED.nationality,
        updated_at = CURRENT_TIMESTAMP
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

    res.json({ message: "Profile saved successfully" });
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ message: "Failed to save profile" });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    await userProfileService.updateUserProfile(
      userId,
      req.body
    );

    res.json({ message: "Profile updated" });
  } catch (err) {
    console.error("❌ Update profile error:", err);
    res.status(500).json({ message: err.message });
  }
};
