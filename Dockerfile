# Utilisation de l'image officielle Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier uniquement les fichiers de configuration pour installer les dépendances
COPY app/package.json /usr/src/app

# Installer les dépendances
RUN npm install

#RUN npm install --save-dev nodemon


# Copier le reste des fichiers de l'application
COPY app/ .

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
