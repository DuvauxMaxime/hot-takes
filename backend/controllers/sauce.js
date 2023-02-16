// IMPORTATION MODELS
const Sauce = require('../models/Sauce');
const fs = require('fs'); // Package de méthodes pour interagir avec le système de fichiers du serveur


// // POST Créer une sauce
// exports.createSauce = (req, res, next) => {
//     const sauceObject = JSON.parse(req.body.sauce); //parse de l'objet JSON 
//     delete sauceObject._id; // Suppression _id dans l'objet 
//     delete sauceObject._userId; // Suppresion userId dans l'objet 
//     const sauce = new Sauce({ // création de l'objet
//         ...sauceObject, // récupère les données précédentes (sans les champs delete)
//         likes: 0,
//         dislikes: 0,
//         usersLiked: [],
//         usersDisliked: [],
//         userId: req.auth.userId, // récupération de userId de la requête
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //génère url de l'image car multer ne remonte que le nom de fichier
//     });
//     sauce.save()
//         .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
//         .catch(error => { res.status(400).json({ error }) })
// };

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
        res.status(201).json({ message: 'Sauce enregistrée !' })
    } catch (error) {
        res.status(400).json({ error })
    }
};

// DELETE Suppression d'une sauce
// exports.deleteSauce = (req, res, next) => {
//     Sauce.findOne({ _id: req.params.id })
//         .then(sauce => {
//             if (sauce.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Non autorisé' });
//             } else {
//                 const filename = sauce.imageUrl.split('/images/')[1];
//                 fs.unlink(`images/${filename}`, () => {
//                     Sauce.deleteOne({ _id: req.params.id })
//                         .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
//                         .catch(error => res.status(401).json({ error }));
//                 });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ error });
//         });
// };

// DELETE Suppression d'une sauce
exports.deleteSauce = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id })
        if (sauce === null) {
            res.status(401).json({ message: `La sauce n'existe pas` });
        } else {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(500).json({ error }));
                })
            }
        };
    } catch (error) {
        res.status(404).json({ message: `L'id de la sauce est incorrect` });
    }
}

// POST Like sauce
exports.likeSauce = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Like sauce !'
    })
};

// PUT Modifier une sauce
exports.editSauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//GET Toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
};

// GET Une seule sauce 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce === null) {
                res.status(404).json({ message: `La sauce n'existe pas !` })
            } else {
                res.status(200).json(sauce)
            }
        })
        .catch(error => res.status(404).json({ message: `L'id de la sauce est incorrect` }));
};