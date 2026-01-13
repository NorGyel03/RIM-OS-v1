import { createOffering, getOfferings } from "./courseOfferings.service.js";

export const addOffering = async (req, res) => {
  await createOffering(req.body);
  res.status(201).json({ message: "Course offering created" });
};

export const listOfferings = async (req, res) => {
  res.json(await getOfferings());
};
