// Req
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../models/index");
const conn = db.sequelize
const { Op, QueryTypes } = require('sequelize')
const schema = require("../utils/validation/index");

// Models
const { users, cities, shippings } = require("../models");


const registerCourier = async (req, res) => {}

const updateCourier = async (req, res) => {}


const takeOrder = async (req, res) => {}

const cancelShipping = async (req, res) => {}

module.exports = {
    registerCourier, 
    updateCourier,
    
    takeOrder,
    cancelShipping
}