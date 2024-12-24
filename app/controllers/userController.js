// controllers/userController.js

const User = require('../models/userModel');

// Liste des utilisateurs
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Détails d'un utilisateur
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Création d'un utilisateur
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Mise à jour d'un utilisateur
const updateUser = async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (user[0] === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        } else {
            res.json({ message: 'Utilisateur mis à jour' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Suppression d'un utilisateur
const deleteUser = async (req, res) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        } else {
            res.json({ message: 'Utilisateur supprimé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
