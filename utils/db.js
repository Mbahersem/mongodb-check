const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const dotenv = require('dotenv');

dotenv.config('../.env');

const client = new MongoClient(uri);

const connectDB = async() => {
    try {
        await client.connect()
        return client;
    } catch (err) {
        console.log(err);
    }
}

const disconnectDB = async() => {
    try {
        await client.close();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {connectDB, disconnectDB};