const { kidsSchema } = require('./schemas.js');
const { familySchema } = require('./schemas.js');
const { tummySchema } = require('./schemas.js');
const { newbornSchema } = require('./schemas.js');
const { christmasSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const { Kid, Family, Tummy, Newborn, Christmas } = require('./models/photoshoot');

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', 'musisz się zalogować, żeby to zrobić')
        return res.redirect('/login')
    }
    next();
}

module.exports.validateKids = (req, res, next) => {
    const { error } = kidsSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateFamily = (req, res, next) => {
    const { error } = familySchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateTummy = (req, res, next) => {
    const { error } = tummySchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateNewborn = (req, res, next) => {
    const { error } = newbornSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateCommunion = (req, res, next) => {
    const { error } = communionSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateChristmas = (req, res, next) => {
    const { error } = christmasSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.isOwnerKids = async (req, res, next) => {
    const {id} = req.params;
    const kids = await Kid.findById(id)
    if (!kids.owner.equals(req.user._id)) {
        req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
        return res.redirect(`/sesja-dziecieca/${kids._id}`);
}
next()
}

module.exports.isOwnerFamily = async (req, res, next) => {
    const {id} = req.params;
    const family = await Family.findById(id)
    if (!family.owner.equals(req.user._id)) {
        req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
        return res.redirect(`/sesja-rodzinna/${family._id}`);
}
next()
}

module.exports.isOwnerTummy = async (req, res, next) => {
    const {id} = req.params;
    const tummy = await Tummy.findById(id)
    if (!tummy.owner.equals(req.user._id)) {
        req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
        return res.redirect(`/sesja-brzuszkowa/${tummy._id}`);
}
next()
}


module.exports.isOwnerNewborn = async (req, res, next) => {
    const {id} = req.params;
    const newborn = await Newborn.findById(id)
    if (!newborn.owner.equals(req.user._id)) {
        req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
        return res.redirect(`/sesja-noworodkowa/${newborn._id}`);
}
next()
}

module.exports.isOwnerCommunion = async (req, res, next) => {
    const {id} = req.params;
    const communions = await Communion.findById(id)
    if (!communions.owner.equals(req.user._id)) {
        req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
        return res.redirect(`/sesja-komunijna/${communions._id}`);
}
next()
}

module.exports.isOwnerChristmas = async (req, res, next) => {
    const {id} = req.params;
    const christmas = await Christmas.findById(id)
    if (!christmas.owner.equals(req.user._id)) {
        req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
        return res.redirect(`/sesja-swiateczna/${christmas._id}`);
}
next()
}
