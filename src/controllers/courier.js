// Req
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../models/index");
const conn = db.sequelize
const { Op, QueryTypes } = require('sequelize')
const schema = require("../utils/validation/index");

// Models
const { users, cities, shippings } = require("../models");


const registerCourier = async (req, res) => {
    const { username, password, confirm_password, display_name, no_telp } = req.body

    // Validation
    try {
        let result = await schema.registerCourSchema.validateAsync(req.body, {
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
    
    // Password
    let hashedPassword;
    await bcrypt.hash(password, 10).then((hash) => {
        hashedPassword = hash;
    });

    // Generate ID
    let newID = "US"
    const currMax = await users.count({ where: { user_id: { [Op.like]: "US%" } } })
    newID += (parseInt(currMax) + 1).toString().padStart(3, '0');

    const add = await users.create({
        user_id: newID,
        username: username,
        password: hashedPassword,
        display_name: display_name,
        no_telp: no_telp,
        roles: "cour"
    })

    return res.status(201).send({
        message: "Berhasil Register", data: {
            username: username,
            display_name: display_name,
            no_telp: no_telp
        }
    })
}

const updateCourier = async (req, res) => {}


const takeOrder = async (req, res) => {}

const cancelShipping = async (req, res) => {}

module.exports = {
    registerCourier, 
    updateCourier,
    
    takeOrder,
    cancelShipping
}