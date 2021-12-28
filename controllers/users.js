const User = require('../models/user');

// Render register user page

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register', {style: 'app', title:"login" });
};

// Register user

module.exports.userRegister = async(req, res, next) => {
    try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next(err);
        req.flash('success',`Cześć ${username}`);
        res.redirect('/');
    })
} catch(e) {
    req.flash('error', e.message);
    res.redirect('register');
}   
};

// Render login form

module.exports.renderLoginForm = (req,res) => {
    res.render('users/login', {style: 'app', title:"login" }) 
};

// Login user

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Witaj ponownie');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
    };

//Logout user

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'Zostałaś wylogowana');
    res.redirect('/')
};