import Grade from "../models/Grade.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import GradeHistory from "../models/GradeHistory.js";
import Notification from "../models/Notification.js";

const gradeController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Grade.findAndCountAll({
        limit,
        offset,
        include: [
          { model: Student, attributes: ["name"] },
          { model: Class, attributes: ["name"] },
        ],
      });

      const resultado = rows.map((grade) => ({
        id: grade.id,
        aluno: grade.student.name,
        turma: grade.class.name,
        nota: grade.value,
      }));

      return res.status(200).json({
        total: count,
        pagina: page,
        totalPaginas: Math.ceil(count / limit),
        notas: resultado,
      });
    } catch (error) {
      next(error); // ✅ correto: dentro do catch, sem return antes
    }
  },

  async getByStudent(req, res, next) {
    try {
      const student = await Student.findOne({
        where: { user_id: req.params.student_id },
      });
      if (!student)
        return res.status(404).json({ message: "Aluno não encontrado" });

      const grades = await Grade.findAll({
        where: { student_id: student.id },
        include: [{ model: Class, attributes: ["id", "name"] }],
      });

      const resultado = grades.map((grade) => ({
        id: grade.id,
        turma: grade.class?.name,
        value: grade.value,
      }));

      return res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const grade = await Grade.findByPk(req.params.id, {
        include: [
          { model: Student, attributes: ["name"] },
          { model: Class, attributes: ["name"] },
        ],
      });

      if (!grade) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }

      return res.status(200).json({
        id: grade.id,
        aluno: grade.student.name,
        turma: grade.class.name,
        nota: grade.value,
      });
    } catch (error) {
      next(error);
    }
  },

  async getHistory(req, res, next) {
    try {
      const history = await GradeHistory.findAll({
        where: { grade_id: req.params.id },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { student_id, class_id, value } = req.body;

      const student = await Student.findByPk(student_id);
      if (!student)
        return res.status(404).json({ message: "Aluno não encontrado" });

      const turma = await Class.findByPk(class_id);
      if (!turma)
        return res.status(404).json({ message: "Turma não encontrada" });

      if (value < 0 || value > 10) {
        return res.status(400).json({ message: "Nota deve ser entre 0 e 10" });
      }

      await Grade.create({ student_id, class_id, value });

      // cria notificação pro aluno
      await Notification.create({
        user_id: student.user_id,
        message: `Sua nota em ${turma.name} foi lançada: ${value}`,
        type: "nota",
      });

      return res
        .status(201)
        .json({
          message: "Nota lançada com sucesso",
          nota: { aluno: student.name, turma: turma.name, valor: value },
        });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { value } = req.body;

      if (value < 0 || value > 10) {
        return res.status(400).json({ message: "Nota deve ser entre 0 e 10" });
      }

      const grade = await Grade.findByPk(req.params.id, {
        include: [
          { model: Student, attributes: ["id", "name", "user_id"] },
          { model: Class, attributes: ["name"] },
        ],
      });

      if (!grade)
        return res.status(404).json({ message: "Nota não encontrada" });

      await GradeHistory.create({
        grade_id: grade.id,
        old_value: grade.value,
        new_value: value,
        changed_by: req.user.id,
      });

      await grade.update({ value });

      // cria notificação pro aluno
      await Notification.create({
        user_id: grade.student.user_id,
        message: `Sua nota em ${grade.class.name} foi atualizada para: ${value}`,
        type: "nota",
      });

      return res.status(200).json({
        message: "Nota atualizada com sucesso",
        nota: {
          id: grade.id,
          aluno: grade.student.name,
          turma: grade.class.name,
          nota: value,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const grade = await Grade.findByPk(req.params.id);
      if (!grade) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }

      await grade.destroy();
      return res.status(200).json({ message: "Nota deletada com sucesso" });
    } catch (error) {
      next(error);
    }
  },
};

export default gradeController;
