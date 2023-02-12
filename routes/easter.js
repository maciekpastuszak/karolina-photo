const express = require('express');
const router = express.Router();
const easter = require('../controllers/easter');
const catchAsync = require('../utils/catchAsync');
const { Easter } = require('../models/photoshoot');
const {isLoggedIn, isOwnerEaster, validateEaster} = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(easter.index))
    .post(isLoggedIn, upload.array('images'), catchAsync(easter.createEasterPshoot));

router.get('/new', isLoggedIn, easter.renderNewPshoot);

router.route('/:id')
    .get(catchAsync(easter.showEasterPshoot))
    .put(isLoggedIn, isOwnerEaster, upload.array('images'), catchAsync(easter.editEasterPshoot))
    .delete(isLoggedIn, isOwnerEaster, catchAsync(easter.deleteEasterPshoot))

router.get('/:id/edit', isLoggedIn, isOwnerEaster, catchAsync(easter.renderEditPshoot));

module.exports = router