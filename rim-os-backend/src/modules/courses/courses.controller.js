import { createCourse, getCourses } from "./courses.service.js";

export const addCourse = async (req, res) => {
  await createCourse(req.body);
  res.status(201).json({ message: "Course created" });
};

export const listCourses = async (req, res) => {
  res.json(await getCourses());
};
