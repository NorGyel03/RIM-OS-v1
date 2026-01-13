import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

export const Enrollment = sequelize.define("Enrollment", {
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});
