const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Student = require('./Students');
const Book = require('./Library');

const Loan = sequelize.define('Loan', {
id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
},
  student_enrollment: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Student,
      key: 'enrollment'
    }
  },

  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'id'
    }
  },

  loan_date: {
    type: DataTypes.DATE,
    allowNull: false
  },

  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },

  return_date: {
    type: DataTypes.DATE,
    allowNull: true
  },

  status: {
    type: DataTypes.ENUM('borrowed', 'returned', 'Prestado', 'Devuelto'),
    allowNull: false,
    defaultValue: 'Prestado'
  }

}, {
  tableName: 'Loans',
  timestamps: true
});

// Relaciones
Student.hasMany(Loan, {
  foreignKey: 'student_enrollment',
  sourceKey: 'enrollment'
});

Loan.belongsTo(Student, {
  foreignKey: 'student_enrollment',
  targetKey: 'enrollment'
});

Book.hasMany(Loan, { foreignKey: 'book_id' });
Loan.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = Loan;
