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


const addCity = async (req, res) => {}

const updateCity = async (req, res) => {}

const getCityQuery = async (req, res) => {}

const getCityParams = async (req, res) => {}

const deleteUser = async (req, res) => {}

const getUserQuery = async (req, res) => {}

const getUserParams = async (req, res) => {}

module.exports = {
    addCity, 
    updateCity,
    getCityQuery,
    getCityParams,
    deleteUser,
    getUserQuery,
    getUserParams
}