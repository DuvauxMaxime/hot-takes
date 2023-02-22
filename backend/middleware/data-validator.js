// IMPORTATION DES MODULES 
const validator = require('validator');


module.exports = (req, res, next) => {
    const data = JSON.parse(req.body.sauce)
    if (!validator.matches(data.name, /^[a-zA-Z0-9 -]*$/)) {
        res.status(400).json({ message: `La data name ne correspond pas au format attendu` });
    } if (!validator.matches(data.manufacturer, /^[a-zA-Z0-9 -]*$/)) {
        res.status(400).json({ message: `La data manufacturer ne correspond pas au format attendu` });
    } if (!validator.matches(data.description, /^[a-zA-Z0-9 -]*$/)) {
        res.status(400).json({ message: `La data description ne correspond pas au format attendu` });
    } if (!validator.matches(data.mainPepper, /^[a-zA-Z0-9 -]*$/)) {
        res.status(400).json({ message: `La data mainPepper ne correspond pas au format attendu` });
    } else {
        next();
    }
}



