require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');


const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connexion MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wd7zunq.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
// Gestion erreur sur endpoint introuvable
app.use('*', function (req, res) {
    res.status(404).json({ message: `La page demandée n'existe pas` });
});



module.exports = app;

