import { DataTypes } from "sequelize";
import { sequelize } from "../database/SqlConnection.js";
import Grade from "./Grade.js";

const GradeHistory = sequelize.define("grade_history", {
  grade_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "grades", key: "id" },
  },
  old_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  new_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  changed_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

GradeHistory.belongsTo(Grade, { foreignKey: "grade_id" });
Grade.hasMany(GradeHistory, { foreignKey: "grade_id", as: "history" });

export default GradeHistory;