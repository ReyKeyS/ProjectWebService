# ProjectWebService
**Weather-Based Shipping API**

-----------------------------------------------------
## Setup Project

npm i           --> Install node modules

// Minta ENV manual lewat Discord

### (Sekali setup Migration)
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

### Start project
npm start

-----------------------------------------------------
## Buat Migrate Database

npx sequelize-cli init

ubah config.js

### **Migration**

Create DB : npx sequelize-cli db:create

Create table : npx sequelize-cli model:generate --name <NamaTable> --attributes <namaattribute>:<datatype>,<namaattribute>:<datatype> ...

#### Kalo mau undo
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate:undo:all --to 20230428015701-create-kategori.js

### **Seeder**

Create seed : npx sequelize-cli seed:generate --name users

#### Kalo mau undo
npx sequelize-cli db:seed:undo:all

-----------------------------------------------------

## Daftar City
https://github.com/cahyadsn/db_rajaongkir/blob/master/db_rajaongkir.sql

## Status error
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status