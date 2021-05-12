const express = require('express');
const router = express.Router();
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

module.exports = router;