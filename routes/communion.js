const express = require('express');
const router = express.Router();
const communions = require('../controllers/communion');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isOwnerCommunion, validateCommunion} = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(communions.index))
    .post(isLoggedIn, upload.array('images'), catchAsync(communions.createCommunionPshoot));

router.get('/new', isLoggedIn, communions.renderNewPshoot);

router.route('/:id')
    .get(catchAsync(communions.showCommunionPshoot))
    .put(isLoggedIn, isOwnerCommunion, upload.array('images'), catchAsync(communions.editCommunionPshoot))
    .delete(isLoggedIn, isOwnerCommunion, catchAsync(communions.deleteCommunionPshoot));

router.get('/:id/edit', isLoggedIn, isOwnerCommunion, catchAsync(communions.renderEditPshoot));

module.exports = router