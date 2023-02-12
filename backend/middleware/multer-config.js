const multer = require('multer');

// Dictionnaire des extensions de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        // Remplace les espaces par des _ dans le nom du fichier
        const name = file.originalname.split(' ').join('_');
        // Défini l'extension d'après le dictionnaire MIME TYPES
        const extension = MIME_TYPES[file.mimetype];
        // Créer un nom de fichier pour son stockage
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');