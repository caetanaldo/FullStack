import Grade from "../models/Grade.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";

const gradeController = {
  async getAll(req, res) {
    try {
      const grades = await Grade.findAll({
        include: [
          { model: Student, attributes: ["id", "name", "email"] },
          { model: Class, attributes: ["id", "name"] },
        ],
      });
      return res.status(200).json(grades);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar notas", error });
    }
  },

  async getById(req, res) {
    try {
      const grade = await Grade.findByPk(req.params.id, {
        include: [
          { model: Student, attributes: ["id", "name", "email"] },
          { model: Class, attributes: ["id", "name"] },
        ],
      });
      if (!grade) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }
      return res.status(200).json(grade);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar nota", error });
    }
  },

  async create(req, res) {
    try {
      const { student_id, class_id, value } = req.body;

      const student = await Student.findByPk(student_id);
      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      const turma = await Class.findByPk(class_id);
      if (!turma) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }

      if (value < 0 || value > 10) {
        return res.status(400).json({ message: "Nota deve ser entre 0 e 10" });
      }

      await Grade.create({ student_id, class_id, value });

      return res.status(201).json({
        message: "Nota lançada com sucesso",
        nota: {
          aluno: student.name,
          turma: turma.name,
          valor: value,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao lançar nota", error });
    }
  },

  async update(req, res) {
    try {
      const { value } = req.body;

      if (value < 0 || value > 10) {
        return res.status(400).json({ message: "Nota deve ser entre 0 e 10" });
      }

      const grade = await Grade.findByPk(req.params.id);
      if (!grade) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }

      await grade.update({ value });
      return res.status(200).json({ message: "Nota atualizada com sucesso", grade });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar nota", error });
    }
  },

  async delete(req, res) {
    try {
      const grade = await Grade.findByPk(req.params.id);
      if (!grade) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }

      await grade.destroy();
      return res.status(200).json({ message: "Nota deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar nota", error });
    }
  },

  async getByStudent(req, res) {
    try {
      const grades = await Grade.findAll({
        where: { student_id: req.params.student_id },
        include: [{ model: Class, attributes: ["id", "name"] }],
      });
      return res.status(200).json(grades);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar notas do aluno", error });
    }
  },
};

export default gradeController;