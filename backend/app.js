require('dotenv').config();
const express = require('express');
const helmet = require('helmet')
const app = express();
const mongoose = require('mongoose'); //Package facilitant les interactions entre app Express et la DB
const path = require('path');


const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connexion MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

// app.use(helmet());


// CORS Cross Origin Ressource Sharing (ccès à l'api depuis n'importe quelle origine / ajout des headers aux requêtes envoyées / type de requêtes envoyées)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Attribution des middlewares aux routes spécifiques
app.use('/api/sauces', sauceRoutes); //Routes liées aux sauces
app.use('/api/auth', userRoutes); //Routes liées à l'authentification
app.use('/images', express.static(path.join(__dirname, 'images'))); // Routes liées aux images
app.use('*', function (req, res) { // Gestion erreur sur endpoint introuvable
    return res.status(404).json({ message: `La page demandée n'existe pas` });
});



module.exports = app;

