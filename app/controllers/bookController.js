// controllers/bookController.js

const Book = require('../models/bookModel');

// Liste des livres
const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Détails d'un livre
const getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Livre non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Création d'un livre
const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Mise à jour d'un livre
const updateBook = async (req, res) => {
    try {
        const book = await Book.update(req.body, {
            where: { id: req.params.id }
        });
        if (book[0] === 0) {
            res.status(404).json({ message: 'Livre non trouvé' });
        } else {
            res.json({ message: 'Livre mis à jour' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Suppression d'un livre
const deleteBook = async (req, res) => {
    try {
        const result = await Book.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            res.status(404).json({ message: 'Livre non trouvé' });
        } else {
            res.json({ message: 'Livre supprimé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
