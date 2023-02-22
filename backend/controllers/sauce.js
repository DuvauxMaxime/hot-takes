// IMPORTATION MODELS
const Sauce = require('../models/Sauce');
const fs = require('fs'); // Package de méthodes pour interagir avec le système de fichiers du serveur



// POST Créer une sauce
exports.createSauce = async (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); //parse de l'objet JSON 
    delete sauceObject._id; // Suppression _id dans l'objet 
    delete sauceObject._userId; // Suppresion userId dans l'objet 
    const sauce = new Sauce({ // création de l'objet
        ...sauceObject, // récupère les données précédentes (sans les champs delete)
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        userId: req.auth.userId, // récupération de userId de la requête
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //génère url de l'image car multer ne remonte que le nom de fichier
    });
    try {
        await sauce.save();
        return res.status(201).json({ message: 'Sauce enregistrée !' });
    } catch (error) {
        console.log("========> TRIMMMMMM");
        console.log(sauce.name.trim().length);
        if (!sauce.name || sauce.name.trim().length === 0) {
            return res.status(400).json({ message: ` La donnée name est requise. (La data ne peut être vide)` });
        };
        if (!sauce.manufacturer) {
            return res.status(400).json({ message: ` La donnée manufacturer est requise. (La data ne peut être vide)` });
        };
        if (!sauce.description) {
            return res.status(400).json({ message: ` La donnée description est requise. (La data ne peut être vide)` });
        };
        if (!sauce.mainPepper) {
            return res.status(400).json({ message: ` La donnée mainPepper est requise. (La data ne peut être vide)` });
        };
        if (!sauce.imageUrl) {
            return res.status(400).json({ message: ` La donnée imageUrl est requise. (La data ne peut être vide)` });
        };
        if (!sauce.heat) {
            return res.status(400).json({ message: ` La donnée heat est requise. (La data ne peut être vide)` });
        } else {
            return res.status(400).json({ error });
        };
    };
};


// DELETE Suppression d'une sauce
exports.deleteSauce = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id });
        if (sauce === null) {
            return res.status(401).json({ message: `La sauce n'existe pas` });
        } else {
            if (sauce.userId != req.auth.userId) {
                return res.status(401).json({ message: 'Non autorisé' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, async () => {
                    await Sauce.deleteOne({ _id: req.params.id })
                    try {
                        return res.status(200).json({ message: 'Objet supprimé !' });
                    } catch (error) {
                        return res.status(500).json({ error });
                    }
                })
            }
        };
    } catch (error) {
        return res.status(404).json({ message: `L'id de la sauce est incorrect` });
    }
}


// POST Like sauce
exports.likeSauce = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id });
        if (sauce === null) {
            return res.status(401).json({ message: `La sauce n'existe pas` });
        } else {
            // Ajout like = Vérifie si userId dans aucune DB de la sauce et si la requête envoi like = 1
            if (!sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId) && req.body.like === 1) {
                try {
                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: 1 }, // incrémente de 1 la valeur like
                            $push: { usersLiked: req.body.userId } // ajoute userId dans tableau usersLiked
                        }
                    )
                    return res.status(201).json({ message: 'Like sauce !' });
                } catch (error) { res.status(400).json({ error }) };
            }
            // Annule like = Vérifie si userId est dans la DB et si la requête envoi like = 0
            if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                try {
                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: -1 }, // décrémente de 1 la valeur like
                            $pull: { usersLiked: req.body.userId } // retire userId dans tableau usersLiked
                        }
                    )
                    return res.status(201).json({ message: 'Annule like sauce !' });
                }
                catch (error) { res.status(400).json({ error }) };
            }
            // Ajout dislike = Vérifie si userId dans aucune DB et si la requête envoi like = -1
            if (!sauce.usersDisliked.includes(req.body.userId) && !sauce.usersLiked.includes(req.body.userId) && req.body.like === -1) {
                try {
                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { dislikes: 1 }, // incrémente de 1 la valeur dislike
                            $push: { usersDisliked: req.body.userId } // retire userId dans tableau usersDisliked
                        }
                    )
                    return res.status(201).json({ message: 'Dislike sauce !' })
                }
                catch (error) { res.status(400).json({ error }) };
            }
            // Annule dislike = Vérifie si userId est dans la DB et si la requête envoi like = 0
            if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                try {
                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { dislikes: -1 }, // décrémente de 1 la valeur dislike
                            $pull: { usersDisliked: req.body.userId } // retire userId dans tableau usersDisliked
                        }
                    )
                    return res.status(201).json({ message: 'Annule dislike sauce !' });
                }
                catch (error) { res.status(400).json({ error }) };
            }
            // Retourne une erreur si userId dans DB Liked et like = 1
            if (sauce.usersLiked.includes(req.body.userId) && req.body.like === -1) {
                return res.status(403).json({ message: 'Impossible de liker et disliker en simultané !' });
            }
            // Retourne une erreur si userId dans DB Disliked et like = 1
            if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 1) {
                return res.status(403).json({ message: 'Impossible de liker et disliker en simultané !' });
            }
            // Retourne une erreur si userId dans DB Liked et like = 1
            if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                return res.status(403).json({ message: 'Impossible de liker plusieurs fois une même sauce !' });
            }
            // Retourne une erreur si userId dans DB Disliked et like = 1
            if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                return res.status(403).json({ message: 'Impossible de disliker plusieurs fois une même sauce !' });
            }
            // Retourne une erreur si userId dans DB Disliked et like = 1
            if (!sauce.usersDisliked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                return res.status(403).json({ message: `Impossible d'annuler une sauce qui n'est ni liker ni disliker !` });
            }
        }
    } catch (error) {
        return res.status(404).json({ message: `L'id de la sauce est incorrect` });
    }
}


// PUT Modifier une sauce
exports.editSauce = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id });
        if (sauce === null) {
            return res.status(404).json({ message: `La sauce n'existe pas !` });
        } else {
            if (req.file) {
                try {
                    const sauce = await Sauce.findOne({ _id: req.params.id });
                    const filename = sauce.imageUrl.split('/images/')[1]; // Récupère nom du fichier dans DB
                    fs.unlink(`images/${filename}`, (error) => {
                        if (error) throw error;
                    })
                } catch (error) {
                    return res.status(404).json({ message: `L'id de la sauce est incorrect` });
                }
            }
            const sauceObject = req.file ? {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };
            delete sauceObject._userId;
            try {
                const sauce = await Sauce.findOne({ _id: req.params.id });
                if (sauce.userId != req.auth.userId) {
                    return res.status(401).json({ message: 'Non autorisé' });
                } else {
                    try {
                        await Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id });
                        return res.status(200).json({ message: 'Objet modifié!' });
                    } catch (error) {
                        return res.status(401).json({ error });
                    }
                }
            } catch (error) {
                return res.status(400).json({ error });
            }
        }
    } catch (error) {
        return res.status(404).json({ message: `L'id de la sauce est incorrect` });
    }
};


//GET Toutes les sauces
exports.getAllSauces = async (req, res, next) => {
    try {
        const sauces = await Sauce.find();
        return res.status(200).json(sauces);
    } catch (error) {
        return res.status(400).json({ error });
    }
};


// GET Une seule sauce 
exports.getOneSauce = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id });
        if (sauce === null) {
            return res.status(404).json({ message: `La sauce n'existe pas !` });
        } else {
            return res.status(200).json(sauce);
        }
    } catch (error) {
        return res.status(404).json({ message: `L'id de la sauce est incorrect` });
    }
};