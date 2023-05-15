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
        type: Sequelize.STRING,
        references: { model: 'cities', key: 'cities_id' }
      },
      city_to: {
        type: Sequelize.STRING,
        references: { model: 'cities', key: 'cities_id' }
      },
      status: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.BIGINT
      },
      estimate_day: {
        type: Sequelize.INTEGER
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
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shippings');
  }
};