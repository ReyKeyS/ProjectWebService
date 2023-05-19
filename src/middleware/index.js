const verifyJWT = require("./verifyJWT");
const checkRoles = require("./checkRoles");
const middleware = {};

middleware.verifyJWT = verifyJWT;
middleware.checkRoles = checkRoles;

module.exports = middleware;