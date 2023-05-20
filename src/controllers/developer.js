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
    const city = await cities.findOne({
        attributes: [
            "city_id",
            "name",
            [Sequelize.literal("province.name"), "Province"],
            "latitude",
            "longitude",
            "postal_code",
        ],
        include: [
            { model: provinces, attributes: []}
        ],
        where: { city_id: city_id }
    })
    if (city == null) return res.status(404).send({message: "City not found"})

    return res.status(200).send(city)
}


const getEstimate = async (req, res) => {
    const user = await users.findByPk(req.user.user_id)

    const { city_from, city_to, weight } = req.query

    // Origin
    const city_origin = await cities.findByPk(city_from)
    if (city_origin == null) return res.status(404).send({message: "City not found"})

    // Destination
    const city_destination = await cities.findByPk(city_to)
    if (city_destination == null) return res.status(404).send({message: "City not found"})

    const opts = { headers: { key: process.env.RAJAONGKIR_KEY }}
    // JNE
    const resultJNE = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        { origin: city_origin.raja_id_city, destination: city_destination.raja_id_city, weight: weight, courier: "jne" },
        opts
    )

    // POS
    const resultPOS = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        { origin: city_origin.raja_id_city, destination: city_destination.raja_id_city, weight: weight, courier: "pos" },
        opts
    )
    
    // TIKI
    const resultTIKI = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        { origin: city_origin.raja_id_city, destination: city_destination.raja_id_city, weight: weight, courier: "tiki" },
        opts
    )

    // Weather
    const weatherOrigin = await axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${city_origin.latitude}&lon=${city_origin.longitude}&appid=${process.env.OPENWEATHER_KEY}`
    })
    const weatherDestination = await axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${city_destination.latitude}&lon=${city_destination.longitude}&appid=${process.env.OPENWEATHER_KEY}`
    })

    return res.status(200).json({
        estimate: { 
            city_origin: resultJNE.data.rajaongkir.origin_details.city_name,
            city_destination: resultJNE.data.rajaongkir.destination_details.city_name,
            weight: resultJNE.data.rajaongkir.query.weight + " gram",
        },
        weather_city_origin: weatherOrigin.data,
        weather_city_destination: weatherDestination.data,
        courier: {
            JNE: resultJNE.data.rajaongkir.results[0],
            POS: resultPOS.data.rajaongkir.results[0],
            TIKI: resultTIKI.data.rajaongkir.results[0],
        }   
    })
}

const addShipping = async (req, res) => {
    const shippingKe = await shippings.count()
    req.gmbrCount = parseInt(shippingKe) + 1

    const uploadingFile = await upload.single("picture")
    uploadingFile(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res
                .status(400)
                .send((err.message || err.code) + " pada field " + err.field);
        }

        const { city_from, city_to, weight, courier, service, notes } = req.body
        
        // Origin
        const city_origin = await cities.findByPk(city_from)
        if (city_origin == null) return res.status(400).send({message: "City not found"})

        // Destination
        const city_destination = await cities.findByPk(city_to)
        if (city_destination == null) return res.status(400).send({message: "City not found"})

        // Cek courier
        if (courier.toLowerCase() == "jne"){
            if (service.toLowerCase() != "oke" && service.toLowerCase() != "reg" && service.toLowerCase() != "yes") return res.status(400).send({message: "Invalid Service"})
        }else if (courier.toLowerCase() == "pos"){
            if (service.toLowerCase() != "pos reguler" && service.toLowerCase() != "pos nextday") return res.status(400).send({message: "Invalid Service"})
        }else if (courier.toLowerCase() == "tiki"){
            if (service.toLowerCase() != "eco" && service.toLowerCase() != "reg" && service.toLowerCase() != "ons") return res.status(400).send({message: "Invalid Service"})
        }else return res.status(400).send({message: "Invalid Courier"})

        // Raja Ongkir
        const opts = { headers: { key: process.env.RAJAONGKIR_KEY }}
        const resultOngkos = await axios.post(
            "https://api.rajaongkir.com/starter/cost",
            { origin: city_origin.raja_id_city, destination: city_destination.raja_id_city, weight: weight, courier: courier.toLowerCase() },
            opts
        )

        // OpenWeather
        const weatherOrigin = await axios({
            method: "get",
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${city_origin.latitude}&lon=${city_origin.longitude}&appid=${process.env.OPENWEATHER_KEY}`
        })
        const weatherDestination = await axios({
            method: "get",
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${city_destination.latitude}&lon=${city_destination.longitude}&appid=${process.env.OPENWEATHER_KEY}`
        })

        // Generate ID
        let newID = "SP"
        const currMax = await shippings.count({ where: { shipping_id: { [Op.like]: "SP%" } } })
        newID += (parseInt(currMax) + 1).toString().padStart(3, '0');

        let serv = resultOngkos.data.rajaongkir.results[0].costs
        let cost, est;
        for (const x of serv) {
            if (x.service.toLowerCase() == service.toLowerCase()){
                cost = x.cost[0].value;
                est = x.cost[0].etd;
                break;
            }
        }

        await shippings.create({
            shipping_id: newID,
            city_from: city_from,
            city_to: city_to,
            status: "Pending",
            cost: cost,
            weight: weight,
            estimate_day: est,
            distance: 3,
            foto_barang: `barang_${req.gmbrCount}${req.fileExt}`
        })

        return res.status(200).send({
            message: "Berhasil menambah Shipping"
        })
    });
}

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


// Function multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folderName = `uploads/Bukti_Shipping`;

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, { recursive: true });
        }

        callback(null, folderName);
    },
    filename: (req, file, callback) => {
        console.log(file);
        const fileExtension = path.extname(file.originalname).toLowerCase();

        if (file.fieldname == "picture") {
            callback(null, `barang_${req.gmbrCount}${fileExtension}`);
        } else {
            callback(null, false);
        }
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000, // 10mb
    },
    fileFilter: (req, file, callback) => {
        // buat aturan dalam bentuk regex, mengenai extension apa saja yang diperbolehkan
        const rules = /jpeg|jpg|png/;

        const fileExtension = path.extname(file.originalname).toLowerCase();
        const fileMimeType = file.mimetype;

        const cekExt = rules.test(fileExtension);
        const cekMime = rules.test(fileMimeType);

        if (cekExt && cekMime) {
            req.fileExt = fileExtension
            callback(null, true);
        } else {
            callback(null, false);
            return callback(
                new multer.MulterError(
                    "Tipe file harus .jpg, .jpeg, atau .png",
                    file.fieldname
                )
            );
        }
    },
});