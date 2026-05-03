import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Professor from "../models/Professor.js";

// ✅ Validação removida daqui — vive apenas em src/validators/authValidator.js
// O middleware validate() já garante que req.body chega limpo e correto.

const authController = {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword, role });

      if (user.role === "aluno") {
        await Student.create({ name, email, user_id: user.id });
      }

      if (user.role === "professor") {
        await Professor.create({ user_id: user.id });
      }

      return res.status(201).json({ message: "Usuário criado com sucesso", user });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.status(200).json({ message: "Login realizado com sucesso", token });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao fazer login", error });
    }
  },
};

export default authController;
