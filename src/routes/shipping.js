const express = require("express");
const router = express.Router();

const {
    getEstimate, 
    addShipping,
    getLatest,
    detailShipping,
    deleteShipping,
    weatherShipping,
    updateShipping
} = require("../controllers/shipping")

router.get("/estimate", getEstimate)
router.post("/", addShipping)
router.get("/latest", getLatest)
router.get("/:shipping_id", detailShipping)
router.delete("/cancel/:shipping_id", deleteShipping)
router.get("/weather/:shipping_id", weatherShipping)
router.put("/:shipping_id", updateShipping)

module.exports = router;