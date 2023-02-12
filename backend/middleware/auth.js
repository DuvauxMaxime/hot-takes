// IMPORTATION DES MODULES
require('dotenv').config();
const jwt = require('jsonwebtoken');


// Authentification
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        rest.status(401).json({ error })
    }
};