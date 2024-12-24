// controllers/loanController.js

const Loan = require('../models/loanModel');

// Liste des prêts
const getLoans = async (req, res) => {
    try {
        const loans = await Loan.findAll();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Prêt par utilisateur
const getLoansByUser = async (req, res) => {
    try {
        const loans = await Loan.findAll({ where: { userId: req.params.userId } });
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Création d'un prêt
const createLoan = async (req, res) => {
    try {
        const loan = await Loan.create(req.body);
        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Suppression d'un prêt
const deleteLoan = async (req, res) => {
    try {
        const result = await Loan.destroy({
            where: { id: req.params.loanId }
        });
        if (result === 0) {
            res.status(404).json({ message: 'Prêt non trouvé' });
        } else {
            res.json({ message: 'Prêt supprimé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = {
    getLoans,
    getLoansByUser,
    createLoan,
    deleteLoan,
};
