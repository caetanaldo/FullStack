import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Professor from "../models/Professor.js";

const passwordSchema = z
  .string()
  .min(6, "A senha deve ter no mínimo 6 caracteres.")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número.");

const registerSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres."),
  email: z.string().email("E-mail inválido."),
  password: passwordSchema,
  role: z.enum(["admin", "professor", "aluno"], {
    errorMap: () => ({ message: "Role inválido. Use: admin, professor ou aluno." }),
  }).optional(),
});

const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

const authController = {
  async register(req, res) {
    try {
      const dados = registerSchema.parse(req.body);

      const userExists = await User.findOne({ where: { email: dados.email } });
      if (userExists) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(dados.password, 10);
      const user = await User.create({ name: dados.name, email: dados.email, password: hashedPassword, role: dados.role });

      if (user.role === "aluno") {
        await Student.create({ name: dados.name, email: dados.email, user_id: user.id });
      }

      if (user.role === "professor") {
        await Professor.create({ user_id: user.id });
      }

      return res.status(201).json({ message: "Usuário criado com sucesso", user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.issues[0].message });
      }
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  },

  async login(req, res) {
    try {
      const dados = loginSchema.parse(req.body);

      const user = await User.findOne({ where: { email: dados.email } });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const passwordMatch = await bcrypt.compare(dados.password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.status(200).json({ message: "Login realizado com sucesso", token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.issues[0].message });
      }
      return res.status(500).json({ message: "Erro ao fazer login", error });
    }
  },
};

export default authController;