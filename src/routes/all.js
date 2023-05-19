const express = require("express");
const router = express.Router();

const {
    loginUser,
    getLatest,
    detailShipping,
    weatherShipping,
    updateShipping
} = require("../controllers/all")


router.post("/login", loginUser)
router.get("/shipping/latest", getLatest)
router.get("/shipping/:shipping_id", detailShipping)
router.get("/weather/:shipping_id", weatherShipping)
router.put("/shipping/:shipping_id", updateShipping)

module.exports = router;