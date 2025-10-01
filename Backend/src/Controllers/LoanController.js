const Loan = require('../Models/Loans');
const Student = require('../Models/Students');
const Book = require('../Models/Library');

// Create a new loan
const createLoan = async (req, res) => {
  const { student_id, book_id } = req.body;

  try {
    // Optionally: check if the book has available copies
    const book = await Book.findByPk(book_id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.copies_availables <= 0) return res.status(400).json({ message: 'No copies available' });

    // Create loan
    const loan = await Loan.create({ student_id, book_id });

    // Reduce available copies
    await book.update({ copies_availables: book.copies_availables - 1 });

    res.status(201).json({ message: 'Loan created', loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating loan', error: error.message });
  }
};

// Get all loans
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
    res.status(500).json({ message: 'Error fetching loans', error: error.message });
  }
};

// Return a loan (update status)
const returnLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findByPk(id, { include: Book });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    if (loan.status === 'returned') return res.status(400).json({ message: 'Loan already returned' });

    await loan.update({ status: 'returned', return_date: new Date() });

    // Increase available copies
    await loan.Book.update({ copies_availables: loan.Book.copies_availables + 1 });

    res.status(200).json({ message: 'Book returned', loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error returning loan', error: error.message });
  }
};

module.exports = {
  createLoan,
  getLoans,
  returnLoan
};
