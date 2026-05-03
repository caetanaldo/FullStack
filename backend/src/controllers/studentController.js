import Student from "../models/Student.js";
import Grade from "../models/Grade.js";
import Enrollment from "../models/Enrollment.js";

const studentController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Student.findAndCountAll({ limit, offset });

      return res.status(200).json({
        total: count,
        pagina: page,
        totalPaginas: Math.ceil(count / limit),
        alunos: rows,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      return res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { name, email } = req.body;
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      await student.update({ name, email });
      return res
        .status(200)
        .json({ message: "Aluno atualizado com sucesso", student });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      // deleta notas e matrículas antes de deletar o aluno
      await Grade.destroy({ where: { student_id: student.id } });
      await Enrollment.destroy({ where: { student_id: student.id } });
      await student.destroy();

      return res.status(200).json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  },
};

export default studentController;
