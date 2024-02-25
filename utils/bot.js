const TelegramBot = require('node-telegram-bot-api');
const Mongo = require('./mongo');
const { connectDB } = require('./db');
const utils = require('./utils');
const { CREATE_COLLECTION, CREATE_DOCUMENT, LIST_COLLECTIONS, LIST_DOCUMENTS } = require('./commands');
const dotenv = require('dotenv');

dotenv.config({path: '../.env'});

const token = process.env.TOKEN;
let chosen = undefined;
let command = undefined;
const bot = new TelegramBot(token, {polling: true});

connectDB().then(client =>  {
    const mongo = new Mongo(client);

    let commands = [
        {command: '/start', description: `Connexion à ${mongo.getDbName()}`},
        {command: '/create_collection', description: 'Créer une collection'},
        {command: '/list_collections', description: `Liste de toutes les collections de ${mongo.getDbName()}`},
        {command: '/create_document', description: 'Créer un document dans la collection'},
        {command: '/list_documents', description: `Liste des documents ${chosen ? chosen : ''}`},
        {command: '/about', description: "A propos"}
    ];
    
    bot.setMyCommands(commands);
    
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "Connecté à la BD !");
    });
    
    bot.onText(/\/list_collections/, (msg) => {
        command = LIST_COLLECTIONS;
        mongo.getAllCollections().then(collections => {
            const keyboard = utils.keyboardFromArray(collections);
            const list = utils.formatList(collections);
            bot.sendMessage(msg.chat.id, `Liste des collections :\n${list}`, {
                "parse_mode": 'Markdown',
                "reply_markup": {
                    "keyboard": keyboard
                }
            });
        });
    });
    
    bot.onText(/\/list_documents/, (msg) => {
        command = LIST_DOCUMENTS;
        if(chosen) {
            mongo.getAllDocuments(chosen).then(docs => {
                for(const doc of docs) {
                    bot.sendMessage(msg.chat.id, utils.decodeObject(doc), {parse_mode: 'Markdown'});
                }
            });
        }
    });

    bot.onText(/\/create_collection/, (msg) => {
        command = CREATE_COLLECTION;
        bot.sendMessage(msg.chat.id, "Entrez le nom que vous désirez donner à cette collection.");
    });
    
    bot.onText(/\/create_document/, (msg) => {
        command = CREATE_DOCUMENT;
        bot.sendMessage(msg.chat.id, "Mode d'ajout de documents, envoyez...");
    });

    bot.on('message', (msg) => {
        if(command) {
            switch(command) {
                case CREATE_COLLECTION :
                    console.log(msg.text);
                    mongo.createCollec(msg.text).then(() => {
                        bot.sendMessage(msg.chat.id, `Collection ${msg.text} créée !`);
                        command = undefined;
                    }).catch(err => {
                        console.log(err);
                        bot.sendMessage(msg.chat.id, `Échec de création de la collection ${msg.text}.`);
                    });
                    break;
                case CREATE_DOCUMENT :
                    if(chosen) {
                        if(!msg.text.startsWith('/')) {
                            const doc = utils.encodeMessage(msg.text);
                            mongo.createDocument(chosen, doc).then(() => {
                                bot.sendMessage(msg.chat.id, `Document ajouté à ${chosen}.`);
                            }).catch(err => {
                                console.log(err);
                                bot.sendMessage(msg.chat.id, `Échec d'ajout à ${chosen}.`);
                            });
                        }
                    }
                    break;
                case LIST_COLLECTIONS :
                    mongo.getAllCollections().then(collections => {
                        for(let collection of collections) {
                            if(msg.text === collection) {
                                chosen = collection;
                            }
                        }
                    });
                    break;
                case LIST_DOCUMENTS :
                    bot.sendMessage(msg.chat.id, 'Go...');
                    break;
            }
        }
    });

});

module.exports = bot;