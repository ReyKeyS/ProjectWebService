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
        sourceKey: "user_id",
        foreignKey: "id_kurir",
      });
      shippings.belongsTo(models.cities, {
        sourceKey: "city_id",
        foreignKey: "city_from",
      });
      shippings.belongsTo(models.cities, {
        sourceKey: "city_id",
        foreignKey: "city_to",
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
      type: DataTypes.INTEGER,
    },
    city_to: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING
    },
    cost_min: {
      type: DataTypes.BIGINT
    },
    cost_max: {
      type: DataTypes.BIGINT
    },
    weight: {
      type: DataTypes.INTEGER
    },
    keterangan: {
      type: DataTypes.STRING
    },
    estimate_day_min: {
      type: DataTypes.INTEGER
    },
    estimate_day_max: {
      type: DataTypes.INTEGER
    },
    distance: {
      type: DataTypes.DOUBLE
    },
    foto_barang: {
      type: DataTypes.STRING
    },
    id_kurir: {
      type: DataTypes.STRING,
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