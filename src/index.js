const express = require('express')
const dotenv = require("dotenv");
dotenv.config();

const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const shippingRouter = require('./routes/shipping');

// App Use
app.use("/api/", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/shipping", shippingRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))