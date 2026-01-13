import { authenticateUser, registerUser } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser(username, password, role);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Username already exists" });
    }

    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const token = await authenticateUser(username, password);

    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
