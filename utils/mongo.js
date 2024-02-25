class Mongo {
    constructor(client) {
        this.client = client;
    }

    getDbName = () => {
        const db = this.client.db();
        const dbName = db.databaseName;
        return dbName;
    }
    
    getAllCollections = async() => {
        const col = [];
        const db = this.client.db();
        let collections = await db.collections();
        for(let collection of collections) {
            col.push(collection.s.namespace.collection);
        }
        return col;
    }

    getAllCollectionsKeyboard = async() => {
        const col = [];
        const db = this.client.db();
        let collections = await db.collections();
        for(let collection of collections) {
            col.push([collection.s.namespace.collection]);
        };
        return col;
    }

    getAllDocuments = async(name) => {
        const docs = [];
        const db = this.client.db();
        const documents = db.collection(name);

        const docCursor = documents.find();

        for await (const doc of docCursor) {
            docs.push(doc);
        }

        return docs;
    }

    createCollec = async(name) => {
        const db = this.client.db();
        const collection = await db.createCollection(name);
        console.log(collection);
    }

    createDocument = async(name, doc) => {
        const db = this.client.db();
        const collection = db.collection(name);

        await collection.insertOne(doc);
    }
}

module.exports = Mongo;