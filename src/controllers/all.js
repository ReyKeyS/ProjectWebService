// Req
require("dotenv").config();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const axios = require('axios');
const jwt = require('jsonwebtoken');
const db = require("../models/index");
const conn = db.sequelize
const { Op, QueryTypes } = require('sequelize')
const schema = require("../utils/validation/index");

// Models
const { users, cities, shippings } = require("../models");


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
        { expiresIn: "1d" }
    )

    return res.status(200).send({
        message: "Berhasil Login", data: {
            username: username,
            accessToken: accessToken
        }
    })
}

const getLatest = async (req, res) => {
    const allShip = await shippings.findAll({
        attributes: [
            "shipping_id",
        ],
        order: [['createdAt', 'desc']], 
    })

    return res.status(200).send(allShip)
}

const detailShipping = async (req, res) => {
    const { shipping_id } = req.params

    const ship = await shippings.findByPk(shipping_id)
    if (ship == null) return res.status(404).send({message: "Ship not found"});

    return res.status(200).send(ship);
}

const weatherShipping = async (req, res) => {
    const { shipping_id } = req.params

    const ship = await shippings.findByPk(shipping_id)
    if (ship == null) return res.status(404).send({message: "Ship not found"});

    // Origin
    const city_origin = await cities.findByPk(ship.city_from)
    if (city_origin == null) return res.status(404).send({message: "City not found"})

    // Destination
    const city_destination = await cities.findByPk(ship.city_to)
    if (city_destination == null) return res.status(404).send({message: "City not found"})

    // Weather
    const weatherOrigin = await axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${city_origin.latitude}&lon=${city_origin.longitude}&appid=${process.env.OPENWEATHER_KEY}`
    })
    const weatherDestination = await axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${city_destination.latitude}&lon=${city_destination.longitude}&appid=${process.env.OPENWEATHER_KEY}`
    })

    return res.status(200).send({
        weather_city_from: weatherOrigin.data,
        weather_city_to: weatherDestination.data,
    })
}

const updateShipping = async (req, res) => {
    const { shipping_id } = req.params
    const { status } = req.body

    const ship = await shippings.findByPk(shipping_id)
    if (ship == null) return res.status(404).send({message: "Ship not found"});

    if (status != "Delivered") return res.status(400).send({message: "Invalid status"})

    ship.update({status: status})

    return res.status(200).send({message: `Shipping ${shipping_id} is being ${status}`})
}

module.exports = {
    loginUser,
    getLatest,
    detailShipping,
    weatherShipping,
    updateShipping
}