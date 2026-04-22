import { DataTypes } from "sequelize";
import { sequelize } from "../database/SqlConnection.js";
import User from "./User.js";

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

export default Professor;