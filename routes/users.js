const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');





router.get('/',userController.home);


router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
), userController.createSession);
router.get('/sign-out',userController.destroySession);
router.post('/create',userController.create);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);




module.exports = router;    