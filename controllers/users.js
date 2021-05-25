const User = require('../models/user');

// render register user page

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register', {style: 'app'});
};

// register user

// module.exports.userRegister = async(req, res, next) => {
//     try {
//     const {email, username, password} = req.body;
//     const user = new User({ email, username});
//     const registeredUser = await User.register(user, password);
//     req.login(registeredUser, err => {
//         if(err) return next(err);
//         req.flash('success',`Cześć ${username}`);
//         res.redirect('/');
//     })
// } catch(e) {
//     req.flash('error', 'Użytkownik już istnieje');
//     res.redirect('register');
// }   
// };

// render login form

module.exports.renderLoginForm = (req,res) => {
    res.render('users/login', {style: 'app'}) 
};

// login user

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Witaj ponownie');
    const redirectUrl = req.session.returnTo || '/kids';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
    };

//logout user

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'Zostałaś wylogowana');
    res.redirect('/')
};