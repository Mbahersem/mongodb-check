const TelegramBot = require('node-telegram-bot-api');
const Mongo = require('./mongo');
const dotenv = require('dotenv');

dotenv.config({path: '../.env'});

const token = process.env.TOKEN;
let chosen = undefined;
const mongo = new Mongo();
const bot = new TelegramBot(token, {polling: true});

mongo.getDbName().then(name =>  {
    let commands = [
        {command: '/start', description: `Connexion à ${name}`},
        {command: '/list_collections', description: `Liste de toutes les collections de ${name}`},
        {command: '/list_documents', description: `Liste des documents ${chosen ? chosen : ''}`},
        {command: '/about', description: "A propos"}
    ]
    
    bot.setMyCommands(commands);
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Connecté à la BD !");
});

bot.onText(/\/list_collections/, (msg) => {
    mongo.getAllCollectionsKeyboard().then(collections => {
        bot.sendMessage(msg.chat.id, "Voici...", {
            "reply_markup": {
                "keyboard": collections
            }
        });
    });
});

bot.onText(/\/list_documents/, (msg) => {
    if(chosen) {
        mongo.getAllDocuments(chosen).then(docs => {
            for(const doc of docs) {
                bot.sendMessage(msg.chat.id, `${JSON.stringify(doc)}`);
            }
        });
    }
})

bot.on('message', (msg) => {
    mongo.getAllCollections().then(collections => {
        for(let collection of collections) {
            if(msg.text === collection) {
                chosen = collection;
            }
        }
    });
});

module.exports = bot;
