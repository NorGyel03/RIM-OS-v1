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
export const createUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    await userProfileService.createUserProfile({
      userId,
      ...req.body,
    });

    res.status(201).json({ message: "Profile created" });
  } catch (err) {
    console.error("❌ Create profile error:", err);

    if (err.code === "23505") {
      return res
        .status(400)
        .json({ message: "Profile already exists" });
    }

    res.status(500).json({ message: err.message });
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
