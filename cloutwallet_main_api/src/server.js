const express = require('express');
const currentBlock = require('./controllers/currentBlock');
const holding = require('./controllers/holding');
const profile = require('./controllers/profile');
const transactions = require('./controllers/transactions');

const app = express();

const port = process.env.PORT || 5000;

app.post('/api/profile/:username', async (req, res) => {
    await profile(req, res); 
});

app.post('/api/holding/:id', async (req, res) => {
    await holding(req, res); 
});

app.post('/api/transactions/:id', async (req, res) => {
    await transactions(req, res); 
});

app.post('/api/current-block', async (req, res) => {
    await currentBlock(req, res); 
});

app.use(
    function(req, res, next){
        return res
        .status(404)
        .json({ message: "Page Not Found" });
    },
);

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
