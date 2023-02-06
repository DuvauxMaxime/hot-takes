const Sauce = require('../models/Sauce');


// POST Créer une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

// DELETE Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Sauce supprimée !'
    })
};

// POST Like sauce
exports.likeSauce = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Like sauce !'
    })
};

// PUT Modifier une sauce
exports.editSauce = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Sauce mise à jour !'
    })
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
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};