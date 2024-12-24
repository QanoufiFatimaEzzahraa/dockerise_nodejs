// services/db.js

const { Sequelize } = require('sequelize');

// Connexion a la base de données MySQL
const sequelize = new Sequelize('db', 'user', 'user', {
    host: 'mysql-container', // Nom du service du conteneur MySQL dans Docker Compose
    dialect: 'mysql',
    logging: false,  // Désactive les logs SQL
});

// Verifier la connexion a la base de donnees
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie !');
    })
    .catch((error) => {
        console.error('Impossible de se connecter à la base de données:', error);
    });

module.exports = sequelize;
