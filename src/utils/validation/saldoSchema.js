const Joi = require('joi').extend(require('@joi/date'))

const saldoSchema = Joi.number()
    .integer()
    .min(1)
    .required()
    .label("Amount")
    .messages({
        "any.required": "{{label}} harus terisi",
        "number.min": "{{#label}} tidak valid"
    })

module.exports = saldoSchema;