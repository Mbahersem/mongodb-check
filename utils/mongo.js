const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config('../.env');

class Mongo {
    constructor() {
        this.uri = process.env.MONGODB_URI;
        this.client = new MongoClient(this.uri);
    }

    getDbName = async() => {
        await this.client.connect();
        const db = this.client.db();
        const dbName = db.databaseName;
        await this.client.close();
        return dbName;
    }
    
    getAllCollections = async() => {
        const col = [];
        await this.client.connect();
        const db = this.client.db();
        let collections = await db.collections();
        for(let collection of collections) {
            col.push(collection.s.namespace.collection);
        }
        await this.client.close();
        return col;
    }

    getAllCollectionsKeyboard = async() => {
        const col = [];
        await this.client.connect();
        const db = this.client.db();
        let collections = await db.collections();
        for(let collection of collections) {
            col.push([collection.s.namespace.collection]);
        }
        await this.client.close();
        return col;
    }

    getAllDocuments = async(name) => {
        const docs = [];
        await this.client.connect();
        const db = this.client.db();
        const documents = db.collection(name);

        const docCursor = documents.find();

        for await (const doc of docCursor) {
            docs.push(doc);
        }

        return docs;
    }
}

module.exports = Mongo;