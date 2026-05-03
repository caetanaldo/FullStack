import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userController = {
  async update(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await User.findByPk(req.params.id);

      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
      if (user.id !== req.user.id) return res.status(403).json({ message: "Acesso negado" });

      const updates = { name, email };
      if (password) updates.password = await bcrypt.hash(password, 10);

      await user.update(updates);

      const token = jwt.sign(
        { id: user.id, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.status(200).json({ message: "Perfil atualizado com sucesso", token });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;