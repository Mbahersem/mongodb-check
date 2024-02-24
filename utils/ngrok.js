const ngrok = require('@ngrok/ngrok');

connect = async function() {
    try {
        const listener = await ngrok.forward({addr: 8080, authtoken_from_env: true});
        return listener.url();
    } catch(err) {
        console.error(err);
    }
}

close = async function() {
    try {
        await ngrok.disconnect();
    } catch (err) {
        console.error(err);
    }
}

module.exports = {connect, close};
