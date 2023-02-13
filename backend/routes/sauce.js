// IMPORTATION DES MODULES
const express = require('express');
const router = express.Router(); //permet la création de routeurs pour chaque route principale de l'app 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// IMPORTATION DU CONTROLLER
const sauceCtrl = require('../controllers/sauce');


// ROUTES
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.put('/:id', auth, multer, sauceCtrl.editSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);



module.exports = router;