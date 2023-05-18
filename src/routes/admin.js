const express = require("express");
const router = express.Router();

const {
    addCity, 
    updateCity,
    getCityQuery,
    getCityParams,
    deleteUser,
    getUserQuery,
    getUserParams
} = require("../controllers/admin")

router.post("/cities", addCity)
router.put("/cities/:cities_id", updateCity)
router.get("/cities", getCityQuery)
router.get("/cities/:cities_id", getCityParams)

router.delete("/users/:user_id", deleteUser)
router.get("/users", getUserQuery)
router.get("/users/:user_id", getUserParams)

module.exports = router;