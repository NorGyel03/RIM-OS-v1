import { computeAndStoreFinalScore } from "./gpa.service.js";
import { getGPAForStudent } from "./gpa.service.js";


export const computeFinal = async (req, res) => {
  try {
    const { studentId, courseId, semester, academicYear } = req.body;

    if (!studentId || !courseId || !semester || !academicYear) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await computeAndStoreFinalScore({
      studentId,
      courseId,
      semester,
      academicYear,
    });

    res.json({
      message: "Final score computed",
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};


export const myGPA = async (req, res) => {
  try {
    const data = await getGPAForStudent(req.user.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch GPA" });
  }
};
