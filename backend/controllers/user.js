// IMPORTATION DES MODULES
require('dotenv').config();
const bcrypt = require('bcrypt'); //package hash du mot de passe 
const jwt = require('jsonwebtoken'); //package de création + vérification de token

// IMPORTATION MODELS
const User = require('../models/User');


// POST inscription
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Fonction créer un hash du password pour enregistrer dans la DB + salt = 10 tours
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ message: 'Vous possédez déjà un compte Hot Takes !' }));
        })
        .catch(error => res.status(500).json({ error }));
};

// POST connection 
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Objet qui sert de filtre
        .then(user => {
            if (user === null) { // Vérifie si l'utilisateur existe dans la DB
                res.status(401).json({ message: 'Utilisateur/Mot de passe erroné' });
            } else { // Si l'utilisateur existe dans la DB
                bcrypt.compare(req.body.password, user.password) //Méthode pour comparer le mot de passe tranmis au hash de la DB
                    .then(valid => {
                        if (!valid) { // Si False = password erroné 
                            res.status(401).json({ message: 'Utilisateur/Mot de passe erroné' });
                        } else { // Si password correct 
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign( // Méthode pour chiffrer un nouveau token de JWT avec 3 arguments
                                    { userId: user._id }, // identifiant utilisateur
                                    `${process.env.SECRET_KEY}`, // clé secrète
                                    { expiresIn: '24h' } // délai d'expiration du token
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    });
            }
        })
        .catch(error => res.status(500).json({ error }));

};