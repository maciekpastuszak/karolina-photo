const express = require('express');
const router = express.Router();
// const kids = require('../controllers/kids');
const family = require('../controllers/family');
const catchAsync = require('../utils/catchAsync');
const { Families } = require('../models/photoshoot');
// const { Kids } = require('../models/photoshoot');
const {isLoggedIn, isOwner, validateKids} = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(family.indexFamily))
    .post(isLoggedIn, upload.array('images'), validateKids, catchAsync(family.createFamilyPshoot));

router.get('/new', isLoggedIn, family.renderNewFamilyPshoot);

router.route('/:id')
    .get(catchAsync(family.showFamilyPshoot))
    .put(isLoggedIn, isOwner, upload.array('images'), validateKids, catchAsync(family.editFamilyPshoot))
    .delete(isLoggedIn, isOwner, catchAsync(family.deleteFamilyPshoot));

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(family.renderEditFamilyPshoot));

module.exports = router