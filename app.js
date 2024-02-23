const express = require('express');
const bot = require('./utils/bot');
const ngrok = require('./utils/ngrok');
const dotenv = require('dotenv');

dotenv.config({path: '../.env'});

const token = process.env.TOKEN;
ngrok.connect()
.then(url => {
    bot.setWebHook(`${url}/bot${token}`);
    return url;
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