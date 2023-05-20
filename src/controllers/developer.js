// Req
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../models/index");
const conn = db.sequelize
const { Sequelize, Op, QueryTypes } = require('sequelize')
const schema = require("../utils/validation/index");

// Models
const { users, cities, provinces, shippings } = require("../models");


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
        roles: "dev",
        api_quota: 10,
        saldo: 0
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
    const user = await users.findByPk(req.user.user_id)

    const { display_name, email } = req.body;

    // Replace data
    let newName, newEmail;
    if (!display_name) newName = user.display_name; else newName = display_name
    if (!email) newEmail = user.email;
    else {
        try {
            let result = await schema.emailSchema.validateAsync(email, {
                abortEarly: false,
            });
            newEmail = email
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
    }

    // Update DB
    await user.update({
        display_name: newName,
        email: newEmail,
    });

    return res.status(201).send({message: "Updated Successfully", data: {
        username: user.username,
        email: newEmail,
        display_name: newName
    }})
}

const topup = async (req, res) => {
    const user = await users.findByPk(req.user.user_id)

    const { amount } = req.body

    // Validate amount
    try {
        let result = await schema.saldoSchema.validateAsync(amount, {
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
    
    // Top Up   
    let newSaldo = parseInt(user.saldo) + parseInt(amount)

    // Update DB
    await user.update({ saldo: newSaldo });

    return res.status(201).send({message: "Updated Successfully", data: {
        username: user.username,
        saldo: newSaldo
    }})
}

const subscribe = async (req, res) => {
    const user = await users.findByPk(req.user.user_id)

    const { subscription_package } = req.body;

    if (!subscription_package) return res.status(400).send({message: "Field harus diisi"})

    // Cek paket
    let plus, price;
    if (subscription_package.toLowerCase() == "bronze"){
        plus = 10; price = 10000
    }else if (subscription_package.toLowerCase() == "silver"){
        plus = 25; price = 20000
    }else if (subscription_package.toLowerCase() == "gold"){
        plus = 55; price = 30000
    }else return res.status(400).send({message: "Subscription Package must be Bronze, Silver or Gold"})
    let newQuota = parseInt(user.api_quota) + parseInt(plus)

    // Cek saldo
    if (user.saldo < price) return res.status(400).send({message: "Saldo tidak mencukupi"})
    let newSaldo = parseInt(user.saldo) - parseInt(price)

    // Update DB
    await user.update({ saldo: newSaldo, api_quota: newQuota})

    return res.status(200).send({
        message: `Berhasil membeli paket ${subscription_package}`,
        sisa_saldo: newSaldo,
        api_quota: newQuota
    })
}


const getCourierQuery = async (req, res) => {
    const user = await users.findByPk(req.user.user_id)

    const { name } = req.query

    // Query
    const result = await users.findAll({
        attributes: [
            "user_id",
            [Sequelize.literal("display_name"), "Nama"]
        ],
        where: { roles: "cour", display_name: {[Op.like]: `%${name}%`}}
    })

    return res.status(200).send(result)
}

const getCourierParams = async (req, res) => {
    const user = await users.findByPk(req.user.user_id)

    const { user_id } = req.params

    const result = await users.findByPk(user_id)
    if (result == null) return res.status(404).send({message: "User not found"})
    if (result.roles != "cour") return res.status(404).send({message: "Bukan Courier"})

    return res.status(200).send({
        user_id: result.user_id,
        Nama: result.display_name,
        No_Telp: result.no_telp
    })
}

const getCityQuery = async (req, res) => {
    const user = await users.findByPk(req.user.user_id)

    const { name } = req.query

    // Query
    const result = await cities.findAll({
        attributes: [
            "city_id",
            "name",
            [Sequelize.literal("province.name"), "Province"],
        ],
        include: [
            { model: provinces, attributes: []}
        ],
        where: { name: {[Op.like]: `%${name}%`}}
    })

    return res.status(200).send(result)
}

const getCityParams = async (req, res) => {
    const user = await users.findByPk(req.user.user_id)

    const { city_id } = req.params

    // Query
    const city = await cities.findByPk(city_id)
    console.log(city);
    if (city == null) return res.status(404).send({message: "City not found"})

    return res.status(200).send({
        city_id: city_id,
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        postal_code: city.postal_code
    })
}


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