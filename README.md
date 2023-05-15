# ProjectWebService
Weather-Based Shipping API


-----------------------------------------------------
## Setup Project

npm i           --> Install node modules

// Minta ENV manual lewat Discord

-----------------------------------------------------
## Buat Migrate Database

npx sequelize-cli init

ubah config.js

// Create DB
npx sequelize-cli db:create

// Create table
npx sequelize-cli models:generate --name <NamaTable> --attributes <namaattribute>:<datatype>,<namaattribute>:<datatype> ...

