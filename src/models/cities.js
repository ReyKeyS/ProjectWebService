'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cities.hasMany(models.shippings, {
        foreignKey: "cities_id",
        otherKey: "cities_id",
      });
    }
  }
  cities.init({
    cities_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.DOUBLE
    },
    longitude: {
      type: DataTypes.DOUBLE
    },
    id_province: {
      type: DataTypes.INTEGER
    },
    id_city: {
      type: DataTypes.INTEGER
    },
    postal_code: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'cities',
  });
  return cities;
};