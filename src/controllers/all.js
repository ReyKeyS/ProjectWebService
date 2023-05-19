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
        roles: roles
    })

    let role;
    if (roles == 1) role = "Developer"; else if (roles == 2) role = "Kurir";

    return res.status(201).send({
        message: "Berhasil Register", data: {
            username: username,
            display_name: display_name,
            roles: role
        }
    })
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ msg: "Silakan masukkan username dan password" });
    }

    // Cek user terdaftar
    const userQuery = await users.findOne({ where: { username: username } })
    if (userQuery == null) return res.status(404).send({ message: "User belum terdaftar" })

    // Cek password
    user = userQuery.dataValues;
    const cekPassword = await bcrypt.compare(password, user.password);
    if (!cekPassword) return res.status(400).send({ message: "Password salah" })

    user.password = undefined;
    // JWT
    const accessToken = jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
    )

    return res.status(200).send({
        message: "Berhasil Login", data: {
            username: username,
            accessToken: accessToken
        }
    })
}

const getLatest = async (req, res) => {}

const detailShipping = async (req, res) => {}

const weatherShipping = async (req, res) => {}

const updateShipping = async (req, res) => {}

module.exports = {
    loginUser,
    getLatest,
    detailShipping,
    weatherShipping,
    updateShipping
}