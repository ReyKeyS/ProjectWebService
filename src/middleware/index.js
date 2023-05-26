const verifyJWT = require("./verifyJWT");
const checkRoles = require("./checkRoles");
const kurangiQuota = require("./kurangiQuota");
const middleware = {};

middleware.verifyJWT = verifyJWT;
middleware.checkRoles = checkRoles;
middleware.kurangiQuota = kurangiQuota;

module.exports = middleware;