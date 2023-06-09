'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.shippings, {
        sourceKey: "user_id",
        foreignKey: "id_kurir",
      });
    }
  }
  users.init({
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    display_name: {
      type: DataTypes.STRING
    },
    roles: {
      type: DataTypes.STRING
    },
    api_quota: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING
    },
    saldo: {
      type: DataTypes.BIGINT
    },
    no_telp: {
      type: DataTypes.STRING
    },
    profpic: {
      type: DataTypes.STRING
    },
    status:{
      type: DataTypes.BOOLEAN
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
    modelName: 'users',
  });
  return users;
};