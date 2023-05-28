// Req
require("dotenv").config();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const axios = require('axios');
const jwt = require('jsonwebtoken');
const conn = require("../databases/connectionStormTrack");
const { Op, QueryTypes } = require('sequelize')
const schema = require("../utils/validation/index");

// Models
const { users, cities, shippings } = require("../models");

let linkHosting = "localhost:3000"

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

    // Cek shipping terdaftar
    const ship = await shippings.findByPk(shipping_id)
    if (ship == null) return res.status(404).send({ message: "Pengiriman tidak ditemukan" });

    const city_ori = await cities.findByPk(ship.city_from);
    const city_dest = await cities.findByPk(ship.city_to);

    let statusShip = ""
    if (ship.status == '1') statusShip = "Mencari kurir"
    else if (ship.status == '2') statusShip = "Dalam proses pengiriman"
    else if (ship.status == '3') statusShip = "Tiba di tujuan"

    // Cek kurir
    let detailCourier;
    const kurir = await users.findByPk(ship.id_kurir)
    if (kurir == null) detailCourier = "NULL"
    else {
        detailCourier = {
            id_kurir: ship.id_kurir,
            name: kurir.display_name,
            profPic: `${linkHosting}/api/getPict?file=${kurir.profpic}`
        }
    }

    return res.status(200).json({
        shipping_id: ship.shipping_id,
        status: statusShip,
        courier: detailCourier,
        detail: {
            city_from: city_ori.name,
            city_to: city_dest.name,
            cost: 'Rp '+ship.cost_min +' - Rp '+ship.cost_max,
            etd: ship.estimate_day_min +'-'+ ship.estimate_day_max+' days',
            distance: ship.distance+" km",
            picture: `${linkHosting}/api/getPict?file=${ship.foto_barang}`
        }
    })
}

const weatherShipping = async (req, res) => {
    const { shipping_id } = req.params

    const ship = await shippings.findByPk(shipping_id)
    if (ship == null) return res.status(404).send({ message: "Pengiriman tidak ditemukan" });

    // Origin
    const city_origin = await cities.findByPk(ship.city_from)
    if (city_origin == null) return res.status(404).send({ message: "Kota tidak ditemukan" })

    // Destination
    const city_destination = await cities.findByPk(ship.city_to)
    if (city_destination == null) return res.status(404).send({ message: "Kota tidak ditemukan" })

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
        city_from: {
            city: city_origin.name,
            weather_city_from: weatherOrigin.data,
        },
        city_to: {
            city: city_destination.name,
            weather_city_to: weatherDestination.data,
        }
    })
}

const updateShipping = async (req, res) => {
    const { shipping_id } = req.params
    const { status } = req.body

    const ship = await shippings.findByPk(shipping_id)
    if (ship == null) return res.status(404).send({ message: "Pengiriman tidak ditemukan" });

    // if (status != "Siap Dikirim" && status !="Dalam Pengiriman" && status  != "Tiba di Tujuan") return res.status(400).send({message: "status tidak valid"})
    if (status != "1" && status != "3") return res.status(400).send({ message: "Status tidak valid" })

    ship.update({ status: status })

    let shipKurir = await users.update({
        status: "0"
    }, {
        where:{
            user_id:ship.id_kurir
        }
    }
    )
    ship.update({ id_kurir: null })

    if (status == "1") {
        return res.status(200).send({ message: `Shipping ${shipping_id} sedang Siap Dikirim` })
    }else if (status == "3") {
        return res.status(200).send({ message: `Shipping ${shipping_id} sudah Tiba di Tujuan` })
    }
}

const getPict = async (req, res) => {
    const { file } = req.query

    let lokasinya = 'uploads/';
    if (file.includes("barang")) lokasinya += "Bukti_Shipping/";
    else if (file.includes("profpic")) lokasinya += "ProfPic_Kurir/";

    lokasinya += file
    console.log(lokasinya)
    return res.status(200).sendFile(lokasinya, { root: "." });
}

module.exports = {
    loginUser,
    getLatest,
    detailShipping,
    weatherShipping,
    updateShipping,
    getPict
}