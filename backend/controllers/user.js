// IMPORTATION DES MODULES
require('dotenv').config();
const bcrypt = require('bcrypt'); //package hash du mot de passe 
const jwt = require('jsonwebtoken'); //package de création + vérification de token

// IMPORTATION MODELS
const User = require('../models/User');


// POST inscription
exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10) // Fonction créer un hash du password pour enregistrer dans la DB + salt = 10 tours
            const user = new User({
                email: req.body.email,
                password: hash
            });
            try{
                await user.save()
                return res.status(201).json({ message: 'Utilisateur créé !' })
            } catch{
                return res.status(400).json({ message: 'Vous possédez déjà un compte Hot Takes !' })
            };
        } catch(error) {
            return res.status(500).json({ error })
        };
};

// POST connection 
exports.login = async (req, res, next) => {
        try{
            const user = await User.findOne({ email: req.body.email }) // Objet qui sert de filtre
            if (user === null) { // Vérifie si l'utilisateur existe dans la DB
                return res.status(401).json({ message: 'Utilisateur/Mot de passe erroné' });
            } else { // Si l'utilisateur existe dans la DB
                    try {
                        const valid = await bcrypt.compare(req.body.password, user.password) //Méthode pour comparer le mot de passe tranmis au hash de la DB
                        if (!valid) { // Si False = password erroné 
                            return res.status(401).json({ message: 'Utilisateur/Mot de passe erroné' });
                        } else { // Si password correct 
                            return res.status(200).json({
                                userId: user._id,
                                token: jwt.sign( // Méthode pour chiffrer un nouveau token de JWT avec 3 arguments
                                    { userId: user._id }, // identifiant utilisateur
                                    `${process.env.SECRET_KEY}`, // clé secrète
                                    { expiresIn: '24h' } // délai d'expiration du token
                                )
                            });
                        }
                    } catch(error) {
                        return res.status(500).json({ error });
                    };
            }
        } catch(error) { 
            return res.status(500).json({ error }) 
        };

};