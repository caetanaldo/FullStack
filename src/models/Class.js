import { DataTypes } from "sequelize";
import { sequelize } from "../database/SqlConnection.js";
import User from "./User.js";

const Class = sequelize.define("classes", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  professor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

Class.belongsTo(User, { foreignKey: "professor_id", as: "professor" });
User.hasMany(Class, { foreignKey: "professor_id", as: "classes" });

export default Class;