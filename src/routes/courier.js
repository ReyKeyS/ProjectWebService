const express = require("express");
const router = express.Router();

const {
    registerCourier, 
    updateCourier,
    takeOrder,
    cancelShipping
} = require("../controllers/courier")


router.post("/register", registerCourier)
router.put("/update/:user_id", updateCourier)

router.post("/takeorder/:shipping_id", takeOrder)
router.put("/cancel/:shipping_id", cancelShipping)

module.exports = router;