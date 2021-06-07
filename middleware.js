const { kidsSchema } = require('./schemas.js');
const { familySchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const { Kid } = require('./models/photoshoot');

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', 'musisz się zalogować, żeby to zrobić')
        return res.redirect('/login')
    }
    next();
}

module.exports.validateKids = (req, res, next) => {
    const { error } = familySchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.isOwner = async (req, res, next) => {
    const {id} = req.params;
    const kids = await Kid.findById(id)
    if (!kids.owner.equals(req.user._id)) {
        req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
        return res.redirect(`/kids/${kids._id}`);
}
next()
}