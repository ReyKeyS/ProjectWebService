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

const middleware = require("../middleware");

router.post("/register", registerDev)
router.put("/update", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev], updateDev)
router.put("/topup", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev], topup)
router.post("/subscribe", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev], subscribe)

router.get("/couriers/", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev, middleware.kurangiQuota], getCourierQuery)
router.get("/couriers/:user_id", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev, middleware.kurangiQuota], getCourierParams)
router.get("/cities/", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev, middleware.kurangiQuota], getCityQuery)
router.get("/cities/:city_id", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev, middleware.kurangiQuota], getCityParams)

router.get("/shipping/estimate", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev, middleware.kurangiQuota], getEstimate)
router.post("/shipping", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev, middleware.kurangiQuota], addShipping)
router.delete("/shipping/:shipping_id", [middleware.verifyJWT, middleware.checkRoles.cekRoleDev, middleware.kurangiQuota], deleteShipping)

module.exports = router;