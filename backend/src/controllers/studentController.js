import Student from "../models/Student.js";

const studentController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Student.findAndCountAll({
        limit,
        offset,
      });

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

  async getById(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar aluno", error });
    }
    next(error);

  },

  async update(req, res) {
    try {
      const { name, email } = req.body;
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      await student.update({ name, email });
      return res.status(200).json({ message: "Aluno atualizado com sucesso", student });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar aluno", error });
    }
    next(error);

  },

  async delete(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      await student.destroy();
      return res.status(200).json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar aluno", error });
    }
    next(error);

  },
};

export default studentController;