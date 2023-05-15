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

-----------------------------------------------------
## Buat Migrate Database

npx sequelize-cli init

ubah config.js

### **Migration**

Create DB : npx sequelize-cli db:create

Create table : npx sequelize-cli models:generate --name <NamaTable> --attributes <namaattribute>:<datatype>,<namaattribute>:<datatype> ...

### **Seeder**

Create seed : npx sequelize-cli seed:generate --name users

-----------------------------------------------------
