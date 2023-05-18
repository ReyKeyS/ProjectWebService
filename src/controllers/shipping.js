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


const getEstimate = async (req, res) => {}

const addShipping = async (req, res) => {}

const getLatest = async (req, res) => {}

const detailShipping = async (req, res) => {}

const deleteShipping = async (req, res) => {}

const weatherShipping = async (req, res) => {}

const updateShipping = async (req, res) => {}

module.exports = {
    getEstimate, 
    addShipping,
    getLatest,
    detailShipping,
    deleteShipping,
    weatherShipping,
    updateShipping
}