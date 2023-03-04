const express = require('express');
const router = express.Router();
const offer = require('../controllers/offer');
const catchAsync = require('../utils/catchAsync');

router.route('/oferta-brzuszkowa')
    .get(catchAsync(offer.tummyOffer))

    module.exports = router