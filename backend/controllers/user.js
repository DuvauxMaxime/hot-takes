// IMPORTATION DES MODULES
require('dotenv').config();
const bcrypt = require('bcrypt'); //package hash du mot de passe 
const jwt = require('jsonwebtoken'); //package de création + vérification de token

// IMPORTATION MODELS
const User = require('../models/User');


// POST inscription
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Créer un hash du password pour enregistrer dans la DB 
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// POST connection 
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Utilisateur/Mot de passe erroné' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Utilisateur/Mot de passe erroné' });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    `${process.env.SECRET_KEY}`,
                                    { expiresIn: '24h' }
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