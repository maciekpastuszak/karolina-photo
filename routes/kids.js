const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { Kids } = require('../models/photoshoot');
const { kidsSchema } = require('../schemas.js');

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

router.get('/new', (req, res) => {
    res.render('ps-kids/new', { style: 'app' });
});

router.post('/', validateKids, catchAsync(async (req, res) => {
    // if (!req.body.kids) throw new ExpressError("Nie ma takiej sesji", 400)
    const kids = new Kids(req.body.kids);
    await kids.save();
        req.flash('success', 'Stworzyłaś nową sesję dziecięcą');
    res.redirect(`/kids/${kids._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id);
    if(!kids) {
        req.flash('error', 'Nie mogę znaleźć takiej sesji');
        return res.redirect('/kids');
    }
    res.render('ps-kids/show', { kids, style: 'photo-gallery' })
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id);
    if(!kids) {
        req.flash('error', 'Nie mogę znaleźć takiej sesji');
        return res.redirect('/kids');
    }
    res.render('ps-kids/edit', { kids, style: 'app' })
}));


router.put('/:id', validateKids, catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findByIdAndUpdate(id, { ...req.body.kids });
    req.flash('success', 'Zaktualizowałaś sesję dziecięcą')
    res.redirect(`${kids._id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Kids.findByIdAndDelete(id);
    req.flash('success', 'Usunęłaś sesję dziecięcą')
    res.redirect('/kids')
}))

module.exports = router