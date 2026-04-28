import bcrypt from "bcryptjs";
import User from "../models/User.js";

export async function seedAdmin() {
  const exists = await User.findOne({ where: { role: "admin" } });
  if (exists) {
    console.log("ℹ️  Admin já existe, seed ignorado.");
    return;
  }

  await User.create({
    name: "Admin",
    email: "admin@admin.com",
    password: await bcrypt.hash("Admin123", 10),
    role: "admin",
  });

  console.log("✅ Admin inicial criado!");
  console.log("   Email: admin@admin.com");
  console.log("   Senha: Admin123");
  console.log("   ⚠️  Troque a senha após o primeiro login!");
}