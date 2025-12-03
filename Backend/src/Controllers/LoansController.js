const Loan = require("../Models/Loans");
const Student = require("../Models/Students");
const Book = require("../Models/Library");

const calcularAlertStatus = (loan) => {
  if (loan.return_date) return "returned";

  if (!loan.due_date) return "ok";

  const hoy = new Date();
  hoy.setHours(0,0,0,0);

  const due = new Date(loan.due_date);
  due.setHours(0,0,0,0);

  const diffDias = (due - hoy) / (1000 * 60 * 60 * 24);

  if (diffDias < 0) return "vencido";
  if (diffDias <= 2) return "por_vencer";
  return "ok";
};

const add = async (req, res) => {
  const sequelize = Loan.sequelize;
  const t = await sequelize.transaction();

  try {
    let { student_enrollment, book_id, loan_date, due_date } = req.body;

    book_id = Number(book_id);

    if (!student_enrollment || isNaN(book_id) || !loan_date || !due_date) {
      await t.rollback();
      return res.status(400).json({
        message: "student_enrollment, book_id, loan_date y due_date son obligatorios y deben ser válidos."
      });
    }

    const studentFound = await Student.findOne({
      where: { enrollment: student_enrollment },
      transaction: t
    });

    if (!studentFound) {
      await t.rollback();
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    const bookFound = await Book.findByPk(book_id, { transaction: t });
    if (!bookFound) {
      await t.rollback();
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    if ((bookFound.copies_availables ?? 0) <= 0) {
      await t.rollback();
      return res.status(400).json({ message: "No hay copias disponibles" });
    }

    const loan = await Loan.create(
      {
        student_enrollment,  
        book_id,
        loan_date,
        due_date,
        status: "Prestado",
      },
      { transaction: t }
    );

    await bookFound.update(
      { copies_availables: (bookFound.copies_availables ?? 0) - 1 },
      { transaction: t }
    );

    await t.commit();

    const created = await Loan.findByPk(loan.id, {
      include: [
        { 
          model: Student, 
          attributes: ["enrollment", "name", "Last_Name", "grade", "group"]
        },
        { 
          model: Book, 
          attributes: ["id", "title", "author", "copies_availables"] 
        },
      ],
    });

    const json = created.toJSON();
    json.alert_status = calcularAlertStatus(json);

    res.status(201).json({ message: "Préstamo creado", loan: json });

  } catch (error) {
    if (t) await t.rollback();
    res.status(500).json({ 
      message: "Error al crear el préstamo", 
      error: error.message 
    });
  }
};

const get = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [
        { 
          model: Student, 
          attributes: ["enrollment", "name", "Last_Name", "grade", "group"] 
        },
        { 
          model: Book, 
          attributes: ["id", "title", "author", "copies_availables"] 
        },
      ],
      order: [["id", "DESC"]],
    });

    const result = loans.map((l) => {
      const j = l.toJSON();
      j.alert_status = calcularAlertStatus(j);
      return j;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener préstamos", error: error.message });
  }
};

const update = async (req, res) => {
  const sequelize = Loan.sequelize;
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    let { student_enrollment, book_id, loan_date, due_date } = req.body;

    book_id = Number(book_id);

    const loan = await Loan.findByPk(id, { transaction: t });
    if (!loan) {
      await t.rollback();
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    if (student_enrollment) {
      const student = await Student.findOne({
        where: { enrollment: student_enrollment },
        transaction: t
      });

      if (!student) {
        await t.rollback();
        return res.status(404).json({ message: "El estudiante indicado no existe" });
      }
    }

    if (book_id) {
      const book = await Book.findByPk(book_id, { transaction: t });
      if (!book) {
        await t.rollback();
        return res.status(404).json({ message: "El libro indicado no existe" });
      }
    }

    await loan.update(
      {
        student_enrollment: student_enrollment || loan.student_enrollment,
        book_id: book_id || loan.book_id,
        loan_date: loan_date ?? loan.loan_date,
        due_date: due_date ?? loan.due_date,
      },
      { transaction: t }
    );

    await t.commit();

    const updated = await Loan.findByPk(id, {
      include: [
        { 
          model: Student, 
          attributes: ["enrollment", "name", "Last_Name", "grade", "group"] 
        },
        { 
          model: Book, 
          attributes: ["id", "title", "author", "copies_availables"] 
        },
      ],
    });

    const json = updated.toJSON();
    json.alert_status = calcularAlertStatus(json);

    res.json({ message: "Préstamo actualizado correctamente", loan: json });
  } catch (error) {
    if (t) await t.rollback();
    res.status(500).json({ message: "Error al actualizar préstamo", error: error.message });
  }
};

const marcarDevuelto = async (req, res) => {
  const sequelize = Loan.sequelize;
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id, {
      include: [{ model: Book }, { model: Student }],
      transaction: t,
    });

    if (!loan) {
      await t.rollback();
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    if (loan.status === "returned") {
      await t.rollback();
      return res.status(400).json({ message: "El préstamo ya estaba marcado como devuelto" });
    }

    await loan.update(
      {
        status: "returned",
        return_date: new Date(),
      },
      { transaction: t }
    );

    if (loan.Book) {
      await loan.Book.update(
        { copies_availables: (loan.Book.copies_availables ?? 0) + 1 },
        { transaction: t }
      );
    }

    await t.commit();

    const updated = await Loan.findByPk(id, {
      include: [
        { 
          model: Student, 
          attributes: ["enrollment", "name", "Last_Name", "grade", "group"] 
        },
        { 
          model: Book, 
          attributes: ["id", "title", "author", "copies_availables"] 
        },
      ],
    });

    const json = updated.toJSON();
    json.alert_status = calcularAlertStatus(json);

    res.json({ message: "Préstamo devuelto correctamente", loan: json });
  } catch (error) {
    if (t) await t.rollback();
    res.status(500).json({ message: "Error al marcar devuelto", error: error.message });
  }
};

const remove = async (req, res) => {
  const sequelize = Loan.sequelize;
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id, { include: [{ model: Book }], transaction: t });
    if (!loan) {
      await t.rollback();
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    if (!loan.return_date && loan.Book) {
      await loan.Book.update(
        { copies_availables: (loan.Book.copies_availables ?? 0) + 1 },
        { transaction: t }
      );
    }

    await loan.destroy({ transaction: t });
    await t.commit();

    res.json({ message: "Préstamo eliminado correctamente" });
  } catch (error) {
    if (t) await t.rollback();
    res.status(500).json({ message: "Error al eliminar préstamo", error: error.message });
  }
};

module.exports = {
  add,
  get,
  update,
  marcarDevuelto,
  delete: remove,
};
