const Joi = require('joi').extend(require('@joi/date'))

const emailSchema = Joi.string()
    .email()
    .label("Email")
    .messages({
        "string.email": "{{#label}} tidak valid"
    })

module.exports = emailSchema;