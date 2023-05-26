const db = {};
const { DataTypes } = require("sequelize");
const conn = require("../databases/connectionStormTrack");

const users = require("./users");
const cities = require("./cities");
const provinces = require("./provinces");
const shippings = require("./shippings");

db.users = users(conn, DataTypes);
db.cities = cities(conn, DataTypes);
db.provinces = provinces(conn, DataTypes);
db.shippings = shippings(conn, DataTypes);

for (const key of Object.keys(db)) {
  db[key].associate(db);
}

module.exports = db;
