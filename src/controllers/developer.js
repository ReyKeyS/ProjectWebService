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


const registerDev = async (req, res) => {
    const { username, email, password, confirm_password, display_name } = req.body

    // Validation
    try {
        let result = await schema.registerDevSchema.validateAsync(req.body, {
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
    
    // Cek email available
    const cekEmail = await users.findOne({ where: { email: email } })
    if (cekEmail != null) return res.status(400).send({ message: "Email sudah terpakai" })

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
        email: email,
        password: hashedPassword,
        display_name: display_name,
        roles: "dev"
    })

    return res.status(201).send({
        message: "Berhasil Register", data: {
            username: username,
            email: email,
            display_name: display_name
        }
    })
}

const updateDev = async (req, res) => {
    
}

const topup = async (req, res) => {}

const subscribe = async (req, res) => {}


const getCourierQuery = async (req, res) => {}

const getCourierParams = async (req, res) => {}

const getCityQuery = async (req, res) => {}

const getCityParams = async (req, res) => {}


const getEstimate = async (req, res) => {}

const addShipping = async (req, res) => {}

const deleteShipping = async (req, res) => {}

module.exports = {
    registerDev, 
    updateDev,
    topup,
    subscribe,

    getCourierQuery,
    getCourierParams,
    getCityQuery,
    getCityParams,
    
    getEstimate,
    addShipping,
    deleteShipping,
}