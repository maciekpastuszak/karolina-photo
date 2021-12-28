const express = require('express');
const router = express.Router();
const newborn = require('../controllers/newborn');
const catchAsync = require('../utils/catchAsync');
const { Newborn } = require('../models/photoshoot');
const {isLoggedIn, isOwnerNewborn, validateNewborn} = require('../middleware');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(newborn.index))
    .post(isLoggedIn, upload.array('images'), catchAsync(newborn.createNewbornPshoot));

router.get('/new', isLoggedIn, newborn.renderNewPshoot);

router.route('/:id')
    .get(catchAsync(newborn.showNewbornPshoot))
    .put(isLoggedIn, isOwnerNewborn, upload.array('images'), catchAsync(newborn.editNewbornPshoot))
    .delete(isLoggedIn, isOwnerNewborn, catchAsync(newborn.deleteNewbornPshoot));

router.get('/:id/edit', isLoggedIn, isOwnerNewborn, catchAsync(newborn.renderEditPshoot));

module.exports = router