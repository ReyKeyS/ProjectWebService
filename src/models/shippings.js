'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shippings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      shippings.belongsTo(models.users, {
        foreignKey: "user_id",
        otherKey: "user_id",
      });
      shippings.belongsTo(models.cities, {
        foreignKey: "cities_id",
        otherKey: "cities_id",
      });
    }
  }
  shippings.init({
    shipping_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    city_from: {
      type: DataTypes.STRING,
      references: { model: 'cities', key: 'cities_id' }
    },
    city_to: {
      type: DataTypes.STRING,
      references: { model: 'cities', key: 'cities_id' }
    },
    status: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.BIGINT
    },
    estimate_day: {
      type: DataTypes.INTEGER
    },
    foto_barang: {
      type: DataTypes.STRING
    },
    id_kurir: {
      type: DataTypes.STRING,
      references: { model: 'users', key: 'user_id' }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'shippings',
  });
  return shippings;
};