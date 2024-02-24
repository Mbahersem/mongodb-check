const express = require('express');
const bot = require('./utils/bot');
const { connect } = require('./utils/ngrok');
const dotenv = require('dotenv');

dotenv.config({path: '../.env'});

const token = process.env.TOKEN;
connect()
.then(url => {
    bot.setWebHook(`${url}/bot${token}`);
}).catch(err => {
    console.error(err);
});

const app = express();

app.use(express.json());

app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

module.exports = app;