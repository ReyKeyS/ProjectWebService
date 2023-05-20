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
      cities.belongsTo(models.provinces, {
        foreignKey: "province_id",
        otherKey: "province_id",
      });
      cities.hasMany(models.shippings, {
        foreignKey: "cities_id",
        otherKey: "cities_id",
      });
    }
  }
  cities.init({
    city_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    raja_id_city: {
      type: DataTypes.INTEGER
    },
    province_id: {
      type: DataTypes.INTEGER,
      references: { model: 'provinces', key: 'province_id' }
    },
    postal_code: {
      type: DataTypes.INTEGER
    },
    geo_city_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'cities',
  });
  return cities;
};