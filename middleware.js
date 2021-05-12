module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'musisz się zalogować, żeby to zrobić')
        return res.redirect('/login')
    }
    next();
}