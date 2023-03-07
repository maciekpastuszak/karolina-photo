const express = require('express');
const router = express.Router();
const offer = require('../controllers/offer');
const catchAsync = require('../utils/catchAsync');

router.route('/oferta-brzuszkowa')
    .get(catchAsync(offer.tummyOffer))

router.route('/oferta-ciazowa-rodzinna')
    .get(catchAsync(offer.tummyFamilyOffer))

router.route('/oferta-dziecieca')
    .get(catchAsync(offer.kidsOffer))

router.route('/oferta-komunijna')
    .get(catchAsync(offer.communionOffer))

router.route('/oferta-na-dzien-mamy')
    .get(catchAsync(offer.mothersDayOffer))

router.route('/oferta-noworodkowa-rodzinna')
    .get(catchAsync(offer.newbornFamilyOffer))
    
router.route('/oferta-rodzinna')
    .get(catchAsync(offer.familyOffer))
    
    module.exports = router