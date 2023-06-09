const express = require('express')
const dotenv = require("dotenv");
dotenv.config();

const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const allRouter = require('./routes/all');
const devRouter = require('./routes/developer');
const courRouter = require('./routes/courier');
const databaseStormTrack = require('./databases/connectionStormTrack');

// App Use
app.use("/api", allRouter);
app.use("/api/dev", devRouter);
app.use("/api/courier", courRouter);

const initApp = async () => {
    console.log("Mencoba konek");
    try {
        await databaseStormTrack.authenticate();
        console.log("Berhasil konek");
        app.listen(port, () =>
            console.log(`Example app listening on port ${port}!`)
        );
    } catch (error) {
        console.error("Gagal konek", error);
    }
};

initApp();