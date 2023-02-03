const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce ajouté !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Sauce supprimée !'
    })
};

exports.likeSauce = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Like sauce !'
    })
};

exports.editSauce = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Sauce mise à jour !'
    })
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};