const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config({path: '../.env'});

const token = process.env.TOKEN;
const bot = new TelegramBot(token);

let commands = [
    {command: '/start', description: "Commencer"},
    {command: '/help', description: "Aide"},
    {command: '/about', description: "A propos"}
]

bot.setMyCommands(commands);

module.exports = bot;
