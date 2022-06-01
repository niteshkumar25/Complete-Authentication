const router = require('express').Router();
const userCtrl = require('../contoller/userCtrl');
const ctrl = require('../contoller/userCtrl');
const auth = require('../middleware/auth')


//Register user
router.post('/register', ctrl.register);

//Login user
router.post('/login', ctrl.login);



//Verfiy token
router.get('/verify', userCtrl.VerifiedToken)


module.exports = router;