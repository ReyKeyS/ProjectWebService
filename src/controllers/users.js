// Req
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const conn = db.sequelize
const { Op, QueryTypes } = require('sequelize')
const schema = require("../utils/validation/index");

// Models
const { users, cities, shippings } = require("../models");


// REGISTER
const registerUser = async (req, res) => {
    const { username, password, confirm_password, display_name, roles } = req.body

    // Validation
    try {
        let result = await schema.registerSchema.validateAsync(req.body, {
            abortEarly: false,
        });
    } catch (error) {
        const processedResult = error.details.reduce((hasil, item) => {
            const key = item.context.key || item.context.main;
            if (key in hasil) {
                hasil[key].push(item.message);
            } else {
                hasil[key] = [item.message];
            }
            return hasil;
        }, {});
        return res.status(400).json({ msg: "Validasi gagal", payload: processedResult });
    }

    // Cek username available
    const cekUsername = await users.findOne({ where: { username: username } })
    if (cekUsername != null) return res.status(400).send({ message: "Username sudah terpakai" })

    // Generate API Key
    const api_key = await crypto.randomUUID();

    // Password
    let hashedPassword;
    await bcrypt.hash(password, 10).then((hash) => {
        hashedPassword = hash;
    });

    // Generate ID
    let newID = "USR"
    if (roles != 1 && roles != 2) return res.status(400).send({ message: "Invalid role!" })
    const currMax = await users.count({ where: { user_id: { [Op.like]: "USR%" } } })
    newID += (parseInt(currMax) + 1).toString().padStart(3, '0');

    const add = await users.create({
        user_id: newID,
        username: username,
        password: hashedPassword,
        display_name: display_name,
        roles: roles,
        api_key: api_key
    })

    let role;
    if (roles == 1) role = "Developer"; else if (roles == 2) role = "Kurir";

    return res.status(200).send({
        username: username,
        display_name: display_name,
        roles: role,
        api_key: api_key
    })
}

module.exports = {
    registerUser
}