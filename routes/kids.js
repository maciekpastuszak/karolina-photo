const express = require('express');
const router = express.Router();
const kids = require('../controllers/kids');
const catchAsync = require('../utils/catchAsync');
const { Kids } = require('../models/photoshoot');
const {isLoggedIn, isOwner, validateKids} = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(kids.index))
    .post(isLoggedIn, upload.array('image'), validateKids, catchAsync(kids.createKidsPshoot));

router.get('/new', isLoggedIn, kids.renderNewPshoot);

router.route('/:id')
    .get(catchAsync(kids.showKidsPshoot))
    .put(isLoggedIn, isOwner, upload.array('image'), validateKids, catchAsync(kids.editKidsPshoot))
    .delete(isLoggedIn, isOwner, catchAsync(kids.deleteKidsPshoot));

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(kids.renderEditPshoot));

module.exports = router