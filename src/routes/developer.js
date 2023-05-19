const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/developer")


router.post("/register", registerDev)
router.put("/update", updateDev)
router.put("/topup", topup)
router.post("/subscribe", subscribe)

router.get("/couriers/", getCourierQuery)
router.get("/couriers/:user_id", getCourierParams)
router.get("/cities/", getCityQuery)
router.get("/cities/:cities_id", getCityParams)

router.get("/shipping/estimate", getEstimate)
router.post("/shipping", addShipping)
router.delete("/shipping/:shipping_id", deleteShipping)

module.exports = router;