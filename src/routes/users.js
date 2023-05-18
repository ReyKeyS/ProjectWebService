const express = require("express");
const router = express.Router();

const {
    registerUser, 
    loginUser,
    updateUser,
    topUpSaldo,
    subscribe,
    takeOrder
} = require("../controllers/users")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/users/update", updateUser)
router.put("/users/topup", topUpSaldo)
router.post("/users/subscribe", subscribe)
router.post("/users/takeorder", takeOrder)

module.exports = router;