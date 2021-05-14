const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { Kids } = require('../models/photoshoot');
const { kidsSchema } = require('../schemas.js');
const {isLoggedIn} = require('../middleware');

const validateKids = (req, res, next) => {
    const { error } = kidsSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.get('/', catchAsync(async (req, res) => {
    const kids = await Kids.find({});
    res.render('ps-kids/index', { kids, style: 'photo-gallery' });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('ps-kids/new', { style: 'app' });
});

router.post('/', isLoggedIn, validateKids, catchAsync(async (req, res) => {
    const kids = new Kids(req.body.kids);
    kids.owner = req.user._id;
    await kids.save();
        req.flash('success', 'Stworzyłaś nową sesję dziecięcą');
    res.redirect(`/kids/${kids._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id).populate('owner');
    console.log(kids)
    if(!kids) {
        req.flash('error', 'Nie mogę znaleźć takiej sesji');
        return res.redirect('/kids');
    }
    res.render('ps-kids/show', { kids, style: 'photo-gallery' })
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id);
    if(!kids) {
        req.flash('error', 'Nie mogę znaleźć takiej sesji');
        return res.redirect('/kids');
    }
    if (!kids.owner.equals(req.user._id)) {
        req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
        return res.redirect(`/kids/${kids._id}`);
    }
   
    res.render('ps-kids/edit', { kids, style: 'app' })
}));


router.put('/:id', isLoggedIn, validateKids, catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id)
    if (!kids.owner.equals(req.user._id)) {
    req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
    return res.redirect(`/kids/${kids._id}`);
}
    const kidsShoot = await Kids.findByIdAndUpdate(id, { ...req.body.kids });
    req.flash('success', 'Zaktualizowałaś sesję dziecięcą')
    res.redirect(`${kids._id}`)
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id)
    if (!kids.owner.equals(req.user._id)) {
    req.flash ('error', 'nie możesz tego zrobić - nie jesteś właścicielem')
    return res.redirect(`/kids/${kids._id}`);
}
    await Kids.findByIdAndDelete(id);
    req.flash('success', 'Usunęłaś sesję dziecięcą')
    res.redirect('/kids')
}));

module.exports = router