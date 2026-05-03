import { DataTypes } from "sequelize";
import { sequelize } from "../database/SqlConnection.js";
import Student from "./Student.js";
import Class from "./Class.js";

const Attendance = sequelize.define("attendances", {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "students", key: "id" },
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "classes", key: "id" },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("presente", "falta", "justificada"),
    allowNull: false,
    defaultValue: "presente",
  },
});

Attendance.belongsTo(Student, { foreignKey: "student_id" });
Attendance.belongsTo(Class, { foreignKey: "class_id" });
Student.hasMany(Attendance, { foreignKey: "student_id" });
Class.hasMany(Attendance, { foreignKey: "class_id" });

export default Attendance;