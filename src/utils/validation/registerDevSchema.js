const Joi = require('joi').extend(require('@joi/date'))

const registerDevSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .required()
        .label("Username")
        .messages({
            "any.required": "{{label}} harus terisi",
            "string.alphanum": "{{#label}} harus alphanumeric",
            "string.min": "{{#label}} harus lebih dari 4 karakter",
        }),
    email: Joi.string()
        .email()
        .required()
        .label("Email")
        .messages({ 
            "any.required": "{{label}} harus terisi",
            "string.email": "{{#label}} tidak valid"
        }),
    password: Joi.string()
        .alphanum()
        .min(6)
        .required()
        .label("Password")
        .messages({
            "string.alphanum": "{{#label}} harus diisi alphanumeric",
            "string.min": "{{#label}} harus lebih dari 6 karakter",
        }),
    confirm_password: Joi.any()
        .equal(Joi.ref("password"))
        .label("Konfirmasi Password")
        .messages({ "any.only": "{{#label}} harus sama dengan password" }),
    display_name: Joi.string()
        .required()
        .label("Display Name")
        .messages({ "any.required": "{{label}} harus terisi" })
})

module.exports = registerDevSchema;