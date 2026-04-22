import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.DBPASSWORD, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

async function connect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Conexão com SQL estabelecida");
  } catch (error) {
    console.error("Erro ao conectar no SQL:", error);
  }
}

export { sequelize, connect };