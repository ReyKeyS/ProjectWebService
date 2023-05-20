const express = require("express");
const router = express.Router();

const {
    loginUser,
    getLatest,
    detailShipping,
    weatherShipping,
    updateShipping,
    getPict
} = require("../controllers/all")

const middleware = require("../middleware");

router.post("/login", loginUser)
router.get("/shipping/latest", middleware.verifyJWT, getLatest)
router.get("/shipping/:shipping_id", middleware.verifyJWT, detailShipping)
router.get("/weather/:shipping_id", middleware.verifyJWT, weatherShipping)
router.put("/shipping/:shipping_id", middleware.verifyJWT, updateShipping)
router.put("/getPict", middleware.verifyJWT, getPict)

module.exports = router;