const Joi = require("joi").extend(require("@joi/date"));

const updateCourSchema = Joi.object({
    display_name: Joi.string(),
    old_password: Joi.string().required().label("Password Lama").messages({
        "any.required": "{{#label}} harus diisi",
    }),
    new_password: Joi.string().alphanum().min(6).label("Password Baru").messages({
        "string.alphanum": "{{#label}} harus diisi alphanumeric",
        "string.min": "{{#label}} minimal terdiri dari 6 karakter",
    }),
    no_telp: Joi.number(),
});

module.exports = updateCourSchema;
