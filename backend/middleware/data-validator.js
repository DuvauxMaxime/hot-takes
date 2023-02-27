// IMPORTATION DES MODULES 
const fs = require('fs'); // Package de méthodes pour interagir avec le système de fichiers du serveur



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
    } if (typeof req.body.sauce === 'string') {
        data = JSON.parse(req.body.sauce)
    } if (data.name.trim().length === 0) {
        if (req.file != undefined) {
            const filename = req.file.filename;
            fs.unlink(`images/${filename}`, (error => {
                if (error) {
                    console.log('Error');
                } else {
                    return console.log('Le fichier issu de la data manquante a été supprimé.');
                }
            }))
        }
        return res.status(400).json({ message: `La data name ne peut être vide` });
    } if (data.manufacturer.trim().length === 0) {
        if (req.file != undefined) {
            const filename = req.file.filename;
            fs.unlink(`images/${filename}`, (error => {
                if (error) {
                    console.log('Error');
                } else {
                    return console.log('Le fichier issu de la data manquante a été supprimé.');
                }
            }))
        }
        return res.status(400).json({ message: `La data manufacturer ne peut être vide` });
    } if (data.description.trim().length === 0) {
        if (req.file != undefined) {
            const filename = req.file.filename;
            fs.unlink(`images/${filename}`, (error => {
                if (error) {
                    console.log('Error');
                } else {
                    return console.log('Le fichier issu de la data manquante a été supprimé.');
                }
            }))
        }
        return res.status(400).json({ message: `La data description ne peut être vide` });
    } if (data.mainPepper.trim().length === 0) {
        if (req.file != undefined) {
            const filename = req.file.filename;
            fs.unlink(`images/${filename}`, (error => {
                if (error) {
                    console.log('Error');
                } else {
                    return console.log('Le fichier issu de la data manquante a été supprimé.');
                }
            }))
        }
        return res.status(400).json({ message: `La data mainPepper ne peut être vide` });
    } if (parseInt(data.heat) > 10 || parseInt(data.heat) < 1) {
        if (req.file != undefined) {
            const filename = req.file.filename;
            fs.unlink(`images/${filename}`, (error => {
                if (error) {
                    console.log('Error');
                } else {
                    return console.log('Le fichier issu de la data manquante a été supprimé.');
                }
            }))
        }
        return res.status(400).json({ message: `La data heat doit être comprise entre 1 et 10.` });
    } if (data.heat.toString().trim().length === 0) {
        if (req.file != undefined) {
            const filename = req.file.filename;
            fs.unlink(`images/${filename}`, (error => {
                if (error) {
                    console.log('Error');
                } else {
                    return console.log('Le fichier issu de la data manquante a été supprimé.');
                }
            }))
        }
        return res.status(400).json({ message: `La data heat ne peut être vide.` });
    } if (req.file != undefined) {
        const extension = req.file.mimetype.split('/')[1]; // Défini l'extension d'après le dictionnaire MIME TYPES
        const tabExtension = Object.keys(MIME_TYPES).map(cle => {
            return MIME_TYPES[cle]
        })
        if (tabExtension.includes(extension) === false) {
            const filename = req.file.filename;
            fs.unlink(`images/${filename}`, (error => {
                if (error) {
                    console.log('Error');
                } else {
                    return console.log('Le fichier issu du mauvais format a été supprimé.');
                }
            }))
            return res.status(400).json({ message: `Le format du fichier n'est pas pris en charge ! Seuls les fichiers jpg, jpeg ou png sont acceptés.` })
        }
    }
    next();
}




