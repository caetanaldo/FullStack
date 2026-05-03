import { DataTypes } from "sequelize";
import { sequelize } from "../database/SqlConnection.js";
import User from "./User.js";

const Notification = sequelize.define("notifications", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataTypes.ENUM("nota", "frequencia", "geral"),
    defaultValue: "geral",
  },
});

Notification.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Notification, { foreignKey: "user_id" });

export default Notification;