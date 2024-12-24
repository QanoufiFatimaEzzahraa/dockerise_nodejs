// models/loanModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../services/db'); // Importation de la connexion Sequelize
const User = require('./userModel');
const Book = require('./bookModel');

const Loan = sequelize.define('Loan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// Définir les relations
Loan.belongsTo(User, { foreignKey: 'userId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Loan;
