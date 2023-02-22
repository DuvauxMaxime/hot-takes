// IMPORTATION DES MODULES 
const validator = require('validator');


// Dictionnaire des extensions de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


module.exports = (req, res, next) => {
    const data = JSON.parse(req.body.sauce)
    console.log(req.file.filename);
    if (!validator.matches(data.name, /^[a-zA-Z0-9 -]*$/)) {
        res.status(400).json({ message: `La data name ne correspond pas au format attendu` });
    } if (!validator.matches(data.manufacturer, /^[a-zA-Z0-9 -]*$/)) {
        res.status(400).json({ message: `La data manufacturer ne correspond pas au format attendu` });
    } if (!validator.matches(data.description, /^[a-zA-Z0-9 -]*$/)) {
        res.status(400).json({ message: `La data description ne correspond pas au format attendu` });
    } if (!validator.matches(data.mainPepper, /^[a-zA-Z0-9 -]*$/)) {
        res.status(400).json({ message: `La data mainPepper ne correspond pas au format attendu` });
    }
    const extension = req.file.mimetype.split('/')[1]; // Défini l'extension d'après le dictionnaire MIME TYPES
    const tabExtension = Object.keys(MIME_TYPES).map(cle => {
        return MIME_TYPES[cle]
    })
    if (tabExtension.includes(extension) === false) {
        res.status(400).json({ message: `Le format du fichier n'est pas pris en charge ! Seuls les fichiers jpg, jpeg ou png sont acceptés.` })
    } else {
        next();
    }
}



