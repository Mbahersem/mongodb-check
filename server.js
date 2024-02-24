const app = require('./app');
const { disconnectDB } = require('./utils/db');
const { close } = require('./utils/ngrok');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async() => {
    await disconnectDB();
    await close();
    process.exit(0);
});