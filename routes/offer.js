const express = require('express');
const router = express.Router();
const offer = require('../controllers/offer');
const catchAsync = require('../utils/catchAsync');

router.route('/oferta-brzuszkowa')
    .get(catchAsync(offer.tummyOffer))

router.route('/oferta-ciazowa-rodzinna')
    .get(catchAsync(offer.tummyFamilyOffer))

    
    module.exports = router