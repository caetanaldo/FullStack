import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";

const attendanceController = {
  async getByClass(req, res, next) {
    try {
      const { class_id, date } = req.query;
      const where = { class_id };
      if (date) where.date = date;

      const attendances = await Attendance.findAll({
        where,
        include: [{ model: Student, attributes: ["id", "name"] }],
        order: [["date", "DESC"]],
      });

      return res.status(200).json(attendances);
    } catch (error) {
      next(error);
    }
  },

  async save(req, res, next) {
    try {
      const { class_id, date, records } = req.body;
      // records = [{ student_id, status }]

      await Promise.all(
        records.map(async ({ student_id, status }) => {
          const existing = await Attendance.findOne({ where: { student_id, class_id, date } });
          if (existing) {
            await existing.update({ status });
          } else {
            await Attendance.create({ student_id, class_id, date, status });
          }
        })
      );

      return res.status(200).json({ message: "Frequência salva com sucesso" });
    } catch (error) {
      next(error);
    }
  },

  async getByStudent(req, res, next) {
    try {
      const { student_id, class_id } = req.query;
      const where = { student_id };
      if (class_id) where.class_id = class_id;

      const attendances = await Attendance.findAll({
        where,
        order: [["date", "DESC"]],
      });

      const total = attendances.length;
      const faltas = attendances.filter(a => a.status === "falta").length;
      const percentual = total ? ((total - faltas) / total * 100).toFixed(1) : 100;

      return res.status(200).json({ attendances, total, faltas, percentual });
    } catch (error) {
      next(error);
    }
  },
};

export default attendanceController;