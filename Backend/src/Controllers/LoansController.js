const Loan = require('../Models/Loans');
const Student = require('../Models/Students');
const Book = require('../Models/Library');

// Crear un nuevo préstamo
const createLoan = async (req, res) => {
  const { student_id, book_id } = req.body;

  try {
    // Opcional: verificar si el libro tiene copias disponibles
    const book = await Book.findByPk(book_id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    if (book.copies_availables <= 0) return res.status(400).json({ message: 'No hay copias disponibles' });

    // Crear préstamo
    const loan = await Loan.create({ student_id, book_id });

    // Reducir el número de copias disponibles
    await book.update({ copies_availables: book.copies_availables - 1 });

    res.status(201).json({ message: 'Préstamo creado', loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el préstamo', error: error.message });
  }
};

// Obtener todos los préstamos
const getLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [
        { model: Student, attributes: ['name', 'Last_Name', 'enrollment'] },
        { model: Book, attributes: ['title', 'author'] }
      ]
    });
    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los préstamos', error: error.message });
  }
};

// Devolver un préstamo (actualizar estado)
const returnLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findByPk(id, { include: Book });
    if (!loan) return res.status(404).json({ message: 'Préstamo no encontrado' });
    if (loan.status === 'returned') return res.status(400).json({ message: 'El préstamo ya fue devuelto' });

    await loan.update({ status: 'returned', return_date: new Date() });

    // Aumentar las copias disponibles del libro
    await loan.Book.update({ copies_availables: loan.Book.copies_availables + 1 });

    res.status(200).json({ message: 'Libro devuelto', loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al devolver el préstamo', error: error.message });
  }
};

module.exports = {
  createLoan,
  getLoans,
  returnLoan
};
