const express = require("express");
const router = express.Router();

const {
    registerCourier, 
    updateCourier,
    takeOrder,
    cancelShipping
} = require("../controllers/courier");
const middleware = require("../middleware");


router.post("/register", registerCourier)
router.put("/update",[middleware.verifyJWT, middleware.checkRoles.cekRoleCour], updateCourier)

router.post("/takeorder/:shipping_id",[middleware.verifyJWT, middleware.checkRoles.cekRoleCour], takeOrder)
router.put("/cancel/:shipping_id",[middleware.verifyJWT, middleware.checkRoles.cekRoleCour], cancelShipping)

module.exports = router;