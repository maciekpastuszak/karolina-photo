const express = require('express');
const router = express.Router();
const tummy = require('../controllers/tummy');
const catchAsync = require('../utils/catchAsync');
const { Tummy } = require('../models/photoshoot');
const {isLoggedIn, isOwnerTummy, validateTummy} = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(tummy.index))
    .post(isLoggedIn, upload.array('images'), catchAsync(tummy.createTummyPshoot));

router.get('/new', isLoggedIn, tummy.renderNewPshoot);

router.route('/:id')
    .get(catchAsync(tummy.showTummyPshoot))
    .put(isLoggedIn, isOwnerTummy, upload.array('images'), catchAsync(tummy.editTummyPshoot))
    .delete(isLoggedIn, isOwnerTummy, catchAsync(tummy.deleteTummyPshoot));

router.get('/:id/edit', isLoggedIn, isOwnerTummy, catchAsync(tummy.renderEditPshoot));

module.exports = router