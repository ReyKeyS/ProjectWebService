'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('provinces', [
      { name: "Bali" },
      { name: "Bangka Belitung" },
      { name: "Banten" },
      { name: "Bengkulu" },
      { name: "DI Yogyakarta" },
      { name: "DKI Jakarta" },
      { name: "Gorontalo" },
      { name: "Jambi" },
      { name: "Jawa Barat" },
      { name: "Jawa Tengah" },
      { name: "Jawa Timur" },
      { name: "Kalimantan Barat" },
      { name: "Kalimantan Selatan" },
      { name: "Kalimantan Tengah" },
      { name: "Kalimantan Timur" },
      { name: "Kalimantan Utara" },
      { name: "Kepulauan Riau" },
      { name: "Lampung"},
      { name: "Maluku"},
      { name: "Maluku Utara"},
      { name: "Nanggroe Aceh Darussalam (NAD)"},
      { name: "Nusa Tenggara Barat (NTB)"},
      { name: "Nusa Tenggara Timur (NTT)"},
      { name: "Papua"},
      { name: "Papua Barat"},
      { name: "Riau"},
      { name: "Sulawesi Barat"},
      { name: "Sulawesi Selatan"},
      { name: "Sulawesi Tengah"},
      { name: "Sulawesi Tenggara"},
      { name: "Sulawesi Utara"},
      { name: "Sumatera Barat"},
      { name: "Sumatera Selatan"},
      { name: "Sumatera Utara"},
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('provinces', null, {});
  }
};
