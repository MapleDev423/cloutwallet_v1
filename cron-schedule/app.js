const express = require('express');
const connectToMongo = require('./db/connectToMongo')
const dotenv = require("dotenv");
const transactionsRoutes = require('./routes/transactions');
const cors = require('cors');

const app = express();
dotenv.config()
app.use(cors());

connectToMongo();

app.use("/api/transactions", transactionsRoutes)

app.get('/', (req, res) => {
    res.send({ message: 'Hello CronSever is running!' });
});

module.exports = app;
