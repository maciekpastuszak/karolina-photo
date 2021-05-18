const Joi = require('joi');

module.exports.kidsSchema = Joi.object({
    kids: Joi.object({
        title: Joi.string().required(),
    }).required()
});