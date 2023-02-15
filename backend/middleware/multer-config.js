// IMPORTATION DES MODULES
const multer = require('multer'); // Package facilitant la gestion de fichiers avec les requêtes HTTP vers API

// Dictionnaire des extensions de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


const storage = multer.diskStorage({ //fonction pour enregistrer sur le disk
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // Remplace les espaces par des _ dans le nom du fichier (pour éviter erreurs serveur)
        const extension = MIME_TYPES[file.mimetype]; // Défini l'extension d'après le dictionnaire MIME TYPES
        const nameWithoutExtension = name.split(`.` + extension)[0]; // Supprime l'extension du fichier d'origine
        callback(null, nameWithoutExtension + Date.now() + '.' + extension);    // Créer un nom de fichier pour son stockage avec ajout TimeStamp pour le rendre unique
    }
});



module.exports = multer({ storage }).single('image'); // Méthode single pour préciser que c'est un fichier image unique