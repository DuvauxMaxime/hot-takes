// IMPORTATION DES MODULES
require('dotenv').config();
const jwt = require('jsonwebtoken'); //package de création + vérification de token


// Fonction middleware authentification 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token en splitant sur le header
        const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`); // décodage du token avec méthode verify de JWT
        const userId = decodedToken.userId; // récupération de l'userId
        req.auth = { // ajout de userId aux requêtes 
            userId: userId
        };
        next();
    } catch (error) {
        if (req.headers.authorization === undefined) {
            res.status(401).json({ message: `Le token d'authentification est absent` });
        };
        if (req.headers.authorization.length != 183) {
            res.status(401).json({ message: `Le token d'authentification est incorrect` });
        };
        res.status(401).json({ error });
    }
};