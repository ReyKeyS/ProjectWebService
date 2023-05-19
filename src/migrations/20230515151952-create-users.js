'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      display_name: {
        type: Sequelize.STRING
      },
      roles: {
        type: Sequelize.STRING
      },
      api_quota: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      saldo: {
        type: Sequelize.BIGINT
      },
      no_telp: {
        type: Sequelize.STRING
      },
      profpic: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('users');
  }
};