'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shippings', {
      shipping_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      city_from: {
        type: Sequelize.INTEGER,
        references: { model: 'cities', key: 'city_id' }
      },
      city_to: {
        type: Sequelize.INTEGER,
        references: { model: 'cities', key: 'city_id' }
      },
      status: {
        type: Sequelize.STRING
      },
      cost_min: {
        type: Sequelize.BIGINT
      },
      cost_max: {
        type: Sequelize.BIGINT
      },
      weight: {
        type: Sequelize.INTEGER
      },
      keterangan: {
        type: Sequelize.STRING
      },
      estimate_day_min: {
        type: Sequelize.INTEGER
      },
      estimate_day_max: {
        type: Sequelize.INTEGER
      },
      distance: {
        type: Sequelize.DOUBLE
      },
      foto_barang: {
        type: Sequelize.STRING
      },
      id_kurir: {
        type: Sequelize.STRING,
        references: { model: 'users', key: 'user_id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shippings');
  }
};