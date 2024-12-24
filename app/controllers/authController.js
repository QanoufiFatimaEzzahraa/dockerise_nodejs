const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { connection } = require('../services/db');

const signup = (req, res) => {
    const { nom, prenom, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
    connection.query(query, [nom, prenom, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'User created successfully!' });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const user = result[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: 'Invalid password!' });
        }

        const token = jwt.sign({ id: user.id, nom: user.nom }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
};

module.exports = { signup, login };
