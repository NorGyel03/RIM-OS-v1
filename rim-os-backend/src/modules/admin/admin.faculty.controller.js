import { getAllFaculty } from "./admin.faculty.service.js";

export const listFaculty = async (_req, res) => {
  try {
    const data = await getAllFaculty();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
};
