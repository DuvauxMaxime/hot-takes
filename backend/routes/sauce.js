const express = require('express');
const router = express.Router();
const Sauce = require('../models/Sauce')

const sauceCtrl = require('../controllers/sauce')

router.post('/', sauceCtrl.createSauce);
router.post('/:id/like', sauceCtrl.likeSauce);
router.put('/:id', sauceCtrl.editSauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.get('/', sauceCtrl.getAllSauces);



module.exports = router;