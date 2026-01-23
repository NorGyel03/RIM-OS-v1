import * as service from "./userProfiles.service.js";

/* =========================
   CREATE PROFILE (ADMIN)
========================= */
export const createProfile = async (req, res) => {
  try {
    await service.createUserProfile(req.body);
    res.status(201).json({ message: "User profile created" });
  } catch (err) {
    console.error("❌ Create profile error:", err);

    if (err.code === "23505") {
      return res.status(400).json({
        message: "Profile already exists for this user",
      });
    }

    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET PROFILE
========================= */
export const getProfile = async (req, res) => {
  try {
    const profile = await service.getUserProfileByUserId(
      req.params.userId
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("❌ Get profile error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfile = async (req, res) => {
  try {
    await service.updateUserProfile(req.params.userId, req.body);
    res.json({ message: "Profile updated" });
  } catch (err) {
    console.error("❌ Update profile error:", err);
      return res.json(null); 

  }
};
