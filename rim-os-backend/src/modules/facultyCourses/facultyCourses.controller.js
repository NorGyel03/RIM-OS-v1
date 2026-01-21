import {
  assignFacultyToCourse,
  getFacultyCourses,
} from "./facultyCourses.service.js";

export const assign = async (req, res) => {
  try {
    const { facultyId, courseId } = req.body;

    if (!facultyId || !courseId) {
      return res
        .status(400)
        .json({ message: "facultyId and courseId required" });
    }

    const record = await assignFacultyToCourse({
      facultyId,
      courseId,
    });

    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to assign faculty to course" });
  }
};

export const myCourses = async (req, res) => {
  try {
    const data = await getFacultyCourses(req.user.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch faculty courses" });
  }
};
