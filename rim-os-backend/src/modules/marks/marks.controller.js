import { upsertMarks, getMarksForStudent } from "./marks.service.js";

export const uploadMarks = async (req, res) => {
  try {
    const { studentId, courseId, internal, final } = req.body;
    const facultyUserId = req.user.id;

    const marks = await upsertMarks({
      studentId,
      courseId,
      internal,
      final,
      facultyUserId
    });

    res.status(201).json(marks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload marks" });
  }
};

export const myMarks = async (req, res) => {
  try {
    const records = await getMarksForStudent(req.user.id);
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch marks" });
  }
};
