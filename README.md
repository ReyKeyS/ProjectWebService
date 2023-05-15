# ProjectWebService
**Weather-Based Shipping API**

-----------------------------------------------------
## Setup Project

npm i           --> Install node modules

// Minta ENV manual lewat Discord

### (Sekali setup Migration)
- npx sequelize-cli db:create
- npx sequelize-cli db:migrate

-----------------------------------------------------
## Buat Migrate Database

npx sequelize-cli init

ubah config.js

### **Migration**

Create DB : npx sequelize-cli db:create

Create table : npx sequelize-cli models:generate --name <NamaTable> --attributes <namaattribute>:<datatype>,<namaattribute>:<datatype> ...

### **Seeder**

