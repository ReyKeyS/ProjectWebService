# ProjectWebService
**Weather-Based Shipping API**

-----------------------------------------------------
## Setup Project

npm i           --> Install node modules

// Minta ENV manual lewat Discord

### (Sekali setup Migration)
- npx sequelize-cli db:create
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all

### Start project
npm start

-----------------------------------------------------
## Buat Migrate Database

npx sequelize-cli init

ubah config.js

### **Migration**

Create DB : npx sequelize-cli db:create

Create table : npx sequelize-cli model:generate --name <NamaTable> --attributes <namaattribute>:<datatype>,<namaattribute>:<datatype> ...

### **Seeder**

Create seed : npx sequelize-cli seed:generate --name users

-----------------------------------------------------

## Daftar City
https://github.com/cahyadsn/db_rajaongkir/blob/master/db_rajaongkir.sql