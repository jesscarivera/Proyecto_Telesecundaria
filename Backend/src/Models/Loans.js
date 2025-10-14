const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Student = require('./Students');
const Book = require('./Library');

const Loan = sequelize.define('Loan', {
  loan_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('borrowed', 'returned'),
    allowNull: false,
    defaultValue: 'borrowed'
  }
}, {
  tableName: 'Loans',
  timestamps: true
});

// Relaciones
Student.hasMany(Loan, { foreignKey: 'student_id' });
Loan.belongsTo(Student, { foreignKey: 'student_id' });

Book.hasMany(Loan, { foreignKey: 'book_id' });
Loan.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = Loan;
