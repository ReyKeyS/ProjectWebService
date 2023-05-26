// Req
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const conn = require("../databases/connectionStormTrack");
const { Op, QueryTypes } = require('sequelize')
const schema = require("../utils/validation/index");

// Models
const { users, cities, shippings } = require("../models");

// Function multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folderName = `uploads/ProfPic_Kurir`;

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, { recursive: true });
        }

        callback(null, folderName);
    },
    filename: (req, file, callback) => {
        console.log(file);
        const fileExtension = path.extname(file.originalname).toLowerCase();
        
        if (file.fieldname == "profpic") {
            let namaFile = `profpic_${req.body.username}${fileExtension}`;
            req.namaFile = namaFile
            callback(null, namaFile);
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

// const registerCourier = async (req, res) => {
// console.log(req.body);
// const { username, password, confirm_password, display_name, no_telp, foto_ktp } = req.body
// // Validation
// try {
//     let result = await schema.registerCourSchema.validateAsync(req.body, {
//         abortEarly: false,
//     });
// } catch (error) {
//     const processedResult = error.details.reduce((hasil, item) => {
//         const key = item.context.key || item.context.main;
//         if (key in hasil) {
//             hasil[key].push(item.message);
//         } else {
//             hasil[key] = [item.message];
//         }
//         return hasil;
//     }, {});
//     return res.status(400).json({ msg: "Validasi gagal", payload: processedResult });
// }

// // Cek username available
// const cekUsername = await users.findOne({ where: { username: username } })
// if (cekUsername != null) return res.status(400).send({ message: "Username sudah terpakai" })

// // Password
// let hashedPassword;
// await bcrypt.hash(password, 10).then((hash) => {
//     hashedPassword = hash;
// });

// // Generate ID
// let newID = "US"
// const currMax = await users.count({ where: { user_id: { [Op.like]: "US%" } } })
// newID += (parseInt(currMax) + 1).toString().padStart(3, '0');
// Upload KTP
// const uploadingFile =await upload.single("foto_ktp");
// uploadingFile(req, res, (err) => {
//     const body = req.body;
//     return res.status(200).json(body);
// });

// const add = await users.create({
//     user_id: newID,
//     username: username,
//     password: hashedPassword,
//     display_name: display_name,
//     no_telp: no_telp,
//     roles: "cour"
// })

// return res.status(201).send({
//     message: "Berhasil Register", data: {
//         username: username,
//         display_name: display_name,
//         no_telp: no_telp
//     }
// })
// }

const registerCourier = async (req, res) => {
    // Upload KTP
    const uploadingFile = await upload.single("profpic");
    uploadingFile(req, res, async (err) => {
        console.log("req.body", req.body);
        console.log("req.file", req.file);
        if (err) {
            console.log(err);
            return res
                .status(400)
                .send((err.message || err.code) + " pada field " + err.field);
        }
        console.log(req.body);
        const { username, password, confirm_password, display_name, no_telp, profpic } = req.body
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
            profpic: req.namaFile,
            status:false,
            roles: "cour"
        })

        return res.status(201).send({
            message: "Berhasil Register", data: {
                username: username,
                display_name: display_name,
                no_telp: no_telp
            }
        })
    });

}


const updateCourier = async (req, res) => {
    let { display_name, old_password, new_password, no_telp } = req.body

    try {
        await schema.updateCourSchema.validateAsync(req.body, {
            abortEarly: false
        })
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

    let cariUser = await users.findByPk(req.user.user_id)

    if (!cariUser) {
        return res.status(200).json({ message: "User tidak ditemukan" })
    }

    //Cek password
    const cekPassword = await bcrypt.compare(old_password, cariUser.password);
    if (!cekPassword) return res.status(400).send({ message: "Password salah" })

    // Password
    let hashedPassword;
    await bcrypt.hash(new_password, 10).then((hash) => {
        hashedPassword = hash;
    });
    //isi kalau kosong
    if (!display_name) {
        display_name = cariUser.display_name
    }
    if (!new_password) {
        new_password = old_password
    }
    if (!no_telp) {
        no_telp = cariUser.no_telp
    }

    let ubah = await users.update({
        display_name: display_name,
        password: hashedPassword,
        no_telp: no_telp
    }, {
        where: {
            user_id: req.user.user_id
        }
    })

    console.log(ubah);
    return res.status(200).json({
        message: "Berhasil Update", data: {
            user_id: req.user.user_id,
            username: req.user.username,
            display_name: display_name,
            no_telp: no_telp
        }
    })
}

const getUnorderedShipping = async(req,res) => {
    // return res.status(200).json({message:req.user.user_id})
    const allShip = await shippings.findAll({
        where: {
            id_kurir:null
        },
        attributes: [
            "shipping_id",
        ],
        order: [['createdAt']], 
    })

    return res.status(200).send(allShip)
}

const takeOrder = async (req, res) => {
    const {shipping_id}=req.params
    let cekKurirTersedia=await users.findByPk(req.user.user_id)
    if(cekKurirTersedia.status === true) {
        return res.status(400).json({message:`Kurir ${req.user.display_name} sedang mengantarkan barang`})
    }
    let ambilOrder=await shippings.findOne({
        where: {
            shipping_id:shipping_id
        }
    })
    console.log(ambilOrder);
    // if(ambilOrder.status == "0") {
    //     return res.status(404).json({message:`Barang ${shipping_id} tidak ditemukan`})
    // }
    if(ambilOrder.status=="2"){
        return res.status(400).json({message:`Barang ${shipping_id} dalam proses pengiriman`})
    }
    else if(ambilOrder.status=="3"){
        return res.status(400).json({message:`Barang ${shipping_id} sudah Tiba di Tujuan`})
    }
    let kirimShiping=await shippings.update({
        status:"2",
        id_kurir:req.user.user_id,
    },{
        where: {
            shipping_id:shipping_id
        }
    })
    let kirimKurir=await users.update({
        status:1
    },{
        where:{
            user_id:req.user.user_id
        }
    })
    return res.status(200).json({message:`Kurir ${req.user.display_name} berhasil mengambil order barang dengan kode ${shipping_id}`})
}

const cancelShipping = async (req, res) => { 
    let idShipping=await shippings.findOne({
        where: {
            status:"2",
            id_kurir:req.user.user_id
        },
        attributes: ["shipping_id"]
    })
    if (!idShipping){
        return res.status(404).json({message:`Kurir tidak sedang mengatarkan barang`})
    }
    let cancelShipping=await shippings.update({
        status:"1",
        id_kurir:null,
    },{
        where: {
            status:"2",
            id_kurir:req.user.user_id
        }
    })
    if (!cancelShipping){
        return res.status(400).json({message:"Gagal Cancel"})
    }
    let cancelKurir=await users.update({
        status:"0",
    },{
        where: {
            user_id:req.user.user_id
        }
    })
    console.log(idShipping.shipping_id);
    return res.status(200).json({message:`Berhasil cancel pengiriman barang ${idShipping.shipping_id}`})
}

module.exports = {
    registerCourier,
    updateCourier,
    getUnorderedShipping,
    takeOrder,
    cancelShipping
}