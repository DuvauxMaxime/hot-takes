// IMPORTATION DES MODULES
const express = require('express');
const router = express.Router();
const limiter = require('../middleware/rate-limite');
const passwordValidator = require('../middleware/password-validator')


// IMPORTATION DU CONTROLLER
const userCtrl = require('../controllers/user')


// ROUTES
router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);


module.exports = router;
