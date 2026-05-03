import Professor from "../models/Professor.js";
import User from "../models/User.js";

const professorController = {
  async update(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const professor = await Professor.findByPk(req.params.id);
      if (!professor) return res.status(404).json({ message: "Professor não encontrado" });

      const user = await User.findByPk(professor.user_id);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      const updates = { name, email };
      if (password) {
        const bcrypt = await import("bcryptjs");
        updates.password = await bcrypt.hash(password, 10);
      }

      await user.update(updates);
      return res.status(200).json({ message: "Professor atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const professor = await Professor.findByPk(req.params.id);
      if (!professor) return res.status(404).json({ message: "Professor não encontrado" });

      const user = await User.findByPk(professor.user_id);
      await professor.destroy();
      if (user) await user.destroy();

      return res.status(200).json({ message: "Professor deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  },
};

export default professorController;