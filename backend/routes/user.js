// IMPORTATION DES MODULES
const express = require('express');
const router = express.Router();
const limiter = require('../middleware/rate-limite');

// IMPORTATION DU CONTROLLER
const userCtrl = require('../controllers/user')


// ROUTES
router.post('/signup', userCtrl.signup);
router.post('/login', limiter, userCtrl.login);


module.exports = router;
