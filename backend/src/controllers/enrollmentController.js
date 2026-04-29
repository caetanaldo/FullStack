import Enrollment from "../models/Enrollment.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";

const enrollmentController = {
  async getAll(req, res) {
    try {
      const enrollments = await Enrollment.findAll({
        include: [
          { model: Student, attributes: ["id", "name", "email"] },
          { model: Class, attributes: ["id", "name", "description"] },
        ],
      });
      return res.status(200).json(enrollments);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar matrículas", error });
    }
    next(error);

  },

  async getById(req, res) {
    try {
      const enrollment = await Enrollment.findByPk(req.params.id, {
        include: [
          { model: Student, attributes: ["id", "name", "email"] },
          { model: Class, attributes: ["id", "name", "description"] },
        ],
      });
      if (!enrollment) {
        return res.status(404).json({ message: "Matrícula não encontrada" });
      }
      return res.status(200).json(enrollment);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar matrícula", error });
    }
    next(error);

  },

  async create(req, res) {
    try {
      const { student_id, class_id } = req.body;

      const student = await Student.findByPk(student_id);
      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      const turma = await Class.findByPk(class_id);
      if (!turma) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }

      const alreadyEnrolled = await Enrollment.findOne({ where: { student_id, class_id } });
      if (alreadyEnrolled) {
        return res.status(400).json({ message: "Aluno já matriculado nessa turma" });
      }

      const enrollment = await Enrollment.create({ student_id, class_id });
      return res.status(201).json({ message: "Matrícula realizada com sucesso", enrollment });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao realizar matrícula", error });
    }
    next(error);

  },

  async delete(req, res) {
    try {
      const enrollment = await Enrollment.findByPk(req.params.id);
      if (!enrollment) {
        return res.status(404).json({ message: "Matrícula não encontrada" });
      }

      await enrollment.destroy();
      return res.status(200).json({ message: "Matrícula removida com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao remover matrícula", error });
    }
    next(error);

  },
};

export default enrollmentController;