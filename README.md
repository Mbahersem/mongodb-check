# Mongodb-check

## Description
What if we could do some minor actions on our MongoDB database using our phone ? This is where it all started, we have decided to use a Telegram bot with a webhook.

## Scripts
After installation, you need to run `npm install` to install all the dependencies and you can run with `npm run start` after configuring you `.env` file.
```env
TOKEN = <Your Telegram bot token>
NGROK_AUTHTOKEN = <Your ngrok auth token>
MONGODB_URI = <Your MongoDB URI to your database>
PORT = <Port of the server>
```

## Commands
There is the list of the commands that work :
* `/start`
* `/list_collections`
* `/list_documents`
* `/create_document`