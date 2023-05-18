const express = require('express')
const dotenv = require("dotenv");
dotenv.config();

const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const usersRouter = require('./routes/users');

// App Use
app.use("/api/v1", usersRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))