import Class from "../models/Class.js";
import User from "../models/User.js";
import Professor from "../models/Professor.js";

const classController = {
  async getAll(req, res) {
    try {
      const classes = await Class.findAll({
        include: {
          model: User,
          as: "professor",
          attributes: ["id", "name", "email"],
        },
      });
      return res.status(200).json(classes);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar turmas", error });
    }
  },

  async getProfessores(req, res) {
    try {
      const professores = await User.findAll({
        where: { role: "professor" },
        attributes: ["id", "name", "email"],
      });
      return res.status(200).json(professores);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar professores", error });
    }
  },

  async getById(req, res) {
    try {
      const turma = await Class.findByPk(req.params.id, {
        include: {
          model: User,
          as: "professor",
          attributes: ["id", "name", "email"],
        },
      });

      if (!turma) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }

      return res.status(200).json(turma);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar turma", error });
    }
  },

  async create(req, res) {
    try {
      const { name, description, professor_id } = req.body;

      const professor = await Professor.findByPk(professor_id);
      if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado" });
      }

      const turma = await Class.create({
        name,
        description,
        professor_id: professor.user_id,
      });
      return res
        .status(201)
        .json({ message: "Turma criada com sucesso", turma });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar turma", error });
    }
  },

  async update(req, res) {
    try {
      const { name, description } = req.body;

      const turma = await Class.findByPk(req.params.id);
      if (!turma) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }

      await turma.update({ name, description });
      return res
        .status(200)
        .json({ message: "Turma atualizada com sucesso", turma });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar turma", error });
    }
  },

  async delete(req, res) {
    try {
      const turma = await Class.findByPk(req.params.id);
      if (!turma) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }

      await turma.destroy();
      return res.status(200).json({ message: "Turma deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar turma", error });
    }
  },
};

export default classController;
