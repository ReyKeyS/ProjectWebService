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

    await queryInterface.bulkInsert('cities', [
      { name: 'Ambon',            latitude: -3.7,          longitude:  128.183333333,  raja_id_city: 14,  raja_id_province: 19, postal_code: 97222 , geo_city_id: 52949    },
      { name: 'Balikpapan',       latitude: -1.148888888,  longitude:  116.903055555,  raja_id_city: 19,  raja_id_province: 15, postal_code: 76111 , geo_city_id: 51819    },
      { name: 'Banda Aceh',       latitude: 5.55,          longitude:  95.3175,        raja_id_city: 20,  raja_id_province: 21, postal_code: 23238 , geo_city_id: 51713    },
      { name: 'Bandar Lampung',   latitude: -5.429444444,  longitude:  105.2625,       raja_id_city: 21,  raja_id_province: 18, postal_code: 35139 , geo_city_id: 51439    },
      { name: 'Bandung',          latitude: -6.92222,      longitude:  107.60694,      raja_id_city: 23,  raja_id_province: 9,  postal_code: 40111 , geo_city_id: 52585    },
      { name: 'Banjar',           latitude: -7.366666666,  longitude:  108.533333333,  raja_id_city: 34,  raja_id_province: 9,  postal_code: 46311 , geo_city_id: 3711867  },
      { name: 'Banjarbaru',       latitude: -3.4425,       longitude:  114.8325,       raja_id_city: 35,  raja_id_province: 13, postal_code: 70712 , geo_city_id: 147068   },
      { name: 'Banjarmasin',      latitude: -3.32,         longitude:  114.5925,       raja_id_city: 36,  raja_id_province: 13, postal_code: 70117 , geo_city_id: 147070   },
      { name: 'Batam',            latitude: 1.067777777,   longitude:  104.016666666,  raja_id_city: 48,  raja_id_province: 17, postal_code: 29413 , geo_city_id: 52953    },
      { name: 'Batu',             latitude: -7.8672,       longitude:  112.5239,       raja_id_city: 51,  raja_id_province: 11, postal_code: 65311 , geo_city_id: 52760    },
      { name: 'Bau-Bau',          latitude: -5.466669444,  longitude:  122.633,        raja_id_city: 53,  raja_id_province: 30, postal_code: 93719 , geo_city_id: 3710437  },
      { name: 'Bekasi',           latitude: -6.233333333,  longitude:  107,            raja_id_city: 55,  raja_id_province: 9,  postal_code: 17121 , geo_city_id: 3711866  },
      { name: 'Bengkulu',         latitude: -3.795555555,  longitude:  102.259166666,  raja_id_city: 62,  raja_id_province: 4,  postal_code: 38229 , geo_city_id: 52064    },
      { name: 'Bima',             latitude: -8.46667,      longitude:  118.717,        raja_id_city: 69,  raja_id_province: 22, postal_code: 84139 , geo_city_id: 52196    },
      { name: 'Binjai',           latitude: 3.6,           longitude:  98.485277777,   raja_id_city: 70,  raja_id_province: 34, postal_code: 20712 , geo_city_id: 50904    },
      { name: 'Bitung',           latitude: 1.432222222,   longitude:  125.246388888,  raja_id_city: 73,  raja_id_province: 31, postal_code: 95512 , geo_city_id: 3347594  },
      { name: 'Blitar',           latitude: -8.1,          longitude:  112.15,         raja_id_city: 75,  raja_id_province: 11, postal_code: 66124 , geo_city_id: 52663    },
      { name: 'Bogor',            latitude: -6.597802777,  longitude:  106.799263333,  raja_id_city: 79,  raja_id_province: 9,  postal_code: 16119 , geo_city_id: 52337    },
      { name: 'Bontang',          latitude: 0.133333333,   longitude:  117.5,          raja_id_city: 89,  raja_id_province: 15, postal_code: 75313 , geo_city_id: 52012    },
      { name: 'Bukittinggi',      latitude: -0.309722222,  longitude:  100.375277777,  raja_id_city: 93,  raja_id_province: 32, postal_code: 26115 , geo_city_id: 52441    },
      { name: 'Cilegon',          latitude: -6.016666666,  longitude:  106.016666666,  raja_id_city: 106, raja_id_province: 3,  postal_code: 42417 , geo_city_id: 3449118  },
      { name: 'Cimahi',           latitude: -6.8800382,    longitude:  107.5385202,    raja_id_city: 107, raja_id_province: 9,  postal_code: 40512 , geo_city_id: 147028   },
      { name: 'Cirebon',          latitude: -6.7396903,    longitude:  108.5529678,    raja_id_city: 109, raja_id_province: 9,  postal_code: 45116 , geo_city_id: 52025    },
      { name: 'Denpasar',         latitude: -8.58333333,   longitude:  115.18333333,   raja_id_city: 114, raja_id_province: 1,  postal_code: 80227 , geo_city_id: 147076   },
      { name: 'Depok',            latitude: -6.405031,     longitude:  106.8173077,    raja_id_city: 115, raja_id_province: 9,  postal_code: 16416 , geo_city_id: 147117   },
      { name: 'Dumai',            latitude: 1.666666666,   longitude:  101.45,         raja_id_city: 120, raja_id_province: 26, postal_code: 28811 , geo_city_id: 52671    },
      { name: 'Gorontalo',        latitude: 0.541111111,   longitude:  123.059444444,  raja_id_city: 130, raja_id_province: 7,  postal_code: 96115 , geo_city_id: 52389    },
      { name: 'Gunungsitoli',     latitude: 1.116666666,   longitude:  97.566666666,   raja_id_city: 137, raja_id_province: 34, postal_code: 22813 , geo_city_id: 51006    },
      { name: 'Jakarta Barat',    latitude: -6.16667,      longitude:  106.75,         raja_id_city: 151, raja_id_province: 6,  postal_code: 11220 , geo_city_id: 147010   },
      { name: 'Jakarta Pusat',    latitude: -6.18333,      longitude:  106.83333,      raja_id_city: 152, raja_id_province: 6,  postal_code: 10540 , geo_city_id: 147006   },
      { name: 'Jakarta Selatan',  latitude: -6.26667,      longitude:  106.80833,      raja_id_city: 153, raja_id_province: 6,  postal_code: 12230 , geo_city_id: 147016   },
      { name: 'Jakarta Timur',    latitude: -6.25,         longitude:  106.8875,       raja_id_city: 154, raja_id_province: 6,  postal_code: 13330 , geo_city_id: 147013   },
      { name: 'Jakarta Utara',    latitude: -6.13611,      longitude:  106.90417,      raja_id_city: 155, raja_id_province: 6,  postal_code: 14140 , geo_city_id: 147011   },
      { name: 'Jambi',            latitude: -1.59,         longitude:  103.61,         raja_id_city: 156, raja_id_province: 8,  postal_code: 36111 , geo_city_id: 147001   },
      { name: 'Jayapura',         latitude: -2.533333333,  longitude:  140.716666666,  raja_id_city: 158, raja_id_province: 24, postal_code: 99114 , geo_city_id: 53236    },
      { name: 'Kediri',           latitude: -7.811111111,  longitude:  112.004722222,  raja_id_city: 179, raja_id_province: 11, postal_code: 64125 , geo_city_id: 52418    },
      { name: 'Kendari',          latitude: -3.9675,       longitude:  122.594722222,  raja_id_city: 182, raja_id_province: 30, postal_code: 93126 , geo_city_id: 52346    },
      { name: 'Kotamobagu',       latitude: 0.73333333,    longitude:  124.31666667,   raja_id_city: 204, raja_id_province: 31, postal_code: 95711 , geo_city_id: 2984614  },
      { name: 'Kupang',           latitude: -10.163333333, longitude:  123.577777777,  raja_id_city: 213, raja_id_province: 23, postal_code: 85119 , geo_city_id: 52851    },
      { name: 'Langsa',           latitude: 4.466666666,   longitude:  97.95,          raja_id_city: 230, raja_id_province: 21, postal_code: 24412 , geo_city_id: 51432    },
      { name: 'Lhokseumawe',      latitude: 5.18,          longitude:  97.150555555,   raja_id_city: 235, raja_id_province: 21, postal_code: 24352 , geo_city_id: 51199    },
      { name: 'Lubuk Linggau',    latitude: -3.296666666,  longitude:  102.861666666,  raja_id_city: 242, raja_id_province: 33, postal_code: 31614 , geo_city_id: 52252    },
      { name: 'Madiun',           latitude: -7.63,         longitude:  111.523055555,  raja_id_city: 248, raja_id_province: 11, postal_code: 63122 , geo_city_id: 52665    },
      { name: 'Magelang',         latitude: -7.470555555,  longitude:  110.217777777,  raja_id_city: 250, raja_id_province: 10, postal_code: 56133 , geo_city_id: 51979    },
      { name: 'Makassar',         latitude: -5.14861,      longitude:  119.43194,      raja_id_city: 254, raja_id_province: 28, postal_code: 90111 , geo_city_id: 3540948  },
      { name: 'Malang',           latitude: -7.98,         longitude:  112.62,         raja_id_city: 256, raja_id_province: 11, postal_code: 65112 , geo_city_id: 51859    },
      { name: 'Manado',           latitude: 1.48218,       longitude:  124.84892,      raja_id_city: 267, raja_id_province: 31, postal_code: 95247 , geo_city_id: 52623    },
      { name: 'Mataram',          latitude: -8.583333333,  longitude:  116.116666666,  raja_id_city: 276, raja_id_province: 22, postal_code: 83131 , geo_city_id: 146968   },
      { name: 'Medan',            latitude: 3.58333,       longitude:  98.66667,       raja_id_city: 278, raja_id_province: 34, postal_code: 20228 , geo_city_id: 51344    },
      { name: 'Metro',            latitude: -5.116666666,  longitude:  105.3,          raja_id_city: 283, raja_id_province: 18, postal_code: 34111 , geo_city_id: 52748    },
      { name: 'Mojokerto',        latitude: -7.472222222,  longitude:  112.433611111,  raja_id_city: 290, raja_id_province: 11, postal_code: 61316 , geo_city_id: 51968    },
      { name: 'Padang',           latitude: -0.955556,     longitude:  100.360556,     raja_id_city: 318, raja_id_province: 32, postal_code: 25112 , geo_city_id: 52596    },
      { name: 'Padang Panjang',   latitude: -0.464444444,  longitude:  100.400833333,  raja_id_city: 321, raja_id_province: 32, postal_code: 27122 , geo_city_id: 3672094  },
      { name: 'Padang Sidempuan', latitude: 1.366666666,   longitude:  99.266666666,   raja_id_city: 323, raja_id_province: 34, postal_code: 22727 , geo_city_id: 51673    },
      { name: 'Pagar Alam',       latitude: -4.021666666,  longitude: 103.252222222,   raja_id_city: 324, raja_id_province: 33, postal_code: 31512 , geo_city_id: 52627    },
      { name: 'Palangka Raya',    latitude: -2.21,         longitude: 113.92,          raja_id_city: 326, raja_id_province: 14, postal_code: 73112 , geo_city_id: 146942   },
      { name: 'Palembang',        latitude: -2.983333333,  longitude: 104.764444444,   raja_id_city: 327, raja_id_province: 33, postal_code: 31512 , geo_city_id: 52362    },
      { name: 'Palopo',           latitude: -3,            longitude: 120.2,           raja_id_city: 328, raja_id_province: 28, postal_code: 91911 , geo_city_id: 52530    },
      { name: 'Palu',             latitude: -0.895,        longitude: 119.859444444,   raja_id_city: 329, raja_id_province: 29, postal_code: 94111 , geo_city_id: 146946   },
      { name: 'Pangkal Pinang',   latitude: -2.1,          longitude: 106.1,           raja_id_city: 334, raja_id_province: 2,  postal_code: 33115 , geo_city_id: 52192    },
      { name: 'Parepare',         latitude: -4.016666666,  longitude: 119.623611111,   raja_id_city: 336, raja_id_province: 28, postal_code: 91123 , geo_city_id: 146935   },
      { name: 'Pariaman',         latitude: -0.626111111,  longitude: 100.120555555,   raja_id_city: 337, raja_id_province: 32, postal_code: 25511 , geo_city_id: 52005    },
      { name: 'Pasuruan',         latitude: -7.640622222,  longitude: 112.906477777,   raja_id_city: 343, raja_id_province: 11, postal_code: 67118 , geo_city_id: 52071    },
      { name: 'Payakumbuh',       latitude: -0.224444444,  longitude: 100.6325,        raja_id_city: 345, raja_id_province: 32, postal_code: 26213 , geo_city_id: 52469    },
      { name: 'Pekalongan',       latitude: -6.888333333,  longitude: 109.675277777,   raja_id_city: 349, raja_id_province: 10, postal_code: 51122 , geo_city_id: 52467    },
      { name: 'Pekanbaru',        latitude: 0.533333333,   longitude: 101.45,          raja_id_city: 350, raja_id_province: 26, postal_code: 28112 , geo_city_id: 52182    },
      { name: 'Pematang Siantar', latitude: 2.96,          longitude: 99.06,           raja_id_city: 353, raja_id_province: 34, postal_code: 21126 , geo_city_id: 51147    },
      { name: 'Pontianak',        latitude: -0.020555555,  longitude: 109.341388888,   raja_id_city: 365, raja_id_province: 12, postal_code: 78112 , geo_city_id: 51876    },
      { name: 'Prabumulih',       latitude: -3.432777777,  longitude: 104.235555555,   raja_id_city: 367, raja_id_province: 33, postal_code: 31121 , geo_city_id: 52575    },
      { name: 'Probolinggo',      latitude: -7.75,         longitude: 113.216666666,   raja_id_city: 370, raja_id_province: 11, postal_code: 67215 , geo_city_id: 52763    },
      { name: 'Sabang',           latitude: 5.893055555,   longitude: 95.32,           raja_id_city: 384, raja_id_province: 21, postal_code: 23512 , geo_city_id: 51291    },
      { name: 'Salatiga',         latitude: -7.320277777,  longitude: 110.505,         raja_id_city: 386, raja_id_province: 10, postal_code: 50711 , geo_city_id: 3316985  },
      { name: 'Samarinda',        latitude: -0.502222222,  longitude: 117.153611111,   raja_id_city: 387, raja_id_province: 15, postal_code: 75133 , geo_city_id: 52471    },
      { name: 'Sawah Lunto',      latitude: -0.682777777,  longitude: 100.778333333,   raja_id_city: 394, raja_id_province: 32, postal_code: 27416 , geo_city_id: 3322629  },
      { name: 'Semarang',         latitude: -6.966666666,  longitude: 110.416666666,   raja_id_city: 399, raja_id_province: 10, postal_code: 50135 , geo_city_id: 51894    },
      { name: 'Serang',           latitude: -6.12,         longitude: 106.150277777,   raja_id_city: 403, raja_id_province: 3,  postal_code: 42111 , geo_city_id: 52113    },
      { name: 'Sibolga',          latitude: 1.7425,        longitude: 98.779166666,    raja_id_city: 407, raja_id_province: 34, postal_code: 22522 , geo_city_id: 3449605  },
      { name: 'Singkawang',       latitude: 0.9,           longitude: 108.983333333,   raja_id_city: 415, raja_id_province: 12, postal_code: 79117 , geo_city_id: 3709885  },
      { name: 'Solok',            latitude: -0.788333333,  longitude: 100.654166666,   raja_id_city: 421, raja_id_province: 32, postal_code: 27315 , geo_city_id: 52452    },
      { name: 'Sorong',           latitude: -0.87956,      longitude: 131.26104,       raja_id_city: 425, raja_id_province: 25, postal_code: 98411 , geo_city_id: 52752    },
      { name: 'Subulussalam',     latitude: 2.642222222,   longitude: 98.004166666,    raja_id_city: 429, raja_id_province: 21, postal_code: 24882 , geo_city_id: 3075508  },
      { name: 'Sukabumi',         latitude: -6.9320004,    longitude: 106.9185638,     raja_id_city: 431, raja_id_province: 9,  postal_code: 43114 , geo_city_id: 52014    },
      { name: 'Sungaipenuh',      latitude: -2.063611111,  longitude: 101.396111111,   raja_id_city: 442, raja_id_province: 8,  postal_code: 37113 , geo_city_id: 52607    },
      { name: 'Surabaya',         latitude: -7.245833333,  longitude: 112.737777777,   raja_id_city: 444, raja_id_province: 11, postal_code: 60119 , geo_city_id: 51848    },
      { name: 'Surakarta (Solo)', latitude: -7.566666666,  longitude: 110.816666666,   raja_id_city: 445, raja_id_province: 10, postal_code: 57113 , geo_city_id: 52157    },
      { name: 'Tangerang',        latitude: -6.170277777,  longitude: 106.640277777,   raja_id_city: 456, raja_id_province: 3,  postal_code: 15111 , geo_city_id: 51094    },
      { name: 'Tangerang Selatan',latitude: -6.288888888,  longitude: 106.718055555,   raja_id_city: 457, raja_id_province: 3,  postal_code: 15332 , geo_city_id: 53771    },
      { name: 'Tanjung Balai',    latitude: 2.966666666,   longitude: 99.8,            raja_id_city: 459, raja_id_province: 34, postal_code: 21321 , geo_city_id: 51458    },
      { name: 'Tanjung Pinang',   latitude: 0.918777777,   longitude: 104.455416666,   raja_id_city: 462, raja_id_province: 17, postal_code: 29111 , geo_city_id: 50875    },
      { name: 'Tarakan',          latitude: 3.3,           longitude: 117.633333333,   raja_id_city: 467, raja_id_province: 16, postal_code: 77114 , geo_city_id: 51393    },
      { name: 'Tasikmalaya',      latitude: -7.3258023,    longitude: 108.2201805,     raja_id_city: 469, raja_id_province: 9,  postal_code: 46116 , geo_city_id: 50973    },
      { name: 'Tebing Tinggi',    latitude: 3.328333333,   longitude: 99.1625,         raja_id_city: 470, raja_id_province: 34, postal_code: 20632 , geo_city_id: 3002634  },
      { name: 'Tegal',            latitude: -6.866666666,  longitude: 109.133333333,   raja_id_city: 473, raja_id_province: 10, postal_code: 52114 , geo_city_id: 51769    },
      { name: 'Ternate',          latitude: 0.790555555,   longitude: 127.384166666,   raja_id_city: 477, raja_id_province: 20, postal_code: 97714 , geo_city_id: 3567666  },
      { name: 'Tidore Kepulauan', latitude: 0.683333333,   longitude: 127.4,           raja_id_city: 478, raja_id_province: 20, postal_code: 97815 , geo_city_id: 147328   },
      { name: 'Tomohon',          latitude: 1.324421,      longitude: 124.82254,       raja_id_city: 485, raja_id_province: 31, postal_code: 95416 , geo_city_id: 51371    },
      { name: 'Tual',             latitude: -5.64257741,   longitude: 132.742992993,   raja_id_city: 488, raja_id_province: 19, postal_code: 97612 , geo_city_id: 51090    },
      { name: 'Yogyakarta',       latitude: -7.800456766,  longitude: 110.391280229,   raja_id_city: 501, raja_id_province: 5,  postal_code: 55222 , geo_city_id: 51261    },
    ]);
  },

  async down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */

  return queryInterface.bulkDelete('cities', null, {});
}
};
