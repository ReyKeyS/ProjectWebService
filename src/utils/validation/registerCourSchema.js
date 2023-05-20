const Joi = require('joi').extend(require('@joi/date'))

const registerCourSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .required()
        .label("Username")
        .messages({
            "any.required": "{{label}} harus terisi",
            "string.alphanum": "{{#label}} harus alphanumeric",
            "string.min": "{{#label}} minimal terdiri dari 4 karakter",
        }),
    password: Joi.string()
        .alphanum()
        .min(6)
        .required()
        .label("Password")
        .messages({
            "string.alphanum": "{{#label}} harus diisi alphanumeric",
            "string.min": "{{#label}} minimal terdiri dari 6 karakter",
        }),
    confirm_password: Joi.any()
        .equal(Joi.ref("password"))
        .label("Konfirmasi Password")
        .messages({ "any.only": "{{#label}} harus sama dengan password" }),
    display_name: Joi.string()
        .required()
        .label("Display Name")
        .messages({ "any.required": "{{label}} harus terisi" }),
    no_telp: Joi.number()
        .required()
        .label("Nomor Telepon")
        .messages({"any.required": "{{label}} harus terisi"}),
})

module.exports = registerCourSchema;