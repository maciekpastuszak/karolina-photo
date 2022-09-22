const express = require('express');
const router = express.Router();
const christmas = require('../controllers/christmas');
const catchAsync = require('../utils/catchAsync');
const { Christmas } = require('../models/photoshoot');
const {isLoggedIn, isOwnerChristmas, validateChristmas} = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(christmas.index))
    .post(isLoggedIn, upload.array('images'), catchAsync(christmas.createChristmasPshoot));

router.get('/new', isLoggedIn, christmas.renderNewPshoot);

router.route('/:id')
    .get(catchAsync(christmas.showChristmasPshoot))
    .put(isLoggedIn, isOwnerChristmas, upload.array('images'), catchAsync(christmas.editChristmasPshoot))
    .delete(isLoggedIn, isOwnerChristmas, catchAsync(christmas.deleteChristmasPshoot))

router.get('/:id/edit', isLoggedIn, isOwnerChristmas, catchAsync(christmas.renderEditPshoot));

module.exports = router