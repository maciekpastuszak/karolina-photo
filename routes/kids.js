const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { Kids } = require('../models/photoshoot');
const {isLoggedIn, isOwner, validateKids} = require('../middleware');

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

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id);
    if(!kids) {
        req.flash('error', 'Nie mogę znaleźć takiej sesji');
        return res.redirect('/kids');
    }
    res.render('ps-kids/edit', { kids, style: 'app' })
}));


router.put('/:id', isLoggedIn, isOwner, validateKids, catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findByIdAndUpdate(id, { ...req.body.kids });
    req.flash('success', 'Zaktualizowałaś sesję dziecięcą')
    res.redirect(`${kids._id}`)
}));

router.delete('/:id', isLoggedIn, isOwner, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Kids.findByIdAndDelete(id);
    req.flash('success', 'Usunęłaś sesję dziecięcą')
    res.redirect('/kids')
}));

module.exports = router