import { DataTypes } from "sequelize";
import { sequelize } from "../database/SqlConnection.js";
import Student from "./Student.js";
import Class from "./Class.js";
import Grade from "./Grade.js";

const Enrollment = sequelize.define("enrollments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

Enrollment.belongsTo(Student, { foreignKey: "student_id" });
Enrollment.belongsTo(Class, { foreignKey: "class_id" });
Enrollment.hasMany(Grade, {
  foreignKey: "student_id",
});
Student.hasMany(Enrollment, { foreignKey: "student_id", as: "matriculas" });
Class.hasMany(Enrollment, { foreignKey: "class_id", as: "matriculas" });

Student.belongsToMany(Class, { through: Enrollment, foreignKey: "student_id", as: "turmas" });
Class.belongsToMany(Student, { through: Enrollment, foreignKey: "class_id", as: "alunos" });

export default Enrollment;