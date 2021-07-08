const baseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} nie może zawierać HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value,helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttribiutes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', {value})
                return clean;
            }
        }
    }
});

const Joi = baseJoi.extend(extension)

module.exports.kidsSchema = Joi.object({
    kids: Joi.object({
        title: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
});

module.exports.familySchema = Joi.object({
    family: Joi.object({
        title: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
});

module.exports.tummySchema = Joi.object({
    tummy: Joi.object({
        title: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
});