// IMPORTATION DES MODULES 
const validator = require('validator');


// Dictionnaire des extensions de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};


module.exports = (req, res, next) => {
    const data = JSON.parse(req.body.sauce)
    if (!validator.matches(data.name.trim(), /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]*$/) || data.name.trim().length === 0) {
        return res.status(400).json({ message: `La data name ne correspond pas au format attendu. (La data doit contenir au moins 1 caractère alphanumérique)` });
    } if (!validator.matches(data.manufacturer.trim(), /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]*$/) || data.manufacturer.trim().length === 0) {
        return res.status(400).json({ message: `La data manufacturer ne correspond pas au format attendu. (La data doit contenir au moins 1 caractère alphanumérique)` });
    } if (!validator.matches(data.description.trim(), /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]*$/) || data.description.trim().length === 0) {
        return res.status(400).json({ message: `La data description ne correspond pas au format attendu. (La data doit contenir au moins 1 caractère alphanumérique)` });
    } if (!validator.matches(data.mainPepper.trim(), /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]*$/) || data.mainPepper.trim().length === 0) {
        return res.status(400).json({ message: `La data mainPepper ne correspond pas au format attendu. (La data doit contenir au moins 1 caractère alphanumérique)` });
    } if (parseInt(data.heat) > 10 || parseInt(data.heat) < 1 || data.heat.trim().length === 0) {
        return res.status(400).json({ message: `La data heat doit être comprise entre 1 et 10. (La data ne peut être vide)` });
    }
    const extension = req.file.mimetype.split('/')[1]; // Défini l'extension d'après le dictionnaire MIME TYPES
    const tabExtension = Object.keys(MIME_TYPES).map(cle => {
        return MIME_TYPES[cle]
    })
    if (tabExtension.includes(extension) === false) {
        return res.status(400).json({ message: `Le format du fichier n'est pas pris en charge ! Seuls les fichiers jpg, jpeg ou png sont acceptés.` })
    } else {
        next();
    }
}



