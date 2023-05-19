const registerDevSchema = require('./registerDevSchema');
const registerCourSchema = require('./registerCourSchema');
const emailSchema = require('./emailSchema');
const saldoSchema = require('./saldoSchema');
const schema = {};

schema["registerDevSchema"] = registerDevSchema;
schema["registerCourSchema"] = registerCourSchema;
schema["emailSchema"] = emailSchema;
schema["saldoSchema"] = saldoSchema;

module.exports = schema;