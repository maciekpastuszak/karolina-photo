const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register', {style: 'app'});

})

router.post('/register',catchAsync(async(req, res) => {
    try {
    const {email, username, password} = req.body;
    const user = new User({ email, username})
    const registeredUser = await User.register(user, password);
    req.flash('success','Witaj ponownie!');
    res.redirect('/');
} catch(e) {
    req.flash('error', 'Użytkownik już istnieje');
    res.redirect('register');
}
    
}));

router.get('/login', (req,res) => {
   res.render('users/login', {style: 'app'}) 
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
req.flash('success', 'Witaj ponownie')
res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Zostałaś wylogowana');
    res.redirect('/')
})


module.exports = router;