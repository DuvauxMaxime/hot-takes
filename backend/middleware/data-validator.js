// IMPORTATION DES MODULES 
const validator = require('validator');


// Dictionnaire des extensions de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};


module.exports = (req, res, next) => {
    let data
    if (req.body.sauce === undefined) {
        data = req.body
    } else {
        data = JSON.parse(req.body.sauce)
    }
    if (!validator.matches(data.name.trim(), /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]*$/) || data.name.trim().length === 0) {
        return res.status(400).json({ message: `La data name ne correspond pas au format attendu. (La data doit contenir au moins 1 caractère alphanumérique)` });
    } if (!validator.matches(data.manufacturer.trim(), /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]*$/) || data.manufacturer.trim().length === 0) {
        return res.status(400).json({ message: `La data manufacturer ne correspond pas au format attendu. (La data doit contenir au moins 1 caractère alphanumérique)` });
    } if (!validator.matches(data.description.trim(), /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]*$/) || data.description.trim().length === 0) {
        return res.status(400).json({ message: `La data description ne correspond pas au format attendu. (La data doit contenir au moins 1 caractère alphanumérique)` });
    } if (!validator.matches(data.mainPepper.trim(), /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]*$/) || data.mainPepper.trim().length === 0) {
        return res.status(400).json({ message: `La data mainPepper ne correspond pas au format attendu. (La data doit contenir au moins 1 caractère alphanumérique)` });
    } if (parseInt(data.heat) > 10 || parseInt(data.heat) < 1) {
        return res.status(400).json({ message: `La data heat doit être comprise entre 1 et 10. (La data ne peut être vide)` });
    } if (req.file != undefined) {
        const extension = req.file.mimetype.split('/')[1]; // Défini l'extension d'après le dictionnaire MIME TYPES
        const tabExtension = Object.keys(MIME_TYPES).map(cle => {
            return MIME_TYPES[cle]
        })
        if (tabExtension.includes(extension) === false) {
            return res.status(400).json({ message: `Le format du fichier n'est pas pris en charge ! Seuls les fichiers jpg, jpeg ou png sont acceptés.` })
        }
        next();
    } else {
        next();
    }
}



