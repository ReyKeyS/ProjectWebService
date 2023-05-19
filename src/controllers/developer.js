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


const registerDev = async (req, res) => {}

const updateDev = async (req, res) => {}

const topup = async (req, res) => {}

const subscribe = async (req, res) => {}


const getCourierQuery = async (req, res) => {}

const getCourierParams = async (req, res) => {}

const getCityQuery = async (req, res) => {}

const getCityParams = async (req, res) => {}


const getEstimate = async (req, res) => {}

const addShipping = async (req, res) => {}

const deleteShipping = async (req, res) => {}

module.exports = {
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
}