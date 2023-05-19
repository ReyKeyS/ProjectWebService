const registerDevSchema = require('./registerDevSchema');
const registerCourSchema = require('./registerCourSchema');
const schema = {};

schema["registerDevSchema"] = registerDevSchema;
schema["registerCourSchema"] = registerCourSchema;

module.exports = schema;