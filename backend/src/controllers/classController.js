import Class from "../models/Class.js";
import User from "../models/User.js";
import Professor from "../models/Professor.js";
import Enrollment from "../models/Enrollment.js";

const classController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Class.findAndCountAll({
        limit,
        offset,
        include: {
          model: User,
          as: "professor",
          attributes: ["id", "name", "email"],
        },
      });

      return res.status(200).json({
        total: count,
        pagina: page,
        totalPaginas: Math.ceil(count / limit),
        turmas: rows,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProfessores(req, res, next) {
    try {
      const professores = await Professor.findAll({
        attributes: [["id", "professor_id"], "user_id"],
        include: {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
      });
      return res.status(200).json(professores);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
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
      next(error);
    }
  },

  async getMyClasses(req, res, next) {
    try {
      const professor = await Professor.findOne({
        where: { user_id: req.user.id },
      });
      if (!professor)
        return res.status(404).json({ message: "Professor não encontrado" });

      const classes = await Class.findAll({
        where: { professor_id: professor.user_id },
        include: {
          model: User,
          as: "professor",
          attributes: ["id", "name", "email"],
        },
      });

      return res.status(200).json(classes);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
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
      next(error);
    }
  },

  async update(req, res, next) {
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
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const turma = await Class.findByPk(req.params.id);
      if (!turma) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }

      await Enrollment.destroy({ where: { class_id: req.params.id } });
      await turma.destroy();

      return res.status(200).json({ message: "Turma deletada com sucesso" });
    } catch (error) {
      next(error);
    }
  },
};

export default classController;
