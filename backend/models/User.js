// IMPORTATION DES MODULES 
const mongoose = require('mongoose'); //Package facilitant les interactions avec la DB 
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(v) {
            if (!validator.isEmail(v)) throw new Error(`Format de l'email non valide`)
        }
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.plugin(uniqueValidator);




module.exports = mongoose.model('User', userSchema);