// index.js

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');
const sequelize = require('./services/db'); // Pour tester la connexion DB

app.use(express.json());

app.use(userRoutes);
app.use(bookRoutes);
app.use(loanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    // Synchroniser avec la base de donnees
    await sequelize.sync();
});
