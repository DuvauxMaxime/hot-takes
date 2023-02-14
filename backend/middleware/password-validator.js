// IMPORTATION DES MODULES 
const passwordValidator = require('password-validator');


const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)                                    // Minimum 8 caractères
    .is().max(100)                                  // Maximum 100 caractères
    .has().uppercase(1)                              // Doit contenir au moins 1 majuscule
    .has().lowercase(1)                              // Doit contenir au moins 1 minuscule
    .has().digits(1)                                // Doit contenir au moins 1 chiffre
    .has().symbols(1)                               // Doit contenir au moins 1 caractère spécial
    .has().not().spaces()                           // Ne doit pas contenir d'espace
    .is().not().oneOf(['Passw0rd', 'Password123', 'azerty123', 'Azerty123', 'Az3rty']); // Blacklist 


module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({
            error: `Le mot de passe n'est pas assez fort ! Il doit faire entre 8 et 100 caractères, comporter au mois 1 majuscule, 1 minuscule, 1 chiffre, 1 caractères spécial et ne pas avoir d'espace.`
        })
    }
}