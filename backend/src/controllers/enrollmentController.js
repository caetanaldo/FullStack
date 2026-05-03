import Enrollment from "../models/Enrollment.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import Professor from "../models/Professor.js";
import Grade from "../models/Grade.js";

const enrollmentController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Enrollment.findAndCountAll({
        limit,
        offset,
        include: [
          { model: Student, attributes: ["id", "name", "email"] },
          { model: Class, attributes: ["id", "name", "description"] },
        ],
      });

      return res.status(200).json({
        total: count,
        pagina: page,
        totalPaginas: Math.ceil(count / limit),
        matriculas: rows,
      });
    } catch (error) {
      next(error);
    }
  },

  async getMyEnrollments(req, res, next) {
    try {
      const professor = await Professor.findOne({
        where: { user_id: req.user.id },
      });
      if (!professor)
        return res.status(404).json({ message: "Professor não encontrado" });

      const classes = await Class.findAll({
        where: { professor_id: professor.user_id },
      });
      const classIds = classes.map((c) => c.id);

      const enrollments = await Enrollment.findAll({
        where: { class_id: classIds },
        include: [
          { model: Student, attributes: ["id", "name", "email"] },
          { model: Class, attributes: ["id", "name"] },
        ],
      });

      return res.status(200).json(enrollments);
    } catch (error) {
      next(error);
    }
  },

  async getMyEnrollmentsAluno(req, res, next) {
    try {
      const student = await Student.findOne({
        where: { user_id: req.user.id },
      });
      if (!student)
        return res.status(404).json({ message: "Aluno não encontrado" });

      const enrollments = await Enrollment.findAll({
        where: { student_id: student.id },
        include: [{ model: Class, attributes: ["id", "name", "description"] }],
      });

      return res.status(200).json(enrollments);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
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
      next(error);
    }
  },

  async getStudentsByClass(req, res, next) {
    try {
      const { classId } = req.params;

      const enrollments = await Enrollment.findAll({
        where: { class_id: classId },
        include: [
          {
            model: Student,
            attributes: ["id", "name", "email"],
          },
        ],
      });

      const grades = await Grade.findAll({
        where: { class_id: classId },
      });

      const result = enrollments
        .map((e) => {
          const student = e.student; // 👈 correto

          if (!student) return null;

          const grade = grades.find((g) => g.student_id === e.student_id);

          return {
            id: student.id,
            name: student.name,
            email: student.email,
            grade: grade?.value ?? null,
          };
        })
        .filter(Boolean);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
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

      const alreadyEnrolled = await Enrollment.findOne({
        where: { student_id, class_id },
      });
      if (alreadyEnrolled) {
        return res
          .status(400)
          .json({ message: "Aluno já matriculado nessa turma" });
      }

      await Enrollment.create({ student_id, class_id });

      return res.status(201).json({
        message: "Matrícula realizada com sucesso",
        matricula: {
          aluno: student.name,
          turma: turma.name,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const enrollment = await Enrollment.findByPk(req.params.id);
      if (!enrollment) {
        return res.status(404).json({ message: "Matrícula não encontrada" });
      }

      await enrollment.destroy();
      return res
        .status(200)
        .json({ message: "Matrícula removida com sucesso" });
    } catch (error) {
      next(error);
    }
  },
};

export default enrollmentController;
