const express = require("express");
const router = express.Router();

const {
    registerCourier, 
    updateCourier,
    getUnorderedShipping,
    takeOrder,
    cancelShipping
} = require("../controllers/courier");
const middleware = require("../middleware");


router.post("/register", registerCourier)
router.put("/update",[middleware.verifyJWT, middleware.checkRoles.cekRoleCour], updateCourier)

router.get("/takeorder",[middleware.verifyJWT, middleware.checkRoles.cekRoleCour],getUnorderedShipping)

router.post("/takeorder/:shipping_id",[middleware.verifyJWT, middleware.checkRoles.cekRoleCour], takeOrder)
router.put("/cancel",[middleware.verifyJWT, middleware.checkRoles.cekRoleCour], cancelShipping)

module.exports = router;