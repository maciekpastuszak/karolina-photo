const express = require('express');
const router = express.Router();
const kids = require('../controllers/kids');
const catchAsync = require('../utils/catchAsync');
const { Kid } = require('../models/photoshoot');
const {isLoggedIn, isOwnerKids, validateKids} = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(kids.index))
    .post(isLoggedIn, upload.array('images'), validateKids, catchAsync(kids.createKidsPshoot));

router.get('/new', isLoggedIn, kids.renderNewPshoot);

router.route('/:id')
    .get(catchAsync(kids.showKidsPshoot))
    .put(isLoggedIn, isOwnerKids, upload.array('images'), validateKids, catchAsync(kids.editKidsPshoot))
    .delete(isLoggedIn, isOwnerKids, catchAsync(kids.deleteKidsPshoot));

router.get('/:id/edit', isLoggedIn, isOwnerKids, catchAsync(kids.renderEditPshoot));

module.exports = router