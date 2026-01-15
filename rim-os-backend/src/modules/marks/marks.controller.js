import { upsertComponentMark } from "./marks.service.js";



export const uploadMark = async (req, res) => {
  try {
    const {
      studentId,
      courseId,
      component,
      score,
      maxScore
    } = req.body;

    const facultyUserId = req.user.id;

    const record = await upsertComponentMark({
      studentId,
      courseId,
      component,
      score,
      maxScore,
      facultyUserId
    });

    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload marks" });
  }
};

