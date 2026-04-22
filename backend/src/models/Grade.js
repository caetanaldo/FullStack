import { DataTypes } from "sequelize";
import { sequelize } from "../database/SqlConnection.js";
import Student from "./Student.js";
import Class from "./Class.js";

const Grade = sequelize.define("grades", {
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "students",
      key: "id",
    },
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "classes",
      key: "id",
    },
  },
});

Grade.belongsTo(Student, { foreignKey: "student_id" });
Grade.belongsTo(Class, { foreignKey: "class_id" });

Student.hasMany(Grade, { foreignKey: "student_id" });
Class.hasMany(Grade, { foreignKey: "class_id" });

export default Grade;