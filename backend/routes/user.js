const express = require('express');
const router = express.Router();
const limiter = require('../middleware/rate-limite');


const userCtrl = require('../controllers/user')



router.post('/signup', userCtrl.signup);
router.post('/login', limiter, userCtrl.login);


module.exports = router;
