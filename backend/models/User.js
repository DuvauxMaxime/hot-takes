// IMPORTATION DES MODULES 
const mongoose = require('mongoose'); //Package facilitant les interactions entre app Express et la DB
const uniqueValidator = require('mongoose-unique-validator'); //Package validateur pour limiter 1 inscription par mail (prévalide les données pour éviter les erreurs générées par MongoDB)
const validator = require('validator')


// Modele de données User
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, //Limite 1 inscription par mail (quelques cas d'erreurs MongoDB = ajout du package uniqueValidator)
        validate(v) {
            if (!validator.isEmail(v)) throw new Error(`Format de l'email non valide`)
        }
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.plugin(uniqueValidator); // Applique uniqueValidator au schema 




module.exports = mongoose.model('User', userSchema); // méthode model transforme en schéma utilisable