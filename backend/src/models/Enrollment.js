import { DataTypes } from "sequelize";
import { sequelize } from "../database/SqlConnection.js";
import Student from "./Student.js";
import Class from "./Class.js";

const Enrollment = sequelize.define("enrollments", {
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

Student.belongsToMany(Class, { through: Enrollment, foreignKey: "student_id" });
Class.belongsToMany(Student, { through: Enrollment, foreignKey: "class_id" });

export default Enrollment;