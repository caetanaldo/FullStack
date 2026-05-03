import { DataTypes } from "sequelize";
import { sequelize } from "../database/SqlConnection.js";
import User from "./User.js";
import Class from "./Class.js";

const Professor = sequelize.define("professors", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

Professor.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasOne(Professor, { foreignKey: "user_id" });
Professor.hasMany(Class, { foreignKey: "professor_id", sourceKey: "user_id", as: "classes" });

export default Professor;