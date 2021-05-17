const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.userRegister));

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.loginUser);

router.get('/logout', users.logoutUser);

module.exports = router;